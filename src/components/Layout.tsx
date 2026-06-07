'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Home, Info, HelpCircle, Shield, ChevronDown } from 'lucide-react';
import { TrackerProvider } from '@/components/TrackerContext';
import { AdPlaceholder } from '@/components/AdPlaceholder';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

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
              <div className="relative">
                <button
                  onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsToolsDropdownOpen(false), 200)}
                  className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors"
                >
                  Tools Hub <ChevronDown size={14} />
                </button>
                {isToolsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg py-2">
                    <a href="https://resumeforge.alfo.online" className="block px-4 py-2 hover:bg-[var(--background)] text-sm">Resume Forge</a>
                    <a href="https://pdfutility.app" className="block px-4 py-2 hover:bg-[var(--background)] text-sm">PDF Utility</a>
                    <a href="https://paletteflow.alfo.online" className="block px-4 py-2 hover:bg-[var(--background)] text-sm">Palette Flow</a>
                    <a href="https://qrgenerator.alfo.online" className="block px-4 py-2 hover:bg-[var(--background)] text-sm">QR Generator</a>
                    <a href="https://emicalculator.alfo.online" className="block px-4 py-2 hover:bg-[var(--background)] text-sm">EMI Calculator</a>
                  </div>
                )}
              </div>
              <Link href="/tracker" className="hover:text-[var(--foreground)] transition-colors">Tracker</Link>
              <Link href="/guides" className="hover:text-[var(--foreground)] transition-colors">Blog</Link>
              <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">About</Link>
            </nav>
          </div>
        </header>

        <div className="w-full flex justify-center border-b border-gray-100 dark:border-gray-800/50 bg-[var(--surface)]/50">
          <AdPlaceholder type="leaderboard" />
          <AdPlaceholder type="mobile" />
        </div>

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

        <div className="w-full flex justify-center mt-8">
          <AdPlaceholder type="leaderboard" />
        </div>

        <footer className="bg-[var(--surface)] border-t border-gray-200 dark:border-gray-800 py-12 mt-12 pb-24 md:pb-12">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-[var(--muted)]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-bold text-lg text-[var(--primary)] mb-2">
                <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
                  <Calendar size={14} />
                </div>
                CycleHub
              </div>
              <p>Privacy-first menstrual cycle tracking. Save everything locally on your device.</p>
              <p className="mt-4">© {new Date().getFullYear()} <a href="https://alfo.online" className="hover:text-[var(--foreground)]">alfo.online</a>. All rights reserved.</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Tools Hub</h3>
              <a href="https://resumeforge.alfo.online" className="hover:text-[var(--foreground)] transition-colors">Resume Forge</a>
              <a href="https://pdfutility.app" className="hover:text-[var(--foreground)] transition-colors">PDF Utility</a>
              <a href="https://paletteflow.alfo.online" className="hover:text-[var(--foreground)] transition-colors">Palette Flow</a>
              <a href="https://qrgenerator.alfo.online" className="hover:text-[var(--foreground)] transition-colors">QR Generator</a>
              <a href="https://emicalculator.alfo.online" className="hover:text-[var(--foreground)] transition-colors">EMI Calculator</a>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Legal</h3>
              <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-[var(--foreground)] transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-[var(--foreground)] transition-colors">Contact</Link>
              <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">About</Link>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Social</h3>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Twitter / X</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">GitHub</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    </TrackerProvider>
  );
}
