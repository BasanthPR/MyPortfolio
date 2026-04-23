'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useCursorStore } from '@/stores/cursorStore';
import { BlogPost } from '@/lib/blog';

export default function Blog({ posts }: { posts: BlogPost[] }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10% 0px' });
  const { setType } = useCursorStore();

  if (!posts || posts.length === 0) return null;

  const heroPost = posts[0];
  const sidePosts = posts.slice(1, 3);

  return (
    <section
      ref={ref}
      id="blog"
      className="relative py-28 md:py-40 bg-[#05050A]/40 backdrop-blur-sm"
      aria-label="Blog"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.55)' }}
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Writing
        </motion.p>

        <motion.h2
          className="font-normal leading-none mb-16"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            color: 'var(--ivory)',
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Transmissions
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Hero Card */}
          {heroPost && (
            <motion.div
              className="group relative flex-1 min-h-[400px] lg:min-h-[500px] rounded-lg overflow-hidden flex flex-col justify-end p-8 border border-white/5"
              style={{ background: heroPost.coverGradient }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setType('view')}
              onMouseLeave={() => setType('default')}
            >
              <Link href={`/blog/${heroPost.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${heroPost.title}`} />
              
              <div className="relative z-20 mt-auto">
                <span
                  className="inline-block px-2 py-1 mb-4 text-[9px] tracking-[0.2em] uppercase rounded border"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono)',
                    color: heroPost.accent,
                    borderColor: `${heroPost.accent}40`,
                    backgroundColor: `${heroPost.accent}10`
                  }}
                >
                  [{heroPost.category}]
                </span>
                <h3
                  className="font-normal leading-tight mb-4 group-hover:text-white transition-colors"
                  style={{
                    fontFamily: 'var(--font-instrument-serif)',
                    fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                    color: 'var(--ivory)'
                  }}
                >
                  {heroPost.title}
                </h3>
                <div className="flex items-center gap-4 text-xs" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--fog)' }}>
                  <span>{new Date(heroPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{heroPost.readingTime} MIN READ</span>
                  {heroPost.externalUrl && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <a
                        href={heroPost.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-30 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                      >
                        Read original ↗
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Side Stacked Cards */}
          <div className="flex-1 lg:max-w-[400px] flex flex-col gap-6">
            {sidePosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                className="group relative flex-1 min-h-[200px] rounded-lg overflow-hidden flex flex-col justify-end p-6 border border-white/5"
                style={{ background: post.coverGradient }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setType('view')}
                onMouseLeave={() => setType('default')}
              >
                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${post.title}`} />
                
                <div className="relative z-20 mt-auto">
                  <span 
                    className="inline-block px-2 py-0.5 mb-3 text-[8px] tracking-[0.2em] uppercase rounded border"
                    style={{ 
                      fontFamily: 'var(--font-jetbrains-mono)', 
                      color: post.accent,
                      borderColor: `${post.accent}40`,
                      backgroundColor: `${post.accent}10`
                    }}
                  >
                    [{post.category}]
                  </span>
                  <h3 
                    className="font-normal leading-tight mb-3 group-hover:text-white transition-colors"
                    style={{
                      fontFamily: 'var(--font-instrument-serif)',
                      fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                      color: 'var(--ivory)'
                    }}
                  >
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px]" style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--fog)' }}>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{post.readingTime} MIN</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
