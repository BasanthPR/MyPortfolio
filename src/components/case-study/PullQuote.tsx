import { ReactNode } from 'react';

export default function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-16 pl-8 border-l-2 border-[#E8593C]">
      <p
        className="font-normal text-white/80 italic leading-tight"
        style={{
          fontFamily: 'var(--font-instrument-serif)',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}
      >
        {children}
      </p>
    </blockquote>
  );
}
