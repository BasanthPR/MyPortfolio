'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import socialData from '@/data/social.json';

type SocialData = typeof socialData & {
  youtubeVideoIds?: string[];
  instagramHandle?: string;
};

const social = socialData as SocialData;

const VIDEO_IDS: string[] = social.youtubeVideoIds ?? [];
const IG_HANDLE: string = social.instagramHandle ?? 'basanthyajman';

// Instagram post placeholder data
const IG_POSTS = Array.from({ length: 6 }, (_, i) => ({
  id: `ig-${i + 1}`,
  caption: [
    'Building in public 🚀 Day 47',
    'Design + Code = 💛',
    'The process is the product',
    'Shipped something that scared me',
    'First principles > best practices',
    'Making the invisible visible ✨',
  ][i],
  gradient: [
    'from-[#E8593C]/30 to-[#BA7517]/20',
    'from-[#3B8BD4]/30 to-[#1D9E75]/20',
    'from-[#8B5CF6]/30 to-[#3B8BD4]/20',
    'from-[#1D9E75]/30 to-[#E8593C]/20',
    'from-[#BA7517]/30 to-[#8B5CF6]/20',
    'from-[#E8593C]/30 to-[#3B8BD4]/20',
  ][i],
}));

function YouTubeEmbed({ videoId, index }: { videoId: string; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-5% 0px' });

  return (
    <motion.div
      ref={ref}
      className="relative aspect-video rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setLoaded(true)}
    >
      {!loaded ? (
        <>
          {/* Thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={`YouTube video ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#0a0a0b]/40 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-[#E8593C] flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>
          {/* Hover label */}
          <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span
              className="text-[9px] text-white/60 tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              Click to play
            </span>
          </div>
        </>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={`YouTube video ${index + 1}`}
        />
      )}
    </motion.div>
  );
}

function InstagramPost({
  post,
  index,
}: {
  post: (typeof IG_POSTS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={`https://instagram.com/${IG_HANDLE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="relative aspect-square rounded-xl overflow-hidden block"
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Instagram post: ${post.caption}`}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
      <div className="absolute inset-0 bg-[#0a0a0b]/30" />

      {/* IG grid placeholder texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Caption overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 bg-[#0a0a0b]/75 flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span className="text-white/60 text-lg mb-2">↗</span>
            <p
              className="text-white text-xs text-center leading-relaxed"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {post.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instagram icon */}
      {!hovered && (
        <div className="absolute bottom-3 right-3">
          <svg
            className="w-4 h-4 text-white/30"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </div>
      )}
    </motion.a>
  );
}

export default function Media() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-5% 0px' });

  const activeVideoIds = VIDEO_IDS.length > 0 ? VIDEO_IDS.slice(0, 3) : [];

  return (
    <section
      ref={ref}
      id="media"
      className="relative py-28 md:py-40 overflow-hidden"
      aria-label="Media"
    >
      {/* Warm amber gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, #BA751708 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            className="text-[10px] text-[#BA7517]/50 tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            [M·06] SIGNAL: STRONG
          </motion.p>
          <motion.h2
            className="font-normal text-white leading-none"
            style={{
              fontFamily: 'var(--font-instrument-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Content I&apos;m{' '}
            <em className="text-white/40">creating</em>
          </motion.h2>
        </div>

        {/* YouTube Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5"
                fill="#E8593C"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <p
                className="text-[10px] text-white/30 tracking-[0.35em] uppercase"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                YouTube
              </p>
            </div>
            <motion.a
              href={social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#E8593C]/60 hover:text-[#E8593C] transition-colors duration-300"
              whileHover={{ x: 3 }}
            >
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                Subscribe
              </span>
              <span>↗</span>
            </motion.a>
          </div>

          {activeVideoIds.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {activeVideoIds.map((id, i) => (
                <YouTubeEmbed key={id} videoId={id} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-20 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p
                className="text-[10px] text-white/20 tracking-[0.3em] uppercase mb-2"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                Videos coming soon
              </p>
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8593C]/50 hover:text-[#E8593C] text-sm transition-colors duration-300"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                Subscribe to get notified ↗
              </a>
            </motion.div>
          )}
        </div>

        {/* Instagram Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-white/40"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <p
                className="text-[10px] text-white/30 tracking-[0.35em] uppercase"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                Instagram
              </p>
            </div>
            <motion.a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors duration-300"
              whileHover={{ x: 3 }}
            >
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
              >
                @{IG_HANDLE}
              </span>
              <span>↗</span>
            </motion.a>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {IG_POSTS.map((post, i) => (
              <InstagramPost key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
