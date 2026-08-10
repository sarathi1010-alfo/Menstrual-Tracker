import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const guidesDirectory = path.join(process.cwd(), 'src/data/guides');
const blogDirectory = path.join(process.cwd(), 'src/data/blog');

export interface GuideMeta {
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  slug: string;
  category?: string;
  takeaways?: string[];
  faqs?: { question: string; answer: string }[];
}

export type ArticleMeta = GuideMeta;

export interface Guide {
  meta: GuideMeta;
  content: string;
}

export type Article = Guide;

export function getGuideSlugs(directory: string = guidesDirectory): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getArticleSlugs(): string[] {
  return getGuideSlugs(blogDirectory);
}

export function getGuideBySlug(slug: string, directory: string = guidesDirectory): Guide | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(directory, `${realSlug}.mdx`);

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
        category: data.category,
        takeaways: data.takeaways,
        faqs: data.faqs,
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading guide ${slug}:`, error);
    return null;
  }
}

export function getArticleBySlug(slug: string): Article | null {
  return getGuideBySlug(slug, blogDirectory);
}

export function getAllGuides(directory: string = guidesDirectory): GuideMeta[] {
  const slugs = getGuideSlugs(directory);
  const guides = slugs
    .map((slug) => getGuideBySlug(slug, directory))
    .filter((guide): guide is Guide => guide !== null)
    .map((guide) => guide.meta);

  return guides;
}

export function getAllArticles(): ArticleMeta[] {
  return getAllGuides(blogDirectory);
}
