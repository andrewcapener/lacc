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
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.5!2d-118.4697!3d34.1508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s15030+Ventura+Blvd%2C+Sherman+Oaks%2C+CA+91403!5e0!3m2!1sen!2sus!4v1"
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
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.1!2d-118.3767!3d34.0728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s8506+W+3rd+St%2C+Los+Angeles%2C+CA+90048!5e0!3m2!1sen!2sus!4v1"
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
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3296.5!2d-118.5978!3d34.2007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s9015+DeSoto+Ave%2C+Canoga+Park%2C+CA+91304!5e0!3m2!1sen!2sus!4v1"
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
    "geo": {},
    "openingHours": ["Mo-Sa 09:00-18:00", "Su 10:00-16:00"]
  }
}
