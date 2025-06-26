'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, SkipForward, SkipBack } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  duration: string;
  category?: string;
  onNext?: () => void;
  onPrev?: () => void;
  refBtn?:any
}

const AudioPlayerUI: React.FC<AudioPlayerProps> = ({ src, title, artist, duration, category, onNext, onPrev,refBtn }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setTotalDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newTime = parseFloat(e.target.value);

    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-red-50 to-red-100">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Volume2 className="h-5 w-5 mr-2 text-red-600" />
          Đang phát
        </CardTitle>
      </CardHeader>
      <CardContent>
        <audio ref={audioRef} src={src} preload="metadata" />

        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-gray-600">{artist}</p>
          {category && <p className="text-sm text-gray-500">{category}</p>}
        </div>

        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button variant="outline" size="icon" onClick={onPrev}>
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button size="icon" className="h-12 w-12 bg-red-600 hover:bg-red-700" onClick={togglePlay} ref={refBtn}>
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>

          <Button variant="outline" size="icon" onClick={onNext}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress bar */}
        <div className="w-full mb-2">
          <input
          
            type="range"
            min={0}
            max={totalDuration}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full appearance-none h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
            style={{
              background: `linear-gradient(to right, #dc2626 ${Math.floor((currentTime / totalDuration) * 100)}%, #e5e7eb 0%)`,
            }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{duration || formatTime(totalDuration)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayerUI;
