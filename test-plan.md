1. **Update MDX Utility (`src/lib/mdx.ts`)**
   - Add `category`, `takeaways`, and `faqs` fields to `GuideMeta`.
   - Export `ArticleMeta` as a type alias for `GuideMeta`.
   - Implement `getArticleSlugs`, `getArticleBySlug`, and `getAllArticles` to read from `src/data/blog` while keeping the `guides` logic intact.

2. **Create Core Components**
   - `src/components/MedicalDisclaimer.tsx`: A reusable disclaimer component.
   - `src/components/MDXComponents.tsx`: Custom components for `next-mdx-remote`, mapping `<a>` to Next.js `<Link>` for internal routes and configuring external links.
   - `src/components/FAQAccordion.tsx`: A component to render the FAQs and inject `FAQPage` schema.

3. **Create Route Templates**
   - `src/app/blog/page.tsx`: Blog landing page listing articles.
   - `src/app/blog/[slug]/page.tsx`: Dynamic route for standard blog posts (filtering by `category === 'blog'` or `category === 'cluster'`).
   - `src/app/use-cases/[slug]/page.tsx`: Dynamic route for use cases (filtering by `category === 'use-cases'`).
   - `src/app/conditions/[slug]/page.tsx`: Dynamic route for condition deep-dives (filtering by `category === 'conditions'`).
   - `src/app/[slug]/page.tsx`: Dynamic route for micro-answers (filtering by `category === 'what-is'`).

4. **Generate MDX Content**
   - Create the 12 MDX files specified in the prompt under `src/data/blog`.
   - Ensure H1s are removed from MDX bodies, mentions of LunaCycle are linked to `/`, AEO takeaways and FAQs are in frontmatter, and correct categories are assigned.

5. **Update Layout and Configuration**
   - Add `/blog` and `/features` to `src/components/Layout.tsx` navbar.
   - Update `src/app/sitemap.ts` to dynamically include the new routes.
   - Include `<MedicalDisclaimer />` in the relevant route files where requested.

6. **Post-Publishing Scripts**
   - Create a Node.js script to ping Google, trigger IndexNow, and validate the new URLs return 200 OK.

7. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
   - Run the pre-commit script to verify.

8. **Submit**
   - Submit the branch.
