import crypto from 'crypto'

interface TokenCache { token: string; expiresAt: number }
const tokenCache = new Map<string, TokenCache>()

function base64url(input: Buffer): string {
  return input.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function buildJwt(email: string, privateKey: string, scopes: string[]): string {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const payload = { iss: email, scope: scopes.join(' '), aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }
  const segments = [base64url(Buffer.from(JSON.stringify(header))), base64url(Buffer.from(JSON.stringify(payload)))]
  const signingInput = segments.join('.')
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(signingInput)
  return `${signingInput}.${base64url(sign.sign(privateKey))}`
}

export async function getGoogleAccessToken(scopes: string[]): Promise<string> {
  const cacheKey = scopes.sort().join(',')
  const cached = tokenCache.get(cacheKey)
  if (cached && Date.now() < cached.expiresAt) return cached.token

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim()
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  if (!email || !rawKey) throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY')

  const jwt = buildJwt(email, rawKey.replace(/\\n/g, '\n'), scopes)
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  })
  if (!res.ok) throw new Error(`Google auth failed (${res.status}): ${await res.text()}`)
  const data = await res.json()
  tokenCache.set(cacheKey, { token: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 })
  return data.access_token
}
