'use client';

import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

interface TrackConfig {
  id: string;
  url: string;
  category: string;
}

// Map tracks by data-bgm parameter (could be the URL or an ID mapped here)
const TRACKS: Record<string, TrackConfig> = {
  data: { id: 'data', url: 'https://cdn.pixabay.com/audio/2022/05/16/audio_db6591201e.mp3', category: 'Data & Tech' },
  design: { id: 'design', url: 'https://cdn.pixabay.com/audio/2022/08/23/audio_d16737f4a1.mp3', category: 'Design & Visuals' },
  default: { id: 'default', url: 'https://cdn.pixabay.com/audio/2022/10/25/audio_2491fa5885.mp3', category: 'Reading' }
};

export function useBlogBGM(isMuted: boolean = false) {
  const [currentTrackId, setCurrentTrackId] = useState<string>('default');
  const howlsRef = useRef<Record<string, Howl>>({});
  
  // Initialize audio lazily
  useEffect(() => {
    Object.values(TRACKS).forEach(track => {
      howlsRef.current[track.id] = new Howl({
        src: [track.url],
        loop: true,
        volume: 0,
        html5: true, // Force HTML5 Audio to avoid large memory footprint
        preload: 'metadata'
      });
    });

    return () => {
      // Cleanup all sounds on unmount
      Object.values(howlsRef.current).forEach(howl => {
        howl.stop();
        howl.unload();
      });
    };
  }, []);

  // Handle mute global state
  useEffect(() => {
    // If we have an active track and toggle mute
    const howl = howlsRef.current[currentTrackId];
    if (howl) {
      if (isMuted) {
        howl.fade(howl.volume(), 0, 1000);
      } else {
        howl.play();
        howl.fade(0, 0.4, 2000);
      }
    }
  }, [isMuted, currentTrackId]);

  // Main track crossfade logic
  const playTrack = (trackId: string) => {
    if (currentTrackId === trackId) return;
    
    const prevHowl = howlsRef.current[currentTrackId];
    const newHowl = howlsRef.current[trackId];
    
    if (prevHowl) {
      prevHowl.fade(prevHowl.volume(), 0, 2000);
      setTimeout(() => prevHowl.pause(), 2000); // Pause after fade to save resources
    }
    
    if (newHowl && !isMuted) {
      if (!newHowl.playing()) newHowl.play();
      newHowl.fade(0, 0.4, 2000);
    }
    
    setCurrentTrackId(trackId);
  };

  // Intersection observer for heading changes
  useEffect(() => {
    // We only observe h2 and h3 inside the article container
    const headings = document.querySelectorAll('article h2[data-bgm], article h3[data-bgm]');
    if (headings.length === 0) {
      // If no headings have bgm, default to the default track if not muted
      if (!isMuted) {
        playTrack('default');
      }
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bgmType = entry.target.getAttribute('data-bgm');
          if (bgmType && TRACKS[bgmType]) {
            playTrack(bgmType);
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px', // Trigger when heading is near the top third
      threshold: 0
    });

    headings.forEach(h => observer.observe(h));
    
    // Play initial default or first heading track
    if (!isMuted) playTrack('default');

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMuted]);

  return {
    currentTrackId,
    currentTrackInfo: TRACKS[currentTrackId]
  };
}
