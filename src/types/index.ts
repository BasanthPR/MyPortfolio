export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  tags?: string[];
  thumbnail: string;
  video?: string;
  accent?: string;
  link?: string;
  github?: string;
  caseStudySlug?: string | null;
  year: number;
  featured: boolean;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  color?: string;
  rating: number;
  review: string;
  year: number;
  genre: string;
}

export interface Movie {
  id: string;
  title: string;
  poster: string;
  color?: string;
  rating: number;
  review: string;
  type: 'movie' | 'tv';
  year: number;
  genre: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  source?: string | null;
}

export interface SocialLinks {
  youtube?: string;
  youtubeVideoIds?: string[];
  instagramHandle?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  email: string;
  twitter?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  bio: string;
  shortBio: string;
  ogImage: string;
  url: string;
  location: string;
  availability: string;
}

export type CursorType = 'default' | 'hover' | 'view' | 'play' | 'drag' | 'text';

export interface CursorState {
  type: CursorType;
  x: number;
  y: number;
}

export interface MusicTrack {
  id: string;
  src: string;
  section: string;
  volume: number;
}
