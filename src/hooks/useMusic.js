import { useState, useEffect, useRef } from 'react';

export const useMusic = (musicUrl) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!musicUrl) return;

    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.6; // Soft, premium level volume
    audioRef.current = audio;

    return () => {
      if (audio) {
        audio.pause();
        audioRef.current = null;
      }
    };
  }, [musicUrl]);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio playback failed or blocked:', err);
        });
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMuted = !isMuted;
      audioRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return {
    isPlaying,
    isMuted,
    playMusic,
    pauseMusic,
    togglePlay,
    toggleMute,
  };
};
