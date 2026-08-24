import type { Faq } from './faq'
import { locations, locationServiceNames, Location } from './locations'

// Per-location page depth: a neighborhood paragraph and location-specific FAQs.
// Hours and services are derived from lib/locations so they can never drift
// from the schema and the on-page hours table.
export interface LocationContent {
  slug: string
  area: string
  faqs: Faq[]
}

function faqsFor(shortName: string, loc: Location): Faq[] {
  const services = locationServiceNames(loc)
  const servicesSentence = services.slice(0, -1).join(', ') + ', and ' + services[services.length - 1]
  return [
    {
      question: `What do I need to cash a check in ${shortName}?`,
      answer: 'Just your check and a valid government-issued photo ID. No bank account needed, no appointment — walk right in.',
    },
    {
      question: `What are your ${shortName} hours?`,
      answer: `Monday through Friday ${loc.hours.weekdays.label.replace(' - ', ' to ')}, and Saturday ${loc.hours.saturday.label.replace(' - ', ' to ')}. Closed Sunday.`,
    },
    {
      question: `What services are available at the ${shortName} location?`,
      answer: `${servicesSentence}.${loc.hasNotary ? ' Call ahead to confirm notary availability.' : ''}`,
    },
    {
      question: 'Do first-time customers get a discount?',
      answer: `Yes — 50% off your first check cashed. Mention the offer when you visit, or call ${loc.phone} with any questions.`,
    },
  ]
}

const bySlug = Object.fromEntries(locations.map(l => [l.slug, l]))

export const locationContent: LocationContent[] = [
  {
    slug: 'sherman-oaks-check-cashing',
    area: 'Our Sherman Oaks store sits right on Ventura Blvd, the Valley\'s main commercial corridor, making it an easy stop for customers across Sherman Oaks, Studio City, Encino, and Van Nuys. If you work or live anywhere in the south San Fernando Valley, this is your closest full-service check cashing location.',
    faqs: faqsFor('Sherman Oaks', bySlug['sherman-oaks-check-cashing']),
  },
  {
    slug: 'la-cienega-check-cashing',
    area: 'Located on W. 3rd Street near the Beverly Center, our La Cienega store serves Mid-City West, Beverly Grove, West Hollywood, and the surrounding neighborhoods. It\'s the most central of our three locations — minutes from anywhere on the Westside or Mid-City — and the home of our notary service.',
    faqs: faqsFor('La Cienega', bySlug['la-cienega-check-cashing']),
  },
  {
    slug: 'canoga-park-check-cashing',
    area: 'Our Canoga Park store on DeSoto Ave serves the west San Fernando Valley — Canoga Park, Winnetka, Woodland Hills, and Chatsworth. Easy access and quick in-and-out service for the west Valley, with the latest weekday hours of any of our stores.',
    faqs: faqsFor('Canoga Park', bySlug['canoga-park-check-cashing']),
  },
]

export function getLocationContent(slug: string): LocationContent | undefined {
  return locationContent.find(c => c.slug === slug)
}
