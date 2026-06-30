import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Los Angeles Check Cashing is committed to ensuring digital accessibility for people with disabilities.',
}

export default function AccessibilityPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Accessibility Statement</h1>
      <p className="text-gray-500 mb-8 text-sm">Last updated: January 2025</p>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Commitment</h2>
          <p>Los Angeles Check Cashing is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Conformance Status</h2>
          <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible to people with disabilities.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Technical Specifications</h2>
          <p>Accessibility of this website relies on the following technologies: HTML, CSS, JavaScript. We use semantic HTML elements, ARIA labels where appropriate, keyboard-navigable interfaces, and sufficient color contrast ratios.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Known Limitations</h2>
          <p>We are actively working to identify and resolve any accessibility issues. If you encounter a barrier, please contact us so we can address it promptly.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Feedback & Contact</h2>
          <p>We welcome your feedback on the accessibility of our website. If you experience any barriers or have suggestions for improvement, please contact us:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Phone: <a href="tel:2138002920" className="font-medium" style={{ color: '#1B5E20' }}>(213) 800-2920</a></li>
            <li>In person at any of our 3 Los Angeles locations</li>
          </ul>
          <p className="mt-3">We aim to respond to accessibility feedback within 2 business days.</p>
        </section>
      </div>
      <div className="md:hidden h-16" />
    </div>
  )
}
