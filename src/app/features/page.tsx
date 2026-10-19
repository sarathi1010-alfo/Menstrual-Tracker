import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';

export const metadata = constructMetadata({
  title: 'Features - Privacy First Cycle Tracking',
  description: 'Discover why LunaCycle is the safest way to track your menstrual cycle. Local storage, no accounts, complete privacy.',
  path: '/features',
});

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <header className="text-center space-y-4">
        <h1 className="heading-1">Built for Privacy. Designed for You.</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          LunaCycle is re-imagining what a period tracker should be. No accounts. No servers. No selling your data. Just a simple, powerful tool that lives entirely on your device.
        </p>
      </header>

      <MedicalDisclaimer />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-8 border-[var(--primary)]/20 hover:border-[var(--primary)] transition-colors">
          <div className="text-3xl mb-4">🔒</div>
          <h2 className="heading-2 mb-4">100% Local Storage</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Every symptom you log, every date you track, and every prediction we make stays exactly where it belongs: on your device. We use your browser's local storage to save your data. We don't have servers to hack into, because we don't have servers at all.
          </p>
        </div>

        <div className="card p-8 border-[var(--primary)]/20 hover:border-[var(--primary)] transition-colors">
          <div className="text-3xl mb-4">👻</div>
          <h2 className="heading-2 mb-4">Zero Account Required</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            You shouldn't have to give up your email address or create a password to understand your body. LunaCycle works instantly the moment you open it. No sign-ups, no onboarding quizzes, no barriers.
          </p>
        </div>

        <div className="card p-8 border-[var(--primary)]/20 hover:border-[var(--primary)] transition-colors">
          <div className="text-3xl mb-4">📊</div>
          <h2 className="heading-2 mb-4">Smart Predictions</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Our algorithm learns your unique rhythm. By analyzing your past cycles locally, LunaCycle accurately predicts your next period, estimates your fertile window, and helps you plan your month without compromising your privacy.
          </p>
        </div>

        <div className="card p-8 border-[var(--primary)]/20 hover:border-[var(--primary)] transition-colors">
          <div className="text-3xl mb-4">⚡</div>
          <h2 className="heading-2 mb-4">Lightning Fast</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Because we don't need to communicate with a remote server to load your data, LunaCycle is incredibly fast. Your calendar, history, and predictions appear instantly, working perfectly even when you're completely offline.
          </p>
        </div>
      </section>
    </div>
  );
}
