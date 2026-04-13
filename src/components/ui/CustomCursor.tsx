'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useCursorStore } from '@/stores/cursorStore';
import { useIsTouch } from '@/hooks/useMediaQuery';

const TRAIL_LENGTH = 28;
const SAMPLE_INTERVAL = 12; // ms between position samples

interface Point {
  x: number;
  y: number;
  t: number;
}

/**
 * F1 Racing Line Cursor
 * Draws an SVG polyline trail that tapers and fades like a telemetry map.
 * Blood red → transparent. Shifts to gold on hover elements.
 */
export default function CustomCursor() {
  const isTouch = useIsTouch();
  const { type, setPosition, setVisible } = useCursorStore();
  const svgRef = useRef<SVGSVGElement>(null);
  const trailRef = useRef<Point[]>([]);
  const dotRef = useRef<SVGCircleElement>(null);
  const rafRef = useRef<number>(0);
  const lastSampleRef = useRef<number>(0);
  const mouseRef = useRef({ x: -100, y: -100 });
  const clickRef = useRef(false);
  const spokeGroupRef = useRef<SVGGElement>(null);

  const isHover = type === 'hover' || type === 'view' || type === 'play';
  const trailColor = isHover ? '#D4A843' : '#C1121F';

  const draw = useCallback(() => {
    const svg = svgRef.current;
    const dot = dotRef.current;
    if (!svg || !dot) return;

    const now = performance.now();
    const { x, y } = mouseRef.current;

    // Sample position at interval
    if (now - lastSampleRef.current > SAMPLE_INTERVAL) {
      trailRef.current.push({ x, y, t: now });
      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.shift();
      }
      lastSampleRef.current = now;
    }

    // Remove lines from previous frame
    while (svg.children.length > 2) {
      svg.removeChild(svg.lastChild!);
    }

    // Draw trail segments from oldest → newest
    const pts = trailRef.current;
    const n = pts.length;
    for (let i = 1; i < n; i++) {
      const ratio = i / n; // 0 = oldest, 1 = newest
      const opacity = ratio * ratio * 0.85; // quadratic fade
      const sw = 0.4 + ratio * 1.8; // stroke width taper

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(pts[i - 1].x));
      line.setAttribute('y1', String(pts[i - 1].y));
      line.setAttribute('x2', String(pts[i].x));
      line.setAttribute('y2', String(pts[i].y));
      line.setAttribute('stroke', trailColor);
      line.setAttribute('stroke-width', String(sw));
      line.setAttribute('stroke-opacity', String(opacity));
      line.setAttribute('stroke-linecap', 'round');
      svg.appendChild(line);
    }

    // Update dot position
    dot.setAttribute('cx', String(x));
    dot.setAttribute('cy', String(y));
    dot.setAttribute('fill', trailColor);

    // Click burst — draw 6 radiating spokes
    if (clickRef.current && spokeGroupRef.current) {
      const g = spokeGroupRef.current;
      g.innerHTML = '';
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const spoke = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        spoke.setAttribute('x1', String(x));
        spoke.setAttribute('y1', String(y));
        spoke.setAttribute('x2', String(x + Math.cos(angle) * 18));
        spoke.setAttribute('y2', String(y + Math.sin(angle) * 18));
        spoke.setAttribute('stroke', trailColor);
        spoke.setAttribute('stroke-width', '1');
        spoke.setAttribute('stroke-opacity', '0.7');
        spoke.setAttribute('stroke-linecap', 'round');
        g.appendChild(spoke);
      }
      clickRef.current = false;
      setTimeout(() => {
        if (spokeGroupRef.current) spokeGroupRef.current.innerHTML = '';
      }, 280);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [trailColor]);

  useEffect(() => {
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition(e.clientX, e.clientY);
    };
    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);
    const handleClick = () => { clickRef.current = true; };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);
    window.addEventListener('click', handleClick);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [isTouch, draw, setPosition, setVisible]);

  if (isTouch) return null;

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed inset-0 z-[9999] w-full h-full"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden
    >
      {/* Spoke burst group (click effect) */}
      <g ref={spokeGroupRef} />

      {/* Tip dot */}
      <circle
        ref={dotRef}
        cx={-100}
        cy={-100}
        r={isHover ? 4 : 3}
        style={{ transition: 'r 0.2s' }}
      />
    </svg>
  );
}
