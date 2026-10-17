1. **Create the Blog Landing Page**
   - Use `write_file` to create `src/app/blog/page.tsx` mapping over all `getAllArticles()` articles. Include sections for cycle fundamentals, what-is articles, and the required medical disclaimer.
2. **Verify Blog Landing Page**
   - Use `read_file` to verify the contents of `src/app/blog/page.tsx`.
3. **Update the Missing Pages**
   - Use `run_in_bash_session` to run a python script to update existing `src/app/faq/page.tsx` to include the medical disclaimer.
   - Use `run_in_bash_session` to run a python script to update existing `src/app/privacy/page.tsx` to include the medical disclaimer.
4. **Verify Missing Pages**
   - Use `read_file` to verify the contents of `src/app/faq/page.tsx` and `src/app/privacy/page.tsx`.
5. **Add Medical Disclaimers**
   - Use `write_file` to ensure `src/components/MedicalDisclaimer.tsx` exists. Use `run_in_bash_session` to run a python script to update `src/app/page.tsx` (homepage), `src/app/about/page.tsx` (about page) to include the medical disclaimer.
6. **Verify Medical Disclaimers**
   - Use `read_file` to verify the contents of `src/components/MedicalDisclaimer.tsx`, `src/app/page.tsx` and `src/app/about/page.tsx`.
7. **Create Article Pages**
   - Use `write_file` to create `src/app/blog/[slug]/page.tsx` and `src/app/[slug]/page.tsx` to handle standard blog articles and "what-is" articles, filtering correctly based on `category`.
8. **Verify Article Pages**
   - Use `read_file` to verify the contents of `src/app/blog/[slug]/page.tsx` and `src/app/[slug]/page.tsx`.
9. **Create Week 1 Content (MDX files)**
   - Use `run_in_bash_session` to run `cat << EOF` to create Pillar: `src/data/blog/ultimate-guide-menstrual-cycle-tracking.mdx` (Category: fundamentals)
   - Use `run_in_bash_session` to run `cat << EOF` to create Micros: `what-is-menstrual-cycle.mdx`, `what-is-ovulation.mdx`, `what-is-fertile-window.mdx`, `what-is-luteal-phase.mdx`, `what-is-follicular-phase.mdx` (Category: what-is).
10. **Verify Week 1 Content**
   - Use `list_files` in `src/data/blog` to verify the creation of the MDX files.
11. **Update MDX Utility & Sitemap**
   - Use `run_in_bash_session` to run a python script to update `src/lib/mdx.ts` to support reading from `src/data/blog` and extracting new frontmatter fields (`category`, `faqs`, `takeaways`).
   - Use `run_in_bash_session` to run a python script to update `src/app/sitemap.ts` to properly handle the new routes dynamically. Ensure explicit cast to string literals like `'monthly' as const`.
12. **Verify MDX Utility & Sitemap**
   - Use `read_file` to verify the contents of `src/lib/mdx.ts` and `src/app/sitemap.ts`.
13. **Ensure packages are available**
   - Use `run_in_bash_session` to run `npm install remark-gfm @tailwindcss/typography` to install required packages.
14. **Scripts for Audit & IndexNow**
   - Use `write_file` to create `.mjs` scripts to handle 4xx Zombie Audits and IndexNow pings (`scripts/audit-4xx-zombies.mjs` and `scripts/indexnow.mjs`).
15. **Verify Scripts**
   - Use `list_files` to verify the creation of the `.mjs` scripts.
16. **Build Project**
   - Use `run_in_bash_session` to run `npm run build` to ensure the project builds correctly and tests pass.
17. **Pre-commit step**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
18. **Submit the change**
   - Once all tests pass, submit the change.
