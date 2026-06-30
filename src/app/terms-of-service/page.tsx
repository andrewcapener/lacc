import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Los Angeles Check Cashing.',
}

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Terms of Service</h1>
      <p className="text-gray-500 mb-8 text-sm">Last updated: January 2025</p>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Use of Website</h2>
          <p>By accessing and using the Los Angeles Check Cashing website (losangelescheckcashing.com), you agree to these terms of service. If you do not agree, please do not use the website.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Services</h2>
          <p>This website provides information about Los Angeles Check Cashing's financial services. Actual financial transactions are conducted in person at our physical locations. Website content is for informational purposes only and does not constitute a financial services agreement.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Accuracy of Information</h2>
          <p>We strive to keep information on this website accurate and up to date, including hours of operation, services offered, and fees. However, services, rates, and hours are subject to change without notice. Please call your nearest location to confirm current information.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Intellectual Property</h2>
          <p>All content on this website, including text, graphics, logos, and images, is the property of Los Angeles Check Cashing and is protected by applicable intellectual property laws. You may not reproduce or redistribute content without prior written permission.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Limitation of Liability</h2>
          <p>Los Angeles Check Cashing is not liable for any damages arising from your use of this website or reliance on information provided herein. We provide no warranties, express or implied, regarding the accuracy or completeness of the website content.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Governing Law</h2>
          <p>These terms are governed by the laws of the State of California. Any disputes shall be resolved in the courts of Los Angeles County, California.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact</h2>
          <p>For questions about these terms, call <a href="tel:2138002920" className="font-medium" style={{ color: '#1B5E20' }}>(213) 800-2920</a> or visit any of our Los Angeles locations.</p>
        </section>
      </div>
      <div className="md:hidden h-16" />
    </div>
  )
}
