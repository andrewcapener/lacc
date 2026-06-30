import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Los Angeles Check Cashing.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-gray-500 mb-8 text-sm">Last updated: January 2025</p>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Information We Collect</h2>
          <p>When you visit our website, we may collect certain information automatically, including your IP address, browser type, referring URLs, and pages visited. We use this information to improve our website and understand how visitors use it.</p>
          <p className="mt-3">When you contact us by phone or in person, we collect only the information necessary to provide our services, such as your name and identification as required by law for check cashing transactions.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">How We Use Your Information</h2>
          <p>We use collected information to: provide and improve our financial services, comply with applicable laws and regulations (including Bank Secrecy Act requirements), analyze website usage, and respond to inquiries.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Cookies</h2>
          <p>Our website may use cookies to enhance your browsing experience. Cookies are small text files stored on your device. You can configure your browser to refuse cookies, though some parts of the site may not function properly.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share information as required by law, such as reporting obligations under anti-money laundering regulations.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Security</h2>
          <p>We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure. We encourage you to take precautions to protect your personal information.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Us</h2>
          <p>If you have questions about this privacy policy, please contact us at <a href="tel:2138002920" className="font-medium" style={{ color: '#1B5E20' }}>(213) 800-2920</a> or visit any of our 3 Los Angeles locations.</p>
        </section>
      </div>
      <div className="md:hidden h-16" />
    </div>
  )
}
