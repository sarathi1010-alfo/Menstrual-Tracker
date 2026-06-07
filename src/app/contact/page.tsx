import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Contact Us',
  description: 'Get in touch with the CycleHub team.',
  path: '/contact',
});

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-[var(--muted)]">
          Have a question, suggestion, or found a bug? We'd love to hear from you.
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="bg-[var(--surface)] p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
        <form action="https://formspree.io/f/placeholder" method="POST" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="text-center text-sm text-[var(--muted)]">
        <p>Alternatively, you can email us directly at <a href="mailto:hello@alfo.online" className="text-[var(--primary)] hover:underline">hello@alfo.online</a></p>
      </div>
    </div>
  );
}
