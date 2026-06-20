import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkle } from 'lucide-react';

interface HeroProps {
  partnerName: string;
  onOpenMusic: () => void;
  config: any;
  theme?: 'cream' | 'skyblue';
}

export default function Hero({ partnerName, onOpenMusic, config, theme = 'cream' }: HeroProps) {
  const displayName = config?.partnerName || partnerName;
  const titleLine1 = config?.heroTitleLine1 || 'Happy Birthday,';
  const subtitleText = config?.heroSubtitle || 'Today, the entire universe is celebrating the day you were born to bring light, color, and laughter into my world. You are everything to me.';

  const isSky = theme === 'skyblue';

  const handleScrollDown = () => {
    const nextElem = document.getElementById('message-area');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden select-none transition-colors duration-500 ${
      isSky ? 'bg-gradient-to-b from-[#e4eff6] to-[#ecf5fa]' : 'bg-gradient-to-b from-romantic-cream to-romantic-cream'
    }`}>
      
      {/* Background Decorative Blobs */}
      <div className={`absolute top-[20%] left-[10%] w-72 h-72 rounded-full blur-3xl saturate-150 animate-float pointer-events-none ${
        isSky ? 'bg-sky-100/35' : 'bg-romantic-blush/30'
      }`} />
      <div className={`absolute bottom-[10%] right-[10%] w-96 h-96 rounded-full blur-3xl saturate-150 animate-sway pointer-events-none ${
        isSky ? 'bg-sky-200/10' : 'bg-romantic-rose-light/10'
      }`} style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`flex items-center gap-1.5 font-script text-lg sm:text-xl md:text-2xl mb-4 ${
            isSky ? 'text-sky-600' : 'text-romantic-rose'
          }`}
        >
          <Sparkle className={`w-4 h-4 animate-sway ${isSky ? 'text-sky-500' : 'text-romantic-gold'}`} />
          <span>serenade ulang tahun yang bermekaran</span>
          <Sparkle className={`w-4 h-4 animate-sway ${isSky ? 'text-sky-500' : 'text-romantic-gold'}`} style={{ animationDelay: '0.8s' }} />
        </motion.div>

        {/* Cinematic Primary Title */}
        <h1 className={`font-serif font-light tracking-tight leading-none mb-6 ${isSky ? 'text-sky-950' : 'text-romantic-dark'}`}>
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
            className="block text-4xl sm:text-6xl md:text-7xl font-sans tracking-tight font-extralight uppercase opacity-90"
          >
            {titleLine1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 1.1, ease: 'easeOut' }}
            className={`block font-love text-6xl sm:text-8xl md:text-9xl font-normal mt-3 lowercase leading-tight filter drop-shadow-sm ${
              isSky ? 'text-sky-500' : 'text-romantic-rose'
            }`}
          >
            {displayName}
          </motion.span>
        </h1>

        {/* Romantic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className={`max-w-xl text-base sm:text-lg font-light leading-relaxed tracking-wide mb-12 px-4 ${
            isSky ? 'text-[#1c2e3d]/85' : 'text-romantic-dark/75'
          }`}
        >
          {subtitleText}
        </motion.p>

        {/* Interactive SVG Mandala Bloom (Gift Logo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.3, duration: 1.2, type: 'spring' }}
          onClick={onOpenMusic}
          className="relative w-40 h-40 mb-16 flex items-center justify-center cursor-pointer group"
        >
          {/* Animated decorative ring */}
          <div className={`absolute inset-0 rounded-full border border-dashed animate-spin transition-colors ${
            isSky 
              ? 'border-sky-300/40 group-hover:border-sky-500' 
              : 'border-romantic-rose-light/40 group-hover:border-romantic-gold'
          }`} style={{ animationDuration: '40s' }} />
          
          <svg className={`w-28 h-28 animate-spin group-hover:scale-110 transition-transform ${
            isSky ? 'filter drop-shadow-[0_4px_16px_rgba(14,116,144,0.2)]' : 'filter drop-shadow-[0_4px_16px_rgba(169,124,80,0.3)]'
          }`} style={{ animationDuration: '24s' }} viewBox="0 0 100 100">
            <g className="origin-center">
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="35"
                  rx="10"
                  ry="24"
                  fill={isSky ? 'rgba(56, 189, 248, 0.95)' : 'rgba(207, 163, 113, 0.95)'}
                  className="origin-[50px_50px]"
                  style={{ transform: `rotate(${i * 45}deg)` }}
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="35"
                  rx="7"
                  ry="18"
                  fill={isSky ? 'rgba(14, 116, 144, 0.95)' : 'rgba(169, 124, 80, 0.95)'}
                  className="origin-[50px_50px]"
                  style={{ transform: `rotate(${i * 45 + 22.5}deg)` }}
                />
              ))}
              <circle cx="50" cy="50" r="14" fill={isSky ? '#f0f9ff' : '#faf6f0'} className={`shadow-sm stroke-1 ${isSky ? 'stroke-sky-200/50' : 'stroke-romantic-rose/20'}`} />
            </g>
          </svg>
        </motion.div>

        {/* Scroll down trigger */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          onClick={handleScrollDown}
          className={`group inline-flex flex-col items-center gap-2 cursor-pointer text-xs font-light tracking-widest transition-colors duration-300 uppercase outline-none ${
            isSky ? 'text-sky-950/60 hover:text-sky-600' : 'text-romantic-dark/50 hover:text-romantic-rose'
          }`}
        >
          <span>Discover your surprise</span>
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shadow-sm ${
            isSky 
              ? 'border-sky-300/30 bg-[#f0f8ff]/20 hover:border-sky-500 hover:bg-white/50' 
              : 'border-romantic-rose-light/30 bg-white/20 hover:border-romantic-rose hover:bg-white/50'
          }`}>
            <ChevronDown className={`w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300 ${
              isSky ? 'text-sky-500' : 'text-romantic-rose'
            }`} />
          </div>
        </motion.button>

      </div>
    </section>
  );
}
