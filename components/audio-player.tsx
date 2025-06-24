'use client';

import React, { useRef, useState, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  data?:any
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src,data }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', setAudioDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newTime = parseFloat(event.target.value);
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
  <div className='flex items-center gap-2' style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8, maxWidth: 400 }}>
  <div className='flex flex-col'>
  <p className="text-sm font-medium">{data?.title || "Audio title"}</p>
      <audio ref={audioRef} src={src} />
<div className='flex gap-2 items-center'>
<button onClick={togglePlay}>
        {isPlaying ? '⏸' : '▶'}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ minWidth: 40 }}>{formatTime(currentTime)}</span>

        <input
            className='cursor-pointer'
          type="range"
          min={0}
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          ref={progressRef}
          style={{
            // flex: 1,
            width: '50%',
            appearance: 'none',
            height: '6px',
            borderRadius: '4px',
            background: `linear-gradient(to right, #0070f3 ${(currentTime / duration) * 100}%, #ccc 0%)`,
            outline: 'none',
          }}
        />

        <span style={{ minWidth: 40 }}>{formatTime(duration)}</span>
      </div>
</div>
      
    </div>
  </div>
    
  );
};

export default AudioPlayer;
