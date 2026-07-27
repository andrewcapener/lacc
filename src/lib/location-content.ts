import type { Faq } from './faq'

// Per-location page depth: a neighborhood paragraph and location-specific FAQs.
// Keep every claim verifiable — address, hours, and services only.
export interface LocationContent {
  slug: string
  area: string
  faqs: Faq[]
}

const sharedFaqs = (city: string, phone: string): Faq[] => [
  {
    question: `What do I need to cash a check in ${city}?`,
    answer: 'Just your check and a valid government-issued photo ID. No bank account needed, no appointment — walk right in.',
  },
  {
    question: `What are your ${city} hours?`,
    answer: 'Monday through Saturday 9:00 AM to 6:00 PM, and Sunday 10:00 AM to 4:00 PM.',
  },
  {
    question: `What services are available at the ${city} location?`,
    answer: 'Check cashing, currency exchange, MoneyGram money transfers, money orders, prepaid debit cards, and notary services (call to confirm notary availability).',
  },
  {
    question: 'Do first-time customers get a discount?',
    answer: `Yes — 50% off your first check cashed. Mention the offer when you visit, or call ${phone} with any questions.`,
  },
]

export const locationContent: LocationContent[] = [
  {
    slug: 'sherman-oaks-check-cashing',
    area: 'Our Sherman Oaks store sits right on Ventura Blvd, the Valley\'s main commercial corridor, making it an easy stop for customers across Sherman Oaks, Studio City, Encino, and Van Nuys. If you work or live anywhere in the south San Fernando Valley, this is your closest full-service check cashing location.',
    faqs: sharedFaqs('Sherman Oaks', '(818) 461-9191'),
  },
  {
    slug: 'la-cienega-check-cashing',
    area: 'Located on W. 3rd Street near the Beverly Center, our La Cienega store serves Mid-City West, Beverly Grove, West Hollywood, and the surrounding neighborhoods. It\'s the most central of our three locations — minutes from anywhere on the Westside or Mid-City.',
    faqs: sharedFaqs('La Cienega', '(310) 652-8100'),
  },
  {
    slug: 'canoga-park-check-cashing',
    area: 'Our Canoga Park store on DeSoto Ave serves the west San Fernando Valley — Canoga Park, Winnetka, Woodland Hills, and Chatsworth. Easy access and quick in-and-out service for the west Valley.',
    faqs: sharedFaqs('Canoga Park', '(818) 700-0490'),
  },
]

export function getLocationContent(slug: string): LocationContent | undefined {
  return locationContent.find(c => c.slug === slug)
}
