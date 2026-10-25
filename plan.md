1. **Explore & Analyze**: Understand the directory structure and the existing components, mainly `src/app`, `src/components`, `src/lib/mdx.ts`, `src/app/sitemap.ts`, etc.
2. **Setup Directories**: Use `run_in_bash_session` to run `mkdir -p src/app/blog src/app/use-cases src/app/conditions src/app/\[slug\] src/app/blog/\[slug\] src/app/use-cases/\[slug\] src/app/conditions/\[slug\]`. Then use `run_in_bash_session` to run `ls -la src/app` to verify.
3. **Install Dependencies**: Use `run_in_bash_session` to run `npm install remark-gfm`. Use `read_file` on `package.json` to verify the installation.
4. **Create Shared Components**:
    - Use `write_file` to create `src/components/MDXComponents.tsx`.
    - Use `write_file` to create `src/components/MedicalDisclaimer.tsx`.
    - Use `read_file` to verify the contents of both files.
5. **Update Utilities & Sitemap**:
    - Use `replace_with_git_merge_diff` to modify `src/lib/mdx.ts` and `src/app/sitemap.ts`.
    - Use `read_file` to verify the modified files.
6. **Create New Route Handlers**:
    - Use `write_file` to create `src/app/blog/page.tsx`.
    - Use `write_file` to create `src/app/blog/[slug]/page.tsx`.
    - Use `write_file` to create `src/app/use-cases/[slug]/page.tsx`.
    - Use `write_file` to create `src/app/conditions/[slug]/page.tsx`.
    - Use `write_file` to create `src/app/[slug]/page.tsx`.
    - Use `run_in_bash_session` with `ls -R src/app` to verify.
7. **Generate MDX Content**:
    - Use `write_file` to write all 12 MDX files into `src/data/blog/`.
    - Use `run_in_bash_session` with `ls -la src/data/blog/` to verify.
8. **Test Build & Indexing**:
    - Use `run_in_bash_session` to run `npm run build`.
    - Use `run_in_bash_session` to run the curl commands for indexing.
    - Use `run_in_bash_session` to run `node scripts/audit-4xx-zombies.mjs`.
9. **Pre-commit**: Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
10. **Submit**: Submit the changes.
