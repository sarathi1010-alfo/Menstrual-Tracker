import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-extrabold text-pink-600 tracking-tight sm:text-7xl">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
        Cycle Tracker Page Not Found
      </h2>
      <p className="mt-3 text-base text-slate-600 max-w-md">
        The cycle calculator or tracking page you requested could not be found.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 transition-colors"
        >
          Return to LunaCycle
        </Link>
      </div>
    </div>
  );
}
