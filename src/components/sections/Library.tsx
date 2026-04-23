'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import booksData from '@/data/books.json';
import moviesData from '@/data/movies.json';
import socialData from '@/data/social.json';

type Book = (typeof booksData)[0];
type Movie = (typeof moviesData)[0];

function StarRating({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-xs transition-all duration-200"
          style={{ color: i < rating ? color : '#ffffff15' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function BookCard({ book, index }: { book: Book; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isInView = useInView(useRef<HTMLDivElement>(null) as React.RefObject<Element>, {
    once: true,
  });

  return (
    <motion.div
      className="group relative cursor-default"
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Book cover */}
      <motion.div
        className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3"
        animate={{ rotateY: hovered ? -8 : 0, scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Cover gradient placeholder */}
        <div
          className="w-full h-full flex flex-col items-center justify-center p-4"
          style={{
            background: `linear-gradient(135deg, ${book.color}30 0%, ${book.color}10 50%, #111113 100%)`,
            border: `1px solid ${book.color}20`,
          }}
        >
          {/* Try real image first */}
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-cover"
            onError={() => {}}
            unoptimized
          />

          {/* Spine accent */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
            style={{ background: `linear-gradient(to bottom, ${book.color}80, ${book.color}20)` }}
          />
        </div>

        {/* Hover overlay — review */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 p-4 flex flex-col justify-end"
              style={{ background: `linear-gradient(to top, ${book.color}E0, ${book.color}90, transparent)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p
                className="text-white text-xs leading-relaxed line-clamp-4"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {book.review}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Meta */}
      <div className="space-y-1 px-1">
        <StarRating rating={book.rating} color={book.color} />
        <h4
          className="text-white font-normal text-sm leading-tight line-clamp-2"
          style={{ fontFamily: 'var(--font-instrument-serif)' }}
        >
          {book.title}
        </h4>
        <p
          className="text-white/30 text-[10px] tracking-wider"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
        >
          {book.author}
        </p>
        <span
          className="inline-block text-[9px] px-2 py-0.5 rounded-full tracking-wider uppercase"
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            background: `${book.color}15`,
            color: `${book.color}80`,
          }}
        >
          {book.genre}
        </span>
      </div>
    </motion.div>
  );
}

function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative cursor-default"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="relative aspect-[2/3] rounded-lg overflow-hidden"
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ border: `1px solid ${movie.color}15` }}
      >
        {/* Poster placeholder */}
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(160deg, ${movie.color}25 0%, #111113 60%)`,
          }}
        >
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover"
            onError={() => {}}
            unoptimized
          />
        </div>

        {/* Type badge */}
        <div className="absolute top-2 left-2 z-10">
          <span
            className="text-[8px] px-2 py-0.5 rounded-full tracking-wider uppercase"
            style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              background: movie.type === 'tv' ? '#3B8BD420' : '#E8593C20',
              color: movie.type === 'tv' ? '#3B8BD4' : '#E8593C',
              border: `1px solid ${movie.type === 'tv' ? '#3B8BD430' : '#E8593C30'}`,
            }}
          >
            {movie.type === 'tv' ? 'TV' : 'Film'}
          </span>
        </div>

        {/* Hover review overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 p-3 flex flex-col justify-end"
              style={{
                background: `linear-gradient(to top, ${movie.color}D0, ${movie.color}70, transparent)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p
                className="text-white text-[11px] leading-relaxed line-clamp-3"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {movie.review}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-2 px-0.5 space-y-0.5">
        <p
          className="text-white/60 text-xs leading-tight line-clamp-1"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          {movie.title}
        </p>
        <div className="flex items-center gap-1.5">
          <StarRating rating={movie.rating} color={movie.color} />
          <span
            className="text-white/20 text-[9px]"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {movie.genre}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

type TabType = 'books' | 'movies' | 'listening';

export default function Library() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-5% 0px' });
  const [activeTab, setActiveTab] = useState<TabType>('books');

  return (
    <section
      ref={ref}
      id="library"
      className="relative py-28 md:py-40 px-6 md:px-12 max-w-6xl mx-auto"
      aria-label="Library"
    >
      {/* Section header */}
      <div className="mb-16">
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(242,237,232,0.55)' }}
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Library
        </motion.p>
        <motion.h2
          className="font-normal text-white leading-none mb-2"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          What I&apos;m{' '}
          <em className="text-white/40">consuming</em>
        </motion.h2>
        <motion.p
          className="text-white/30 text-sm mt-4"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Books read & screens watched in 2025. Hover to read my take.
        </motion.p>
      </div>

      {/* Tab switcher */}
      <motion.div
        className="flex gap-1 mb-12 p-1 rounded-full border border-white/10 w-fit"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {(['books', 'movies', 'listening'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-6 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
            style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              color: activeTab === tab ? '#0a0a0b' : 'rgba(255,255,255,0.3)',
            }}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-[#BA7517]"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <span className="relative z-10">
              {tab === 'books' ? '📚 Books' : tab === 'movies' ? '🎬 Screen' : '🎧 Listening'}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'books' ? (
          <motion.div
            key="books"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {booksData.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </motion.div>
        ) : activeTab === 'movies' ? (
          <motion.div
            key="movies"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {moviesData.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="listening"
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#1DB954]/10 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.721 12.9c.361.181.54.78.24 1.14zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.559.3z" />
                </svg>
              </div>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                Curated by Basanth
              </p>
            </div>
            
            <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0b]/50 p-2 backdrop-blur-sm">
              <iframe 
                src={`https://open.spotify.com/embed/playlist/${socialData.spotifyPlaylistId}?utm_source=generator&theme=0`} 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify Playlist"
                className="rounded-xl"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background accent */}
      <div
        className="absolute -right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-[120px] opacity-5"
        style={{ background: '#BA7517' }}
        aria-hidden
      />
    </section>
  );
}
