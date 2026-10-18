import React from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-surface shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold text-primary">
                  LunaCycle
                </Link>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/"
                  className="border-transparent text-gray-500 hover:border-primary hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Tracker
                </Link>
                <Link
                  href="/features"
                  className="border-transparent text-gray-500 hover:border-primary hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Features
                </Link>
                <Link
                  href="/blog"
                  className="border-transparent text-gray-500 hover:border-primary hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Blog
                </Link>
                <Link
                  href="/tools"
                  className="border-transparent text-gray-500 hover:border-primary hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Tools
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-surface border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-primary">LunaCycle</span>
              <p className="text-sm text-gray-500 mt-1">Privacy-first cycle tracking.</p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <Link href="/about" className="hover:text-primary">About</Link>
              <Link href="/faq" className="hover:text-primary">FAQ</Link>
              <Link href="/privacy" className="hover:text-primary">Privacy</Link>
              <Link href="/terms-of-service" className="hover:text-primary">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
