1. **Create data and blog directories using `run_in_bash_session`:**
   - Execute `mkdir -p src/data/blog src/app/blog/[slug] src/app/[slug] src/app/use-cases/[slug] src/app/conditions/[slug]`
2. **Verify directories using `run_in_bash_session`:**
   - Execute `ls -la src/data/blog src/app/blog src/app/use-cases src/app/conditions`
3. **Update `src/lib/mdx.ts` using `replace_with_git_merge_diff`:**
   - Ensure it parses `.mdx` files in `src/data/blog/`.
   - Ensure `GuideMeta` / `ArticleMeta` covers new frontmatter like `category`, `takeaways`, `faqs`. Add logic to parse arrays correctly.
   - Keep `getGuideSlugs` logic as required (immutable memory directive), but add new functions like `getAllArticles`, `getArticleBySlug`, etc.
4. **Verify `src/lib/mdx.ts` using `read_file`:**
   - Confirm updates were applied correctly.
5. **Create MDX Components and SchemaMarkup using `write_file`:**
   - Write `src/components/MDXComponents.tsx` mapping `<a>` to Next.js `<Link>` for internal links.
   - Write `src/components/MedicalDisclaimer.tsx` for the medical disclaimer section.
6. **Verify components using `run_in_bash_session`:**
   - Execute `ls -la src/components/MDXComponents.tsx src/components/MedicalDisclaimer.tsx`
7. **Write Cluster Blog Posts using `write_file`:**
   - `src/data/blog/menstrual-cycle-101-beginners-guide.mdx`
   - `src/data/blog/cycle-phases-explained-follicular-ovulation-luteal.mdx`
   - `src/data/blog/hormones-and-your-cycle-explained.mdx`
   - `src/data/blog/how-to-track-your-cycle-step-by-step.mdx`
   - `src/data/blog/understanding-your-period-normal-vs-not-normal.mdx`
8. **Write Micro-Answer Posts using `write_file`:**
   - `src/data/blog/what-is-menstrual-cycle.mdx`
   - `src/data/blog/what-is-ovulation.mdx`
   - `src/data/blog/what-is-fertile-window.mdx`
   - `src/data/blog/what-is-luteal-phase.mdx`
   - `src/data/blog/what-is-follicular-phase.mdx`
9. **Write Use Case and Condition Guides using `write_file`:**
   - `src/data/blog/cycle-tracking-teens-guide.mdx` (Use Case)
   - `src/data/blog/pcos-and-cycle-tracking-guide.mdx` (Condition)
10. **Verify MDX content creation using `run_in_bash_session`:**
   - Execute `ls -la src/data/blog/`
11. **Write App Routes for the New Content using `write_file`:**
   - Write `src/app/blog/page.tsx` (Blog Landing)
   - Write `src/app/blog/[slug]/page.tsx` (Blog template for `category === 'cluster'` and `category === 'pillar'`)
   - Write `src/app/[slug]/page.tsx` (Template for `category === 'what-is'`)
   - Write `src/app/use-cases/[slug]/page.tsx` (Template for `category === 'use-cases'`)
   - Write `src/app/conditions/[slug]/page.tsx` (Template for `category === 'conditions'`)
12. **Update `src/app/faq/page.tsx` using `replace_with_git_merge_diff`:**
   - Update FAQ page with specific SchemaMarkup import and usage.
13. **Verify page creation using `run_in_bash_session`:**
   - Execute `ls -la src/app/blog/page.tsx src/app/blog/[slug]/page.tsx src/app/[slug]/page.tsx src/app/use-cases/[slug]/page.tsx src/app/conditions/[slug]/page.tsx`
14. **Update `src/app/sitemap.ts` using `replace_with_git_merge_diff`:**
   - Fetch all these new articles based on their paths (filter by category to set the proper path).
15. **Verify `src/app/sitemap.ts` using `read_file`:**
   - Confirm updates were applied correctly.
16. **Testing & Verification using `run_in_bash_session`:**
   - Run `npm run build`
   - Start the dev server `npm run start &`
   - Write a Node.js script using `http` to test all generated URLs for 200 OK statuses.
17. **Post-Publishing indexing using `run_in_bash_session`:**
   - Ping Google: `curl "https://www.google.com/ping?sitemap=https://lunacycle.alfo.online/sitemap.xml"`
   - Trigger IndexNow: `curl -X POST https://api.indexnow.org/indexnow -H "Content-Type: application/json" -d '{"host":"lunacycle.alfo.online","key":"[YOUR_INDEXNOW_KEY]","urlList":["https://lunacycle.alfo.online/blog/menstrual-cycle-101-beginners-guide", ...]}'`
18. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
19. **Submit changes using `submit` tool.**
