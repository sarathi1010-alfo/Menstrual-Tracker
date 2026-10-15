import { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Features | LunaCycle',
  description: 'Discover the privacy-first features of LunaCycle, a complete local-storage menstrual cycle tracker.',
  openGraph: {
    title: 'Features | LunaCycle',
    description: 'Discover the privacy-first features of LunaCycle, a complete local-storage menstrual cycle tracker.',
    url: absoluteUrl('/features'),
  },
};

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">LunaCycle Features</h1>
      <p className="text-xl text-gray-600 mb-12 text-center">
        A completely private, no-account menstrual cycle tracker built for you.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">100% Privacy</h2>
          <p className="text-gray-700">
            No accounts, no cloud sync, no tracking. All your cycle data is stored locally on your device in your browser. We never see your data, and we never sell it.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">Smart Predictions</h2>
          <p className="text-gray-700">
            Our algorithm learns from your unique history to predict your next period and fertile window.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">Comprehensive Logging</h2>
          <p className="text-gray-700">
            Track bleeding intensity, daily symptoms, mood, and add custom notes for every day of your cycle to spot patterns over time.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">Data Portability</h2>
          <p className="text-gray-700">
            Easily export all your data to a JSON file for backup, or import it to a new device. You are always in control of your data.
          </p>
        </div>
      </div>
    </div>
  );
}
