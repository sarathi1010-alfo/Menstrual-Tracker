import { Metadata } from 'next';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Features | LunaCycle',
  description: 'Learn about LunaCycle&apos;s privacy-first, local-storage, and no-account architecture.',
};

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-8">
        LunaCycle Features
      </h1>

      <p className="text-xl text-[var(--muted)] mb-12">
        A privacy-first menstrual cycle tracking application built for your peace of mind.
      </p>

      <MedicalDisclaimer />

      <div className="grid gap-8 md:grid-cols-2 mt-12">
        <div className="bg-[var(--surface)] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary)]">Privacy First</h2>
          <p className="text-[var(--muted)]">
            We believe your health data belongs to you. LunaCycle operates with a privacy-first mindset, ensuring that your sensitive information is never shared or sold.
          </p>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary)]">Local Storage</h2>
          <p className="text-[var(--muted)]">
            All your cycle data is stored locally on your device. We don&apos;t have servers storing your personal health information, giving you complete control over your data.
          </p>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary)]">No Account Required</h2>
          <p className="text-[var(--muted)]">
            Start tracking immediately without the hassle of creating an account. There are no emails to verify, no passwords to remember, and no personal details required to sign up.
          </p>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary)]">Insightful Tracking</h2>
          <p className="text-[var(--muted)]">
            Log your cycle length, symptoms, and moods easily. Our application helps you identify patterns and better understand your body&apos;s rhythm.
          </p>
        </div>
      </div>
    </div>
  );
}
