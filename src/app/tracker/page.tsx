import { Metadata } from 'next';
import { CycleCalendar } from '@/components/CycleCalendar';
import { PredictionCard } from '@/components/PredictionCard';
import { HistoryChart } from '@/components/HistoryChart';
import { SchemaMarkup } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Tracker Dashboard',
  description: 'View your cycle calendar, predictions, and history.',
};

export default function TrackerPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CycleHub Tracker",
    "url": "https://cyclehub.example.com/tracker",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "description": "A privacy-first, local-only menstrual cycle tracker and prediction tool.",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  };

  return (
    <div className="space-y-8">
      <SchemaMarkup schema={softwareSchema} />
      <div>
        <h1 className="heading-2 mb-2">Your Cycle Dashboard</h1>
        <p className="text-[var(--muted)]">Tap any date on the calendar to log the start of your period.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <CycleCalendar />
          <HistoryChart />
        </div>

        <div className="space-y-6">
          <PredictionCard />

          <div className="card p-6 border border-[var(--secondary)]/30 bg-[var(--secondary)]/5">
            <h3 className="font-semibold text-[var(--secondary)] mb-2">Medical Disclaimer</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Predictions and fertile window estimates are based on standard calendar calculations and your personal averages.
              They should <strong>not</strong> be used as a primary form of birth control or medical advice.
              Cycles naturally vary due to stress, health, and lifestyle changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
