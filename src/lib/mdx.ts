import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const guidesDirectory = path.join(process.cwd(), 'src/data/guides');

export interface GuideMeta {
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  slug: string;
  takeaways?: string[];
  faqs?: {question: string, answer: string}[];
  category?: string;
}

export type ArticleMeta = GuideMeta;

export interface Guide {
  meta: GuideMeta;
  content: string;
}

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


const blogDirectory = path.join(process.cwd(), 'src/data/blog');

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  return fs.readdirSync(blogDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getArticleBySlug(slug: string): Guide | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    // Try blog directory first
    let fullPath = path.join(blogDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      // Fallback to guides directory for backward compatibility
      fullPath = path.join(guidesDirectory, `${realSlug}.mdx`);
      if (!fs.existsSync(fullPath)) return null;
    }

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
        takeaways: data.takeaways || undefined,
        faqs: data.faqs || undefined,
        category: data.category || 'blog', // Default category
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export function getAllArticles(): ArticleMeta[] {
  // Combine slugs from both directories for backward compatibility or just use blog if preferred
  // For now, let's just get all articles from the blog directory and guides
  const blogSlugs = getArticleSlugs();
  const guideSlugs = getGuideSlugs();

  // Deduplicate in case a slug exists in both (prefer blog)
  const uniqueSlugs = Array.from(new Set([...blogSlugs, ...guideSlugs]));

  const articles = uniqueSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Guide => article !== null)
    .map((article) => article.meta);

  return articles;
}
