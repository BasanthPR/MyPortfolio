import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/case-studies');

export interface CaseStudyMeta {
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  tags: string[];
  slug: string;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

export async function getCaseStudySlugs(): Promise<string[]> {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}

export async function getCaseStudyBySlug(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const htmlContent = await markdownToHtml(content);
  return { meta: data as CaseStudyMeta, content: htmlContent };
}

export async function getAllCaseStudies(): Promise<CaseStudyMeta[]> {
  const slugs = await getCaseStudySlugs();
  const studies = slugs.map((slug) => {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    return { ...data, slug } as CaseStudyMeta;
  });
  return studies.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
