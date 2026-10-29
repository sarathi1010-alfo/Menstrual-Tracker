const fs = require('fs');

let mdxContent = fs.readFileSync('src/lib/mdx.ts', 'utf8');

// We need to add ArticleMeta type, and getArticleSlugs, getArticleBySlug, getAllArticles

const newContent = `
export type ArticleMeta = GuideMeta & {
  category?: string;
  takeaways?: string[];
  faqs?: { question: string; answer: string }[];
};

export interface Article {
  meta: ArticleMeta;
  content: string;
}

const blogDirectory = path.join(process.cwd(), 'src/data/blog');

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  return fs.readdirSync(blogDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\\.mdx$/, ''));
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const realSlug = slug.replace(/\\.mdx$/, '');
    const fullPath = path.join(blogDirectory, \`\${realSlug}.mdx\`);

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      meta: {
        slug: realSlug,
        title: data.title || '',
        summary: data.summary || '',
        seoTitle: data.seoTitle || data.title || '',
        seoDescription: data.seoDescription || data.summary || '',
        tags: data.tags || [],
        category: data.category || 'blog',
        takeaways: data.takeaways || [],
        faqs: data.faqs || [],
      },
      content,
    };
  } catch (error) {
    console.error(\`Error reading article \${slug}:\`, error);
    return null;
  }
}

export function getAllArticles(): ArticleMeta[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .map((article) => article.meta);

  return articles;
}
`;

fs.writeFileSync('src/lib/mdx.ts', mdxContent + newContent);
