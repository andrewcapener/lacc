export interface Service {
  id: string
  title: string
  description: string
  icon: string
  slug: string
}

export const services: Service[] = [
  {
    id: 'check-cashing',
    title: 'Check Cashing',
    description: 'Have a check? We can most likely cash it. Bring in your check and ID and we\'ll get cash in your hand. 50% off your first check cashed with the coupon.',
    icon: 'DollarSign',
    slug: 'check-cashing',
  },
  {
    id: 'currency-exchange',
    title: 'Currency Exchange',
    description: 'We exchange most global currencies. Bring in your cash to be exchanged. Fast, reliable, and competitive rates at all 3 locations.',
    icon: 'RefreshCw',
    slug: 'currency-exchange',
  },
  {
    id: 'notary-services',
    title: 'Notary Services',
    description: 'Notary services in Los Angeles. Call for availability. Our certified notaries can handle a wide range of document notarizations.',
    icon: 'FileText',
    slug: 'notary-services',
  },
  {
    id: 'moneygram',
    title: 'MoneyGram Money Transfers',
    description: 'All MoneyGram services at our locations. Send money domestically or internationally quickly and reliably.',
    icon: 'Send',
    slug: 'moneygram-money-transfers',
  },
  {
    id: 'money-orders',
    title: 'Money Orders',
    description: 'Send a money order at any of our 3 locations. A safe, accepted alternative to cash or personal checks.',
    icon: 'Receipt',
    slug: 'money-orders',
  },
  {
    id: 'prepaid-cards',
    title: 'Prepaid Credit/Debit Cards',
    description: 'A convenient way to use cash; customizable cards. Load funds and use anywhere major credit cards are accepted.',
    icon: 'CreditCard',
    slug: 'prepaid-cards',
  },
]
