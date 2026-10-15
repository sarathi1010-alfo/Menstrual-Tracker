1. **Update `src/lib/mdx.ts`**:
   - Keep existing `getGuide...` functions for backwards compatibility.
   - Add `getArticleSlugs`, `getArticleBySlug`, and `getAllArticles` functions to read from `src/data/blog`.
   - Update interfaces (e.g. `GuideMeta` or create `ArticleMeta`) to include optional fields: `takeaways: string[]` and `faqs: {question: string, answer: string}[]` and `schemaType: string`. Ensure we handle quotes in YAML parsing appropriately.

2. **Create New Components and Routes**:
   - `src/components/MedicalDisclaimer.tsx`: Create a reusable medical disclaimer component.
   - `src/components/AEOBox.tsx`: Component to render the key takeaways box.
   - `src/components/FAQAccordion.tsx`: Component to render the FAQ section.
   - `src/app/blog/page.tsx`: Blog landing page showing articles.
   - `src/app/blog/[slug]/page.tsx`: Route for `/blog/*`.
   - `src/app/use-cases/[slug]/page.tsx`: Route for `/use-cases/*`.
   - `src/app/conditions/[slug]/page.tsx`: Route for `/conditions/*`.
   - `src/app/what-is-[slug]/page.tsx`: Dynamic or explicit routes for the 5 micro-answer pages (`/what-is-menstrual-cycle`, `/what-is-ovulation`, etc.).
   - `src/app/faq/page.tsx`: Global FAQ page.

3. **Generate 12 MDX Files in `src/data/blog`**:
   - **Cluster Articles (5)**: `menstrual-cycle-101-beginners-guide.mdx`, `cycle-phases-explained-follicular-ovulation-luteal.mdx`, `hormones-and-your-cycle-explained.mdx`, `how-to-track-your-cycle-step-by-step.mdx`, `understanding-your-period-normal-vs-not-normal.mdx`.
   - **Micro-Answers (5)**: `what-is-menstrual-cycle.mdx`, `what-is-ovulation.mdx`, `what-is-fertile-window.mdx`, `what-is-luteal-phase.mdx`, `what-is-follicular-phase.mdx`.
   - **Use Case (1)**: `cycle-tracking-teens-guide.mdx`.
   - **Condition Deep-Dive (1)**: `pcos-and-cycle-tracking-guide.mdx`.
   - Ensure these files follow the template formats (e.g. H1 in metadata, not body) and include the required frontmatter. Include internal links appropriately (using MDX or simple Markdown links).

4. **Update `src/components/Layout.tsx`**:
   - Rebrand mentions of "CycleHub" to "LunaCycle".
   - Update navigation links to include `/blog` and `/features`.

5. **Update Sitemap (`src/app/sitemap.ts`)**:
   - Inject all new URLs dynamically based on the articles in `src/data/blog`. Determine the correct URL path based on the filename/slug (e.g. if slug starts with `what-is-`, prefix with `/`, if it's `cycle-tracking-teens-guide`, prefix with `/use-cases/`, etc).

6. **Complete Pre-commit Steps**:
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

7. **Submit Changes**.
