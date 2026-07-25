import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const guidesDirectory = path.join(process.cwd(), 'src/data/guides');
const BLOG_DIR = path.join(process.cwd(), 'src/data/blog');

export interface GuideMeta {
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  slug: string;
}

export interface Guide {
  meta: GuideMeta;
  content: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  takeaways?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface Article {
  meta: ArticleMeta;
  content: string;
}

// Keep existing guide functions to obey append-only rule
export function getGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDirectory)) {
    return [];
  }
  return fs.readdirSync(guidesDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getGuideBySlug(slug: string): Guide | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(guidesDirectory, `${realSlug}.mdx`);

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
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading guide ${slug}:`, error);
    return null;
  }
}

export function getAllGuides(): GuideMeta[] {
  const slugs = getGuideSlugs();
  const guides = slugs
    .map((slug) => getGuideBySlug(slug))
    .filter((guide): guide is Guide => guide !== null)
    .map((guide) => guide.meta);

  return guides;
}

// Add new blog functions
export function getArticleSlugs() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs.readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(BLOG_DIR, `${realSlug}.mdx`);
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
