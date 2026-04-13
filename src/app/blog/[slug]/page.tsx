import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import BlogBGMPlayer from '@/components/layout/BlogBGMPlayer';

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Markdown component overrides (similar to case studies)
const components = {
  h1: (props: any) => (
    <h1
      className="text-4xl md:text-6xl mb-8 font-normal !leading-[1.1]"
      style={{
        fontFamily: 'var(--font-instrument-serif)',
        color: 'var(--ivory)',
        letterSpacing: '-0.02em',
      }}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="text-2xl md:text-3xl mt-16 mb-6 font-normal"
      style={{ fontFamily: 'var(--font-instrument-serif)', color: 'var(--ivory)' }}
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="text-xl mt-12 mb-4 font-normal"
      style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--ivory)' }}
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="text-base md:text-lg leading-relaxed mb-6"
      style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(242,237,232,0.7)' }}
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="list-disc pl-6 mb-8 text-base md:text-lg space-y-2"
      style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(242,237,232,0.7)' }}
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="p-4 rounded-lg overflow-x-auto mb-8 border"
      style={{ 
        background: '#0F0F1A', 
        borderColor: 'rgba(242,237,232,0.1)',
        fontFamily: 'var(--font-jetbrains-mono)',
        fontSize: '0.85rem'
      }}
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="px-1.5 py-0.5 rounded"
      style={{ 
        background: 'rgba(242,237,232,0.05)', 
        color: 'var(--data)',
        fontFamily: 'var(--font-jetbrains-mono)'
      }}
      {...props}
    />
  ),
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#05050A]">
      <BlogBGMPlayer />
      
      {/* Hero Header */}
      <div 
        className="relative pt-40 pb-20 px-6 border-b"
        style={{ borderColor: 'rgba(242,237,232,0.05)', background: post.meta.coverGradient }}
      >
        <div className="max-w-3xl mx-auto">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-xs mb-12 hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.5)' }}
          >
            ← Back to writing
          </Link>
          
          <div className="mb-6 flex items-center gap-4 text-xs" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
            <span 
              className="px-2 py-1 rounded border"
              style={{ 
                color: post.meta.accent,
                borderColor: `${post.meta.accent}40`,
                backgroundColor: `${post.meta.accent}10`
              }}
            >
              [{post.meta.category}]
            </span>
            <span style={{ color: 'rgba(242,237,232,0.4)' }}>
              {new Date(post.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span style={{ color: 'rgba(242,237,232,0.4)' }}>
              {post.meta.readingTime} MIN READ
            </span>
          </div>

          <h1 
            className="font-normal leading-[1.1] mb-6"
            style={{
              fontFamily: 'var(--font-instrument-serif)',
              fontSize: 'clamp(3rem, 6vw, 6rem)',
              color: 'var(--ivory)',
              letterSpacing: '-0.02em',
            }}
          >
            {post.meta.title}
          </h1>
          
          <p 
            className="text-lg md:text-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(242,237,232,0.6)' }}
          >
            {post.meta.excerpt}
          </p>
        </div>
      </div>

      {/* Content Body */}
      <article className="max-w-3xl mx-auto px-6 py-20 pb-40">
        <MDXRemote source={post.content} components={components} />
      </article>
    </div>
  );
}
