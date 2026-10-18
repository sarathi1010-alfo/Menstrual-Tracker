import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Features</h1>

      <MedicalDisclaimer />

      <div className="mt-8 space-y-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Privacy-First Architecture</h2>
          <p className="text-gray-700">
            LunaCycle is built from the ground up to protect your data. All cycle data is stored locally on your device. We do not require an account, we do not sync your data to the cloud, and we do not sell your personal health information.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">No-Account Required</h2>
          <p className="text-gray-700">
            Start tracking immediately. There is no sign-up process, no email verification, and no passwords to remember. Simply open the app and log your cycle.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Local Storage</h2>
          <p className="text-gray-700">
            Your data never leaves your device unless you choose to export it yourself. By keeping all data local, you have complete control over who has access to your health information.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Comprehensive Tracking</h2>
          <p className="text-gray-700">
            Log your period dates, flow intensity, physical symptoms, and moods. Use this data to understand your body&apos;s patterns over time and predict future cycles with confidence.
          </p>
        </section>
      </div>
    </div>
  );
}
