import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import publicationsData from '@/data/publications.json';

const SLUGS = ['pandemic-hospitalization-risk', 'multimodal-cancer-pathology', 'firesense-fire-detection', 'knowledge-graph-traffic'];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pub = publicationsData.find((p) => p.slug === slug);
  if (!pub) return { title: 'Publication Not Found' };
  return {
    title: `${pub.title} — Basanth`,
    description: pub.abstract,
  };
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();

  // Dynamic import to keep each page's bundle isolated
  const componentMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
    'pandemic-hospitalization-risk': () => import('@/components/publications/PandemicHospitalization'),
    'multimodal-cancer-pathology': () => import('@/components/publications/CancerPathology'),
    'firesense-fire-detection': () => import('@/components/publications/FireSense'),
    'knowledge-graph-traffic': () => import('@/components/publications/KnowledgeGraphTraffic'),
  };

  const { default: Component } = await componentMap[slug]();
  return <Component />;
}
