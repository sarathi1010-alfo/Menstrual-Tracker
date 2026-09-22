import { Metadata } from 'next';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Features | LunaCycle',
  description: 'Explore the privacy-first features of LunaCycle.',
};

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">LunaCycle Features</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        LunaCycle is designed with your privacy in mind. We believe your cycle data belongs to you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Privacy-First Architecture</h2>
          <p className="text-gray-600 dark:text-gray-400">
            All your data is stored locally on your device. We don&apos;t have access to your cycle logs, symptoms, or any personal information.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">No Account Required</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start tracking immediately without the hassle of creating an account or providing an email address.
          </p>
        </div>
      </div>

      <MedicalDisclaimer />
    </div>
  );
}
