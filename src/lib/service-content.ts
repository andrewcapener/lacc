import type { Faq } from './faq'

// Detail-page content for each service. Currency exchange intentionally has no
// entry here — /money-exchange/ is the established page for that service and a
// second page would split its ranking signals.
export interface ServicePage {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  sections: { heading: string; body: string }[]
  faqs: Faq[]
}

// Maps a service id from lib/services to the page that covers it.
export function serviceHref(id: string): string {
  if (id === 'currency-exchange') return '/money-exchange/'
  const page = servicePages.find(p => p.id === id)
  return page ? `/services/${page.slug}/` : '/our-services/'
}

export const servicePages: (ServicePage & { id: string })[] = [
  {
    id: 'check-cashing',
    slug: 'check-cashing',
    title: 'Check Cashing',
    metaTitle: 'Check Cashing in Los Angeles — Fast, No Bank Account Needed',
    metaDescription: 'Cash payroll, government, tax refund, insurance, and personal checks at 3 LA locations. Walk in with your check and photo ID, walk out with cash. 50% off your first check.',
    intro: 'Turn your check into cash in minutes at any of our three LA stores — Sherman Oaks, La Cienega, or Canoga Park. All it takes is the check and a photo ID. There is no bank account requirement, no hold period, and no appointment: you leave with the money the same visit.',
    sections: [
      {
        heading: 'Checks We Cash',
        body: 'Paychecks from your employer, government and benefits checks, tax refunds, insurance settlements, and personal checks all qualify. Bring in whatever you have — if it can be cashed, we will cash it, usually in the time it takes to count the bills back to you.',
      },
      {
        heading: 'How It Works',
        body: 'Hand your check and a government-issued photo ID (driver\'s license, state ID, or passport) to the teller. We verify the check while you wait, count out your cash, and you\'re on your way — most visits take just a few minutes. Banks can hold a deposited check for days; here the money is in your pocket before you reach the parking lot.',
      },
      {
        heading: 'Know the Cost Before You Cash',
        body: 'Every fee is on the board at the counter — nothing is calculated behind the scenes and nothing is added later. Serving Los Angeles since 2004, we\'ve built three neighborhood stores on the same promise: fast service and honest, visible pricing. New customers pay half the normal fee on their first check.',
      },
    ],
    faqs: [
      {
        question: 'What kinds of checks can I cash?',
        answer: 'We cash payroll checks, government checks, tax refund checks, insurance checks, personal checks, and more at all three Los Angeles locations.',
      },
      {
        question: 'Do I need a bank account to cash a check?',
        answer: 'No. You don\'t need a bank account — just bring your check and a valid government-issued photo ID and we\'ll get cash in your hand.',
      },
      {
        question: 'What do I need to bring to cash a check?',
        answer: 'Your check and a valid government-issued photo ID, like a driver\'s license, state ID, or passport. No appointment necessary — just walk in.',
      },
      {
        question: 'How much does it cost to cash a check?',
        answer: 'Fees are competitive and posted clearly at each location, so you know the cost before you cash. First-time customers get 50% off their first check cashed.',
      },
    ],
  },
  {
    id: 'moneygram',
    slug: 'moneygram-money-transfers',
    title: 'MoneyGram Money Transfers',
    metaTitle: 'MoneyGram Money Transfers in Los Angeles — Send Money Fast',
    metaDescription: 'Send money domestically or internationally with MoneyGram at 3 Los Angeles locations. Recipients pick up cash at thousands of agent locations worldwide.',
    intro: 'Send money quickly and reliably with MoneyGram at any of our three Los Angeles locations. Whether you\'re sending funds to family across the country or across the world, we make it fast and straightforward.',
    sections: [
      {
        heading: 'Domestic and International Transfers',
        body: 'MoneyGram lets you send funds to any state in the U.S. or internationally to countries around the world. Your recipient can pick up cash at thousands of MoneyGram agent locations globally.',
      },
      {
        heading: 'How It Works',
        body: 'Come in with the cash you want to send and your recipient\'s details. We\'ll process the transfer in store, and your recipient picks up the money at their nearest MoneyGram location. Ask in store about current rates and delivery options for your destination.',
      },
    ],
    faqs: [
      {
        question: 'Can I send money internationally with MoneyGram?',
        answer: 'Yes. MoneyGram at Los Angeles Check Cashing lets you send money internationally to countries around the world, as well as domestically to any U.S. state.',
      },
      {
        question: 'How does my recipient get the money?',
        answer: 'Recipients can pick up cash at thousands of MoneyGram agent locations worldwide. Options vary by destination — ask in store when you send.',
      },
      {
        question: 'What do I need to send a MoneyGram transfer?',
        answer: 'Bring the cash you want to send, a valid photo ID, and your recipient\'s details. We\'ll handle the rest in store at any of our three LA locations.',
      },
    ],
  },
  {
    id: 'money-orders',
    slug: 'money-orders',
    title: 'Money Orders',
    metaTitle: 'Money Orders in Los Angeles — Safe, Secure, On the Spot',
    metaDescription: 'Buy money orders at 3 Los Angeles Check Cashing locations. A safe, widely accepted way to pay rent and bills — traceable and replaceable if lost or stolen.',
    intro: 'A money order is a safe, widely accepted alternative to cash or personal checks — perfect for paying rent, bills, and anyone who doesn\'t take cards. Come into any of our three Los Angeles locations with cash, and we\'ll issue your money order on the spot.',
    sections: [
      {
        heading: 'Why Use a Money Order?',
        body: 'Money orders are traceable and can be replaced if lost or stolen, which makes them far safer than mailing cash. Landlords, utilities, and businesses across Los Angeles accept them as guaranteed payment.',
      },
      {
        heading: 'How to Get One',
        body: 'Bring cash to any of our three locations and we\'ll issue your money order while you wait. No account needed, no appointment necessary.',
      },
    ],
    faqs: [
      {
        question: 'What can I use a money order for?',
        answer: 'Money orders are widely accepted for rent, utility bills, and payments to businesses or individuals who don\'t accept cash or cards. They\'re a safe, guaranteed form of payment.',
      },
      {
        question: 'What happens if my money order is lost or stolen?',
        answer: 'Unlike cash, money orders are traceable and can be replaced if lost or stolen — keep your receipt as proof of purchase.',
      },
      {
        question: 'How do I buy a money order?',
        answer: 'Come into any of our three Los Angeles locations with cash and we\'ll issue your money order on the spot. No bank account or appointment needed.',
      },
    ],
  },
  {
    id: 'notary-services',
    slug: 'notary-services',
    title: 'Notary Services',
    metaTitle: 'Notary Services in Los Angeles — Certified Notaries, Walk-Ins Welcome',
    metaDescription: 'Get documents notarized in Los Angeles: affidavits, powers of attorney, loan documents, and more. Call your nearest of our 3 locations to confirm notary availability.',
    intro: 'Need a document notarized in Los Angeles? Our certified notaries can handle a wide range of document notarizations — affidavits, powers of attorney, loan documents, and more.',
    sections: [
      {
        heading: 'Documents We Notarize',
        body: 'Our notaries handle affidavits, powers of attorney, loan documents, and many other document types. If you\'re not sure whether we can notarize your document, call your nearest location and ask.',
      },
      {
        heading: 'Availability',
        body: 'Notary availability varies by location and day. Call your nearest location to confirm hours and plan your visit — walk-ins are welcome whenever the notary is available.',
      },
    ],
    faqs: [
      {
        question: 'What documents can you notarize?',
        answer: 'Our certified notaries handle affidavits, powers of attorney, loan documents, and a wide range of other documents. Call your nearest location if you\'re unsure about yours.',
      },
      {
        question: 'Do I need an appointment for notary services?',
        answer: 'Walk-ins are welcome when the notary is available, but availability varies — call your nearest of our three Los Angeles locations first to confirm.',
      },
      {
        question: 'What should I bring to get a document notarized?',
        answer: 'Bring the complete, unsigned document and a valid government-issued photo ID. Sign in front of the notary, not before.',
      },
    ],
  },
  {
    id: 'prepaid-cards',
    slug: 'prepaid-cards',
    title: 'Prepaid Credit/Debit Cards',
    metaTitle: 'Prepaid Debit Cards in Los Angeles — Load Cash, Spend Anywhere',
    metaDescription: 'Get a prepaid debit card at 3 Los Angeles Check Cashing locations. Load funds and spend anywhere major cards are accepted — in stores, online, and at ATMs.',
    intro: 'A prepaid debit card is a convenient, flexible way to use your cash without carrying it around. Load funds onto your card at any of our three Los Angeles locations and spend anywhere major debit or credit cards are accepted.',
    sections: [
      {
        heading: 'Spend Anywhere Cards Are Accepted',
        body: 'Use your prepaid card in stores, online, and at ATMs — anywhere major debit or credit cards are accepted. It\'s cash convenience with card flexibility.',
      },
      {
        heading: 'Great for Budgeting',
        body: 'Because you load exactly what you want to spend, prepaid cards are a natural budgeting tool — and a practical option for shopping online or giving as gifts.',
      },
    ],
    faqs: [
      {
        question: 'Where can I use a prepaid debit card?',
        answer: 'Anywhere major debit or credit cards are accepted — in stores, online, and at ATMs.',
      },
      {
        question: 'Do I need a bank account to get a prepaid card?',
        answer: 'No bank account is needed. Bring cash to any of our three Los Angeles locations, load it onto your card, and start spending.',
      },
    ],
  },
]
