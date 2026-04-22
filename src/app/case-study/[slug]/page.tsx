import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/mdx';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import ReadingProgress from '@/components/case-study/ReadingProgress';
import Footer from '@/components/layout/Footer';

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) notFound();

  return (
    <>
      <ReadingProgress />
      <CaseStudyHero meta={study.meta} />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div
          dangerouslySetInnerHTML={{ __html: study.content }}
          className="case-study-prose"
        />
      </article>
      <Footer />
    </>
  );
}
