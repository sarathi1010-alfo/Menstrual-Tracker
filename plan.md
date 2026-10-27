1. **Explore and structure the data**
   - Use `run_in_bash_session` to run `mkdir -p` for `src/data/blog`, `src/app/blog`, `src/app/use-cases`, and `src/app/conditions`.
2. **Update MDX utilities**
   - Use `write_file` or `run_in_bash_session` to update `src/lib/mdx.ts` to include `category`, `takeaways`, and `faqs` in `ArticleMeta` and provide functions like `getAllArticles`, `getArticleBySlug`, etc.
   - Use `read_file` to confirm the changes were successfully written to `src/lib/mdx.ts`.
3. **Create 12 new content files**
   - Use `write_file` or `run_in_bash_session` to create the following 12 files: `src/data/blog/menstrual-cycle-101-beginners-guide.mdx`, `src/data/blog/cycle-phases-explained-follicular-ovulation-luteal.mdx`, `src/data/blog/hormones-and-your-cycle-explained.mdx`, `src/data/blog/how-to-track-your-cycle-step-by-step.mdx`, `src/data/blog/understanding-your-period-normal-vs-not-normal.mdx`, `src/data/blog/what-is-menstrual-cycle.mdx`, `src/data/blog/what-is-ovulation.mdx`, `src/data/blog/what-is-fertile-window.mdx`, `src/data/blog/what-is-luteal-phase.mdx`, `src/data/blog/what-is-follicular-phase.mdx`, `src/data/blog/cycle-tracking-teens-guide.mdx`, `src/data/blog/pcos-and-cycle-tracking-guide.mdx`.
   - Use `list_files` on `src/data/blog` to verify their creation.
4. **Update Routes & Pages**
   - Use `write_file` or `run_in_bash_session` to create `src/components/MedicalDisclaimer.tsx`, `src/components/MDXComponents.tsx`, and `src/components/SchemaMarkup.tsx`. Use `read_file` to verify.
   - Use `write_file` or `run_in_bash_session` to create dynamic routes: `src/app/blog/[slug]/page.tsx`, `src/app/[slug]/page.tsx`, `src/app/use-cases/[slug]/page.tsx`, `src/app/conditions/[slug]/page.tsx`. Use `read_file` to verify.
   - Use `write_file` or `run_in_bash_session` to create the `/faq` page with `src/app/faq/page.tsx`. Use `read_file` to verify.
   - Use `write_file` or `run_in_bash_session` to update `src/app/sitemap.ts` to include the new dynamic routes. Use `read_file` to verify.
   - Use `write_file` or `run_in_bash_session` to create `/blog` landing page in `src/app/blog/page.tsx`. Use `read_file` to verify.
5. **Rebrand CycleHub to LunaCycle**
   - Use `replace_with_git_merge_diff` or `run_in_bash_session` to update `src/components/Layout.tsx` and `src/app/layout.tsx` to reflect the name `LunaCycle`. Use `read_file` to verify.
   - Use `replace_with_git_merge_diff` or `run_in_bash_session` to update `src/lib/seo.ts` to reflect the `LunaCycle` brand and URL. Use `read_file` to verify.
6. **Network & Post-Publishing Protocol**
   - Use `run_in_bash_session` to execute `npm run build`.
   - Use `run_in_bash_session` to run a node script to check all new 12 endpoints (and the blog/FAQ pages) for a 200 OK status on localhost.
   - Use `run_in_bash_session` to run the ping command to Google sitemaps via curl.
   - Use `run_in_bash_session` to trigger the IndexNow API for all 12 URLs via curl.
   - Use `write_file` or `run_in_bash_session` to generate `docs/internal-linking-map-2026-07-12.md`.
7. **Complete pre-commit steps**
   - Ensure proper testing, verification, review, and reflection are done by running `pre_commit_instructions` and acting accordingly.
8. **Submit**
   - Commit and submit changes with a proper branch name.
