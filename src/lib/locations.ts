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
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.5!2d-118.4697!3d34.1508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c29607b2a4b17b%3A0x1a2b3c4d5e6f7a8b!2s15030%20Ventura%20Blvd%20%2320%2C%20Sherman%20Oaks%2C%20CA%2091403!5e0!3m2!1sen!2sus!4v1234567890",
    geo: { latitude: 34.1508, longitude: -118.4697 }
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
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.1!2d-118.3767!3d34.0728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b957b1234567%3A0x9a8b7c6d5e4f3a2b!2s8506%20W%203rd%20St%2C%20Los%20Angeles%2C%20CA%2090048!5e0!3m2!1sen!2sus!4v1234567890",
    geo: { latitude: 34.0728, longitude: -118.3767 }
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
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3296.8!2d-118.5978!3d34.2007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c29f1234567890%3A0xabcdef1234567890!2s9015%20DeSoto%20Ave%2C%20Canoga%20Park%2C%20CA%2091304!5e0!3m2!1sen!2sus!4v1234567890",
    geo: { latitude: 34.2007, longitude: -118.5978 }
  }
]

export function generateLocalBusinessSchema(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": location.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address,
      "addressLocality": location.city,
      "addressRegion": location.state,
      "postalCode": location.zip,
      "addressCountry": "US"
    },
    "telephone": location.phone,
    "url": `https://www.losangelescheckcashing.com/locations/${location.slug}/`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.geo.latitude,
      "longitude": location.geo.longitude
    },
    "openingHours": ["Mo-Sa 09:00-18:00", "Su 10:00-16:00"]
  }
}
