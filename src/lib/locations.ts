export interface LocationHours {
  weekdays: { opens: string; closes: string; label: string }
  saturday: { opens: string; closes: string; label: string }
  // All locations are closed Sunday.
}

export interface Location {
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  tel: string
  slug: string
  mapUrl: string
  embedUrl: string
  geo: { latitude: number; longitude: number }
  hours: LocationHours
  hasNotary: boolean
  // Authoritative external profiles for this location (Google Business Profile,
  // Yelp, socials). Emitted as schema.org `sameAs`, which is how Google links
  // this page to the map listing. TODO: paste the real g.page / GBP short URLs.
  sameAs?: string[]
}

// The `pb=` embed format Google generates in the "Share > Embed" dialog is tied
// to a specific place ID; a hand-written one (as the original migration used)
// resolves to a 400 and renders a blank map. The address-query format below
// needs no place ID and always resolves. Build every embed through this.
function embedFor(address: string, city: string, state: string, zip: string) {
  const q = encodeURIComponent(`${address}, ${city}, ${state} ${zip}`)
  return `https://maps.google.com/maps?q=${q}&output=embed`
}

export const locations: Location[] = [
  {
    name: "Sherman Oaks Check Cashing",
    address: "15030 Ventura Blvd. #20",
    city: "Sherman Oaks",
    state: "CA",
    zip: "91403",
    phone: "(818) 461-9191",
    tel: "8184619191",
    slug: "sherman-oaks-check-cashing",
    mapUrl: "https://maps.google.com/?q=15030+Ventura+Blvd+Sherman+Oaks+CA+91403",
    embedUrl: embedFor("15030 Ventura Blvd. #20", "Sherman Oaks", "CA", "91403"),
    geo: { latitude: 34.1508, longitude: -118.4697 },
    hours: {
      weekdays: { opens: "09:00", closes: "18:00", label: "9:00 AM - 6:00 PM" },
      saturday: { opens: "09:00", closes: "15:00", label: "9:00 AM - 3:00 PM" },
    },
    hasNotary: false
  },
  {
    name: "La Cienega Check Cashing",
    address: "8506 W. 3rd Street",
    city: "Los Angeles",
    state: "CA",
    zip: "90048",
    phone: "(310) 652-8100",
    tel: "3106528100",
    slug: "la-cienega-check-cashing",
    mapUrl: "https://maps.google.com/?q=8506+W+3rd+Street+Los+Angeles+CA+90048",
    embedUrl: embedFor("8506 W. 3rd Street", "Los Angeles", "CA", "90048"),
    geo: { latitude: 34.0728, longitude: -118.3767 },
    hours: {
      weekdays: { opens: "09:00", closes: "17:00", label: "9:00 AM - 5:00 PM" },
      saturday: { opens: "09:00", closes: "15:00", label: "9:00 AM - 3:00 PM" },
    },
    hasNotary: true
  },
  {
    name: "Canoga Park Check Cashing",
    address: "9015 DeSoto Ave.",
    city: "Canoga Park",
    state: "CA",
    zip: "91304",
    phone: "(818) 700-0490",
    tel: "8187000490",
    slug: "canoga-park-check-cashing",
    mapUrl: "https://maps.google.com/?q=9015+DeSoto+Ave+Canoga+Park+CA+91304",
    embedUrl: embedFor("9015 DeSoto Ave.", "Canoga Park", "CA", "91304"),
    geo: { latitude: 34.2007, longitude: -118.5978 },
    hours: {
      weekdays: { opens: "09:00", closes: "19:00", label: "9:00 AM - 7:00 PM" },
      saturday: { opens: "10:00", closes: "17:00", label: "10:00 AM - 5:00 PM" },
    },
    hasNotary: false
  }
]

// Display names of the services offered at a given location.
export function locationServiceNames(location: Location): string[] {
  const base = ["Check Cashing", "Currency Exchange", "MoneyGram Transfers", "Money Orders", "Prepaid Cards"]
  return location.hasNotary ? [...base, "Notary Services"] : base
}

const SITE_URL = "https://www.losangelescheckcashing.com"

export function generateLocalBusinessSchema(location: Location) {
  const url = `${SITE_URL}/locations/${location.slug}/`
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    // Stable @id lets Google treat all three locations as one business's
    // branches rather than unrelated entities.
    "@id": `${url}#business`,
    // Ties this branch to the site-wide organization entity in layout.tsx.
    "branchOf": { "@id": `${SITE_URL}/#organization` },
    "name": location.name,
    "image": `${SITE_URL}/images/check-cashing.png`,
    "logo": `${SITE_URL}/images/logo.png`,
    "url": url,
    "telephone": location.phone,
    "priceRange": "$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Check, Debit Card",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address,
      "addressLocality": location.city,
      "addressRegion": location.state,
      "postalCode": location.zip,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.geo.latitude,
      "longitude": location.geo.longitude
    },
    "hasMap": location.mapUrl,
    "areaServed": [
      { "@type": "City", "name": location.city },
      { "@type": "City", "name": "Los Angeles" }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": location.hours.weekdays.opens,
        "closes": location.hours.weekdays.closes
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": location.hours.saturday.opens,
        "closes": location.hours.saturday.closes
      }
    ],
    // Only emitted once real GBP/social URLs are added to the location data.
    ...(location.sameAs?.length ? { sameAs: location.sameAs } : {})
  }
}
