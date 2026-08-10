import { Metadata } from 'next';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Features - LunaCycle',
  description: 'Learn about the features of LunaCycle, a privacy-first period tracker.',
};

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="heading-1">Features</h1>
      <p className="text-[var(--muted)]">LunaCycle is built with privacy and offline capabilities first.</p>
      <ul className="list-disc pl-5 space-y-4">
        <li>100% private, no server.</li>
        <li>Local storage on your device.</li>
        <li>No accounts needed.</li>
      </ul>
      <MedicalDisclaimer />
    </div>
  );
}
