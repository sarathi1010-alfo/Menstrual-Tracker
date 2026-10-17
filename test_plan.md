1. **Create the Blog Landing Page**
   - Create `src/app/blog/page.tsx` mapping over all `getAllArticles()` articles. Include sections for cycle fundamentals, what-is articles, and the required medical disclaimer.
2. **Create the Missing Pages**
   - Create `src/app/faq/page.tsx` (using FAQPage schema and medical disclaimer).
   - Create `src/app/privacy/page.tsx` (emphasizing local storage only and medical disclaimer).
3. **Add Medical Disclaimers**
   - Ensure `src/components/MedicalDisclaimer.tsx` exists and use it in `src/app/page.tsx` (homepage), `src/app/about/page.tsx` (about page), `src/app/blog/page.tsx`, `src/app/faq/page.tsx`, and `src/app/privacy/page.tsx`.
4. **Create Article Pages**
   - Implement `src/app/blog/[slug]/page.tsx` and `src/app/[slug]/page.tsx` to handle standard blog articles and "what is" articles, filtering correctly based on `category`.
5. **Create Week 1 Content (MDX files)**
   - Pillar: `src/data/blog/ultimate-guide-menstrual-cycle-tracking.mdx` (Category: fundamentals)
   - Micros: `what-is-menstrual-cycle.mdx`, `what-is-ovulation.mdx`, `what-is-fertile-window.mdx`, `what-is-luteal-phase.mdx`, `what-is-follicular-phase.mdx` (Category: what-is).
6. **Update MDX Utility & Sitemap**
   - Update `src/lib/mdx.ts` to support reading from `src/data/blog` and extracting new frontmatter fields (`category`, `faqs`, `takeaways`).
   - Update `src/app/sitemap.ts` to properly handle the new routes dynamically. Ensure explicit cast to string literals like `'monthly' as const`.
7. **Ensure remark-gfm and @tailwindcss/typography are available**
   - Install required packages to support tables and typography styles in MDX rendering. Add `@tailwindcss/typography` to `globals.css` if necessary, or configure it correctly in `tailwind.config.ts`.
8. **Scripts for Audit & IndexNow**
   - Add `.mjs` scripts to handle 4xx Zombie Audits and IndexNow pings (`scripts/audit-4xx-zombies.mjs` and `scripts/indexnow.mjs`).
9. **Pre-commit and Test**
   - Ensure the Next.js build passes.
