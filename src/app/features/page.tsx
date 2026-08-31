import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-8">
      <MedicalDisclaimer />
      <h1 className="text-4xl font-bold mb-4">LunaCycle Features</h1>
      <p>Privacy-first, local-storage, and no-account architecture.</p>
    </div>
  );
}
