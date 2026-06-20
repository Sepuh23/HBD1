import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track } from '../types';
import { AppConfig } from '../utils/configStore';

const DEFAULT_FALLBACK_PLAYLIST: Track[] = [
  {
    id: 'track-1',
    title: 'Semua Aku Dirayakan (Classical Piano Op. 9)',
    artist: 'Chopin - Romantic Tribute',
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Frederic_Chopin_-_Nocturne_Op_9_No_2_E_flat_Major.mp3',
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=260',
  },
  {
    id: 'track-2',
    title: 'Gymnopédie of the Soul',
    artist: 'Erik Satie - Emotional Mood',
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Erik_Satie_-_Gymnop%C3%A9die_No._1.mp3',
    cover: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=260',
  },
  {
    id: 'track-3',
    title: 'Love Moonlight Sonata',
    artist: 'Beethoven - Evening Serenade',
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Beethoven_Moonlight_Sonata_MCG.mp3',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=260',
  }
];

interface MusicPlayerProps {
  autoPlay: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hidden?: boolean;
  config: AppConfig;
  theme?: 'cream' | 'skyblue';
}

export default function MusicPlayer({ autoPlay, isOpen: controlledIsOpen, onOpenChange, hidden, config, theme = 'cream' }: MusicPlayerProps) {
  const playlist = config.playlist && config.playlist.length > 0 ? config.playlist : DEFAULT_FALLBACK_PLAYLIST;

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Safe boundary check for currentTrack in case index gets out of bounds during live playlist edits
  const safeIndex = currentIndex >= playlist.length ? 0 : currentIndex;
  const currentTrack = playlist[safeIndex] || DEFAULT_FALLBACK_PLAYLIST[0];

  // Unified play trigger when source is ready or open state changes
  React.useLayoutEffect(() => {
    const audio = audioRef.current;
    if (!audio || !resolvedSrc) return;

    const attemptPlay = () => {
      initAudioNodes();
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log('Playback attempt deferred or failed:', e);
      });
    };

    // If widget is opened or autoplay is active, and we aren't playing yet
    if ((isOpen || (autoPlay && !hidden)) && !isPlaying) {
      attemptPlay();
    }
  }, [resolvedSrc, isOpen, autoPlay, hidden]);

  // Handle track source resolution
  useEffect(() => {
    setResolvedSrc(currentTrack.src || null);
  }, [currentTrack.src]);

  // Audio elements event listeners & track loading
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    // Ensure audio loads correctly when source updates
    if (resolvedSrc) {
      audio.load();
    }

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentIndex, resolvedSrc]);

  // Handle changes in volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Set up Visualizer Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localFrameId: number;

    const drawFreq = () => {
      localFrameId = requestAnimationFrame(drawFreq);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = 3;
      const spacing = 4;
      const count = Math.floor(canvas.width / (barWidth + spacing));

      if (analyserRef.current && isPlaying) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        for (let i = 0; i < count; i++) {
          const sampleIndex = Math.floor((i / count) * bufferLength * 0.6); // focus on mid-low
          const value = dataArray[sampleIndex];
          const percent = value / 255;
          const height = Math.max(2, percent * canvas.height * 0.85);
          const x = i * (barWidth + spacing);
          const y = canvas.height - height;

          // Cute romantic pink-gold gradient or gorgeous sky blue gradient
          const r = theme === 'cream' ? 232 : 14;
          const g = theme === 'cream' ? 105 : 165;
          const b = theme === 'cream' ? 138 : 233;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.45 + percent * 0.55})`;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, height, 1.5);
          ctx.fill();
        }
      } else {
        // Flat line default wave
        for (let i = 0; i < count; i++) {
          const height = 2 + Math.abs(Math.sin(i * 0.3 + Date.now() * 0.003)) * 4;
          const x = i * (barWidth + spacing);
          const y = canvas.height - height;
          const r = theme === 'cream' ? 232 : 14;
          const g = theme === 'cream' ? 105 : 165;
          const b = theme === 'cream' ? 138 : 233;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.4)`;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, height, 1.5);
          ctx.fill();
        }
      }
    };

    drawFreq();
    return () => {
      cancelAnimationFrame(localFrameId);
    };
  }, [isPlaying, theme]);

  const initAudioNodes = () => {
    if (audioContextRef.current) return; // already initialized

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx || !audioRef.current) return;

      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
    } catch (e) {
      console.warn('Web Audio node initialization deferred:', e);
    }
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!resolvedSrc) {
      console.error('Playback error: No source provided.');
      return;
    }

    // Ensure AudioContext is initialized and resumed
    initAudioNodes();
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (e) {
        console.error('Playback error:', e);
        setIsPlaying(false);
      }
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setProgress(0);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log(e));
      }
    }, 100);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setProgress(0);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log(e));
      }
    }, 100);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (audioRef.current) {
      audioRef.current.currentTime = (val / 100) * duration;
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={resolvedSrc || undefined}
        loop={false}
      />

      {/* Floating Vinyl Record Player (Bottom Left) */}
      {!hidden && (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: -40 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
          className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-45 select-none flex items-center gap-3"
        >
          {/* Turntable Base Case */}
          <div 
            onClick={() => {
              initAudioNodes();
              setIsOpen(!isOpen);
            }}
            className={`relative w-14 h-14 md:w-24 md:h-24 rounded-2xl p-1.5 md:p-2 flex items-center justify-center group cursor-pointer transition-transform duration-300 hover:scale-103 ${
              theme === 'cream'
                ? 'bg-gradient-to-br from-[#26180f] to-[#120a05] border border-romantic-gold/25 shadow-[0_16px_36px_rgba(37,22,11,0.45)]'
                : 'bg-gradient-to-br from-[#112435] to-[#040e1a] border border-sky-300/25 shadow-[0_16px_36px_rgba(4,14,26,0.45)]'
            }`}
          >
            {/* Circular Vinyl Groove Deck Indentation */}
            <div className="absolute inset-1.5 md:inset-2.5 rounded-full border border-white/[0.04] bg-black/50 pointer-events-none" />

            {/* Vinyl Disc */}
            <div
              style={{
                animation: isPlaying ? 'spin 12s linear infinite' : 'none',
                transformStyle: 'preserve-3d',
              }}
              className="relative w-11 h-11 md:w-20 md:h-20 rounded-full bg-neutral-900 border-2 border-neutral-850 shadow-[0_4px_16px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden"
            >
              {/* Concentric Groove Lines */}
              <div className="absolute inset-[2px] md:inset-[3px] rounded-full border border-white/[0.03]" />
              <div className="absolute inset-1.5 md:inset-2 rounded-full border border-white/[0.06]" />
              <div className="absolute inset-2.5 md:inset-3.5 rounded-full border border-white/[0.03]" />
              <div className="absolute inset-3.5 md:inset-5 rounded-full border border-white/[0.05]" />
              <div className="absolute inset-[18px] md:inset-[26px] rounded-full border border-white/[0.03]" />

              {/* Song Label (Center Circle with Album Art) */}
              <div className="relative w-5 h-5 md:w-9 md:h-9 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center border border-black z-10 pointer-events-none">
                <img
                  src={currentTrack.cover || undefined}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover rounded-full"
                />
                {/* Spindle center hole */}
                <div className={`absolute w-1 h-1 md:w-2 md:h-2 rounded-full border border-black shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.8)] ${
                  theme === 'cream' ? 'bg-romantic-gold' : 'bg-sky-300'
                }`} />
              </div>

              {/* Vinyl shininess reflection overlays */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.04] mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.07] via-transparent to-transparent mix-blend-overlay rotate-45 pointer-events-none" />
            </div>

            {/* Retro Pivot Styles Stylus Tonearm */}
            <div 
              className="absolute top-1 right-1.5 w-8 h-12 pointer-events-none transition-transform duration-700 origin-[10px_10px] z-20 scale-65 md:scale-100 md:top-2 md:right-2.5"
              style={{
                transform: isPlaying ? 'rotate(24deg)' : 'rotate(0deg)',
              }}
            >
              {/* Head pivot joint */}
              <div className={`absolute top-0.5 left-1 md:top-1 md:left-2 w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full border border-white/10 shadow-sm ${
                theme === 'cream'
                  ? 'bg-gradient-to-br from-romantic-gold to-yellow-600'
                  : 'bg-gradient-to-br from-sky-400 to-blue-500'
              }`} />
              {/* Arm line string */}
              <div className="absolute top-1.5 left-[7px] md:top-2.5 md:left-[12px] w-0.5 h-6 md:h-10 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-400 rounded-full" />
              {/* Curved stylus tip cartridge */}
              <div className={`absolute top-[20px] left-[5px] md:top-[32px] md:left-[9px] w-1.5 h-2 md:h-2.5 rounded-[1px] rotate-[-15deg] shadow-sm ${
                theme === 'cream' ? 'bg-romantic-rose-light/95' : 'bg-sky-400'
              }`} />
            </div>

            {/* Heartbeat glowing beat indicator when active */}
            {isPlaying && (
              <span className={`absolute -top-1 -left-1 w-3.5 h-3.5 rounded-full animate-ping opacity-60 ${
                theme === 'cream' ? 'bg-romantic-rose' : 'bg-sky-500'
              }`} />
            )}

            {/* Tiny play state play/pause indicator button overlay */}
            <button 
              type="button"
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full text-white border border-white/10 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 active:scale-95 z-30 ${
                theme === 'cream' ? 'bg-romantic-rose' : 'bg-sky-500'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                initAudioNodes();
                togglePlay();
              }}
            >
              {isPlaying ? (
                <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-2.5 h-2.5 fill-white ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>

          {/* Floating Tooltip with current playing track info */}
          <div className={`hidden sm:flex flex-col backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md pointer-events-none max-w-[150px] animate-fade-in ${
            theme === 'cream'
              ? 'bg-romantic-cream/90 border border-romantic-gold/25 text-romantic-dark'
              : 'bg-[#f0f8ff]/90 border border-sky-200/50 text-sky-950'
          }`}>
            <span className={`text-[9px] uppercase tracking-widest font-bold truncate ${
              theme === 'cream' ? 'text-romantic-gold' : 'text-sky-600'
            }`}>Sedang Diputar</span>
            <span className="text-xs font-medium truncate">{currentTrack.title}</span>
          </div>
        </motion.div>
      )}

      {/* Slide-Up Music Widget */}
      <AnimatePresence>
        {!hidden && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-[76px] left-4 md:bottom-[108px] md:left-6 z-45 w-72 rounded-3xl p-6 flex flex-col items-center ${
              theme === 'cream' 
                ? 'dark-glass-panel' 
                : 'bg-slate-950/85 backdrop-blur-md border border-sky-300/20 shadow-[0_16px_40px_rgba(4,14,26,0.6)]'
            }`}
          >
            {/* Close Toggle */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/12 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Album Cover Art */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg group">
              <img
                src={currentTrack.cover || undefined}
                alt={currentTrack.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-romantic-dark/60 via-transparent to-transparent" />

              {/* Frequencies equalizers over Cover Art */}
              <canvas
                ref={canvasRef}
                width={200}
                height={28}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10/12 pointer-events-none mix-blend-screen"
              />
            </div>

            {/* Info Labels */}
            <div className="w-full text-center px-2 mb-4">
              <h4 className="font-serif text-base text-white/90 font-medium truncate mb-1">
                {currentTrack.title}
              </h4>
              <p className={`text-xs tracking-widest uppercase font-light ${
                theme === 'cream' ? 'text-romantic-rose-light/70' : 'text-sky-300/70'
              }`}>
                {currentTrack.artist}
              </p>
            </div>

            {/* Song Timeline Track Slider */}
            <div className="w-full mb-4">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className={`w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer outline-none ${
                  theme === 'cream' ? 'accent-romantic-rose' : 'accent-sky-500'
                }`}
              />
              <div className={`flex justify-between mt-1.5 text-[10px] font-mono ${
                theme === 'cream' ? 'text-romantic-blush/40' : 'text-sky-200/40'
              }`}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-center gap-6 mb-5">
              <button
                onClick={handlePrev}
                className="text-white/60 hover:text-white transition-colors active:scale-90"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className={`w-12 h-12 rounded-full text-white flex items-center justify-center hover:shadow-md active:scale-95 transition-all ${
                  theme === 'cream' 
                    ? 'bg-gradient-to-tr from-romantic-rose to-romantic-gold shadow-romantic-rose/20' 
                    : 'bg-gradient-to-tr from-sky-500 to-sky-400 shadow-sky-500/20'
                }`}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="text-white/60 hover:text-white transition-colors active:scale-90"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="w-full flex items-center gap-3 px-2">
              <Volume2 className="w-4 h-4 text-white/30 shrink-0" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => setVolume(parseFloat(e.target.value) / 100)}
                className={`flex-1 h-0.5 bg-white/10 rounded-lg appearance-none cursor-pointer outline-none ${
                  theme === 'cream' ? 'accent-romantic-rose-light/80' : 'accent-sky-400/80'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
