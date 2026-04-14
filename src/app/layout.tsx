import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { instrumentSerif, dmSans, jetbrainsMono } from '@/lib/fonts';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/layout/LoadingScreen';
import Navbar from '@/components/layout/Navbar';
import GlobalCanvas from '@/components/three/GlobalCanvas';
import MusicToggle from '@/components/ui/MusicToggle';
import SectionMusicSync from '@/components/layout/SectionMusicSync';
import InteractionAudio from '@/components/layout/InteractionAudio';
import ScrollToTop from '@/components/ui/ScrollToTop';
import siteData from '@/data/site.json';
import socialData from '@/data/social.json';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteData.url),
  title: {
    default: `${siteData.name} — Data Scientist & Designer`,
    template: `%s | ${siteData.name}`,
  },
  description: siteData.bio,
  keywords: [
    'data scientist', 'designer', 'developer', 'portfolio', 'machine learning',
    'web', 'frontend', 'Next.js', 'Python', 'PyTorch', siteData.name,
  ],
  authors: [{ name: siteData.name, url: siteData.url }],
  creator: siteData.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteData.url,
    siteName: siteData.name,
    title: `${siteData.name} — Data Scientist & Designer`,
    description: siteData.bio,
    images: [
      {
        url: siteData.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteData.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteData.name} — Data Scientist & Designer`,
    description: siteData.bio,
    images: [siteData.ogImage],
    creator: '@basanthyajman',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteData.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteData.name,
    url: siteData.url,
    sameAs: [
      socialData.github,
      socialData.linkedin,
      socialData.twitter,
    ].filter(Boolean),
    jobTitle: 'Data Scientist & Designer',
    description: siteData.bio,
    knowsAbout: [
      'Machine Learning', 'Deep Learning', 'Data Science',
      'UI/UX Design', 'Frontend Development', 'Python', 'React', 'Next.js',
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <meta name="theme-color" content="#05050A" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BY" />
      </head>
      <body className="bg-[#05050A] text-[#fafaf9] antialiased" style={{ fontFamily: 'var(--font-dm-sans)' }}>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <SmoothScroll>
          <LoadingScreen />
          <CustomCursor />
          <GlobalCanvas />
          <Navbar />
          <main id="main-content" className="relative z-10 w-full">
            {children}
          </main>
          <SectionMusicSync />
          <InteractionAudio />
          <ScrollToTop />
          <MusicToggle />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
