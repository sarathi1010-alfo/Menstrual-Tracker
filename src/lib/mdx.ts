import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'src/data/blog');

export interface FAQ {
  question: string;
  answer: string;
}

export interface ArticleMeta {
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  slug: string;
  takeaways?: string[];
  faqs?: FAQ[];
}

export interface Article {
  meta: ArticleMeta;
  content: string;
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  return fs.readdirSync(blogDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);

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
        takeaways: data.takeaways || [],
        faqs: data.faqs || [],
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
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
