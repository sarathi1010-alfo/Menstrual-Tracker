import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Helper function to safely read a directory
function safeReadDir(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

const guidesDirectory = path.join(process.cwd(), 'src/data/guides');
const blogDirectory = path.join(process.cwd(), 'src/data/blog');

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

export function getGuideSlugs(): string[] {
  return safeReadDir(guidesDirectory);
}

export function getArticleSlugs(): string[] {
  return safeReadDir(blogDirectory);
}

function getFileBySlugAndDir(slug: string, directory: string): Guide | null {
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
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading file ${slug} from ${directory}:`, error);
    return null;
  }
}

export function getGuideBySlug(slug: string): Guide | null {
  return getFileBySlugAndDir(slug, guidesDirectory);
}

export function getArticleBySlug(slug: string): Guide | null {
  return getFileBySlugAndDir(slug, blogDirectory);
}


export function getAllGuides(): GuideMeta[] {
  const slugs = getGuideSlugs();
  const guides = slugs
    .map((slug) => getGuideBySlug(slug))
    .filter((guide): guide is Guide => guide !== null)
    .map((guide) => guide.meta);

  return guides;
}

export function getAllArticles(): GuideMeta[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Guide => article !== null)
    .map((article) => article.meta);

  return articles;
}
