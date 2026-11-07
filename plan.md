1. **Setup & Dependencies:**
   - Install `remark-gfm` and `@tailwindcss/typography` using `npm install remark-gfm @tailwindcss/typography` (Already done).
   - Configure `@tailwindcss/typography` in `src/app/globals.css`.

2. **Components:**
   - Create `src/components/MedicalDisclaimer.tsx`.
   - Create `src/components/MDXComponents.tsx`.

3. **Content Generation (MDX):**
   - Create `src/data/blog/menstrual-cycle-101-beginners-guide.mdx`.
   - Create `src/data/blog/cycle-phases-explained-follicular-ovulation-luteal.mdx`.
   - Create `src/data/blog/hormones-and-your-cycle-explained.mdx`.
   - Create `src/data/blog/how-to-track-your-cycle-step-by-step.mdx`.
   - Create `src/data/blog/understanding-your-period-normal-vs-not-normal.mdx`.
   - Create `src/data/blog/what-is-menstrual-cycle.mdx` (category: 'what-is').
   - Create `src/data/blog/what-is-ovulation.mdx` (category: 'what-is').
   - Create `src/data/blog/what-is-fertile-window.mdx` (category: 'what-is').
   - Create `src/data/blog/what-is-luteal-phase.mdx` (category: 'what-is').
   - Create `src/data/blog/what-is-follicular-phase.mdx` (category: 'what-is').
   - Create `src/data/blog/cycle-tracking-teens-guide.mdx` (category: 'use-cases').
   - Create `src/data/blog/pcos-and-cycle-tracking-guide.mdx` (category: 'conditions').
   *(Note: Ensure all MDX frontmatter uses double quotes for apostrophes where necessary, includes required metadata, `faqs` for Schema, and sets the correct `category`.)*

4. **Dynamic Routes & Pages:**
   - Implement `src/app/blog/page.tsx` (Blog Landing).
   - Implement `src/app/blog/[slug]/page.tsx` (Cluster Articles).
   - Implement `src/app/[slug]/page.tsx` (Micro-Answers).
   - Implement `src/app/use-cases/[slug]/page.tsx` (Use Cases).
   - Implement `src/app/conditions/[slug]/page.tsx` (Conditions).
   - Create `src/app/faq/page.tsx`.
   *(Note: Ensure dynamic pages map MDX correctly, filter by category in `generateStaticParams`, include MedicalDisclaimer and SchemaMarkup.)*

5. **Utilities & Configuration:**
   - Update `src/lib/mdx.ts` to support reading from `src/data/blog` and parsing `category` and `faqs`.
   - Update `src/app/sitemap.ts` to include the new routes dynamically filtering by category.
   - Inject `<MedicalDisclaimer />` into `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/privacy/page.tsx` (and other required pages per Memory).

6. **Post-Publishing Scripts:**
   - Create `scripts/publish-urls.mjs` to execute sitemap ping and IndexNow trigger.
   - Run the script or execute the curl commands manually.

7. **Verification & Pre-Commit:**
   - Run Next.js build (`npm run build`) to ensure no TypeScript or ESLint errors.
   - Complete pre-commit steps to make sure proper testing, verifications, reviews and reflections are done.
