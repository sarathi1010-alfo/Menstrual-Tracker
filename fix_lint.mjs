import fs from 'fs';

let content = fs.readFileSync('src/app/blog/[slug]/page.tsx', 'utf8');
content = content.replace("import { getArticleBySlug, getArticleSlugs, getAllArticles } from '@/lib/mdx';", "import { getArticleBySlug, getAllArticles } from '@/lib/mdx';");
fs.writeFileSync('src/app/blog/[slug]/page.tsx', content);
