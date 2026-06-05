import Link from 'next/link';
import { Calendar, Home, Info, HelpCircle, Shield } from 'lucide-react';
import { TrackerProvider } from '@/components/TrackerContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TrackerProvider>
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <header className="sticky top-0 z-10 bg-[var(--surface)]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[var(--primary)]">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
                <Calendar size={18} />
              </div>
              CycleHub
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--muted)]">
              <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
              <Link href="/tracker" className="hover:text-[var(--foreground)] transition-colors">Tracker</Link>
              <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">About</Link>
              <Link href="/faq" className="hover:text-[var(--foreground)] transition-colors">FAQ</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow w-full max-w-5xl mx-auto p-4 md:p-8">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--surface)] border-t border-gray-200 dark:border-gray-800 pb-[env(safe-area-inset-bottom)] z-10">
          <div className="flex justify-around p-3">
            <Link href="/" className="flex flex-col items-center gap-1 text-[var(--muted)] hover:text-[var(--primary)]">
              <Home size={20} />
              <span className="text-xs">Home</span>
            </Link>
            <Link href="/tracker" className="flex flex-col items-center gap-1 text-[var(--muted)] hover:text-[var(--primary)]">
              <Calendar size={20} />
              <span className="text-xs">Tracker</span>
            </Link>
            <Link href="/faq" className="flex flex-col items-center gap-1 text-[var(--muted)] hover:text-[var(--primary)]">
              <HelpCircle size={20} />
              <span className="text-xs">FAQ</span>
            </Link>
          </div>
        </nav>

        <footer className="bg-[var(--surface)] border-t border-gray-200 dark:border-gray-800 py-8 mt-12 pb-24 md:pb-8">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--muted)]">
            <p>© {new Date().getFullYear()} CycleHub. Privacy-first tracking.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="flex items-center gap-1 hover:text-[var(--foreground)]">
                <Shield size={14} /> Privacy Policy
              </Link>
              <Link href="/about" className="flex items-center gap-1 hover:text-[var(--foreground)]">
                <Info size={14} /> About
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </TrackerProvider>
  );
}
