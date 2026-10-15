1. **Update `src/lib/mdx.ts`**:
   - Add support for reading from `src/data/blog`.
   - Update `GuideMeta` interface to include `takeaways: string[]` and `faqs: {question: string, answer: string}[]`.
   - Add `getArticleSlugs`, `getArticleBySlug`, and `getAllArticles` functions.
2. **Create new route templates**:
   - `src/app/blog/page.tsx` (Blog Landing)
   - `src/app/blog/[slug]/page.tsx`
   - `src/app/use-cases/[slug]/page.tsx`
   - `src/app/conditions/[slug]/page.tsx`
   - `src/app/[slug]/page.tsx` (for the top-level `/what-is-*` routes)
   - `src/app/faq/page.tsx`
   - `src/app/features/page.tsx`
3. **Generate the MDX Content**:
   - Create the 12 MDX files in `src/data/blog` for Cluster Articles, Micro-Answers, Use Case, and Condition Deep-Dive.
   - Include `takeaways`, `faqs`, and required schema fields.
4. **Update `src/components/Layout.tsx`**:
   - Change references of "CycleHub" to "LunaCycle" where appropriate, link to `/blog` and `/features`.
5. **Add `<MedicalDisclaimer />` component**:
   - Ensure it's imported and placed in the appropriate pages (as per memory, explicitly in page components, not globally).
6. **Update Sitemap and Indexing**:
   - Update `sitemap.ts` to dynamically include URLs from `src/data/blog` matching their intended paths (e.g., `/blog/X`, `/use-cases/Y`, `/what-is-Z`).
7. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
8. **Submit**.
