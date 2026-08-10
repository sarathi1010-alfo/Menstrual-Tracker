import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Terms of Service - LunaCycle Legal Information',
  description: 'Read the Terms of Service for LunaCycle. Understand our privacy commitment, data policies, and service limitations.',
  path: '/terms-of-service',
});

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-[var(--muted)] mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
        <p>By accessing and using LunaCycle (powered by alfo.online), you accept and agree to be bound by the terms and provision of this agreement.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. Description of Service</h2>
        <p>LunaCycle provides a set of tools for menstrual cycle tracking. The tools are provided &quot;as is&quot; and are for informational purposes only. They do not constitute medical advice.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. Privacy and Data Storage</h2>
        <p>All data entered into LunaCycle is stored locally on your device using your browser&apos;s local storage. We do not transmit, collect, or store your personal health data on any external servers.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">4. Disclaimer of Warranties</h2>
        <p>The service is provided without warranty of any kind. We do not guarantee the accuracy of predictions or calculations.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">5. Limitations of Liability</h2>
        <p>In no event shall LunaCycle or alfo.online be liable for any direct, indirect, incidental, special, consequential or exemplary damages.</p>
      </section>
    </div>
  );
}
