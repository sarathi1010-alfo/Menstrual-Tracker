1. *Write MedicalDisclaimer component*
   - Create `src/components/MedicalDisclaimer.tsx` with the specified medical disclaimer.
2. *Write MDXComponents*
   - Create `src/components/MDXComponents.tsx` to handle custom link behavior and MedicalDisclaimer for MDX files.
3. *Update `src/lib/mdx.ts`*
   - Add support for articles (in `src/data/blog`), including `category`, `takeaways`, `faqs`, and `date`.
4. *Create Article MDX Files*
   - Write all 5 Cluster Articles in `src/data/blog/`.
   - Write all 5 Micro-Answer Pages in `src/data/blog/` (category: `what-is`).
   - Write 1 Use Case Guide in `src/data/blog/` (category: `use-cases`).
   - Write 1 Condition Deep-Dive in `src/data/blog/` (category: `conditions`).
5. *Create Page Components*
   - Create `src/app/blog/page.tsx` for the blog landing page.
   - Create `src/app/blog/[slug]/page.tsx` for cluster articles and generic blog posts.
   - Create `src/app/[slug]/page.tsx` for micro-answers (`what-is-...`).
   - Create `src/app/use-cases/[slug]/page.tsx` for use case guides.
   - Create `src/app/conditions/[slug]/page.tsx` for condition deep-dives.
6. *Update Sitemap*
   - Modify `src/app/sitemap.ts` to include the new articles dynamically based on category.
7. *Pre-commit steps*
   - Execute `pre_commit_instructions` to ensure proper testing, verification, review, and reflection are done.
8. *Submit*
   - Run indexing script simulation and submit.
