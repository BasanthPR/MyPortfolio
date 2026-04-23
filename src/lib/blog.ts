import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: number;
  accent: string;
  featured: boolean;
  coverGradient: string;
  externalUrl?: string | null;
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? 'Untitled',
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        category: data.category ?? 'MISC',
        readingTime: data.readingTime ?? 5,
        accent: data.accent ?? '#C1121F',
        featured: data.featured ?? false,
        coverGradient: data.coverGradient ?? 'linear-gradient(135deg, #1A1A2E, #05050A)',
        externalUrl: data.externalUrl ?? null,
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): { content: string; meta: BlogPost } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    content,
    meta: {
      slug,
      title: data.title ?? 'Untitled',
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      category: data.category ?? 'MISC',
      readingTime: data.readingTime ?? 5,
      accent: data.accent ?? '#C1121F',
      featured: data.featured ?? false,
      coverGradient: data.coverGradient ?? 'linear-gradient(135deg, #1A1A2E, #05050A)',
    },
  };
}
