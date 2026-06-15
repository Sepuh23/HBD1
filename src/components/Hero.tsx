import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkle } from 'lucide-react';

interface HeroProps {
  partnerName: string;
  onOpenMusic: () => void;
  config: any;
}

export default function Hero({ partnerName, onOpenMusic, config }: HeroProps) {
  const displayName = config?.partnerName || partnerName;
  const titleLine1 = config?.heroTitleLine1 || 'Happy Birthday,';
  const subtitleText = config?.heroSubtitle || 'Today, the entire universe is celebrating the day you were born to bring light, color, and laughter into my world. You are everything to me.';

  const handleScrollDown = () => {
    const nextElem = document.getElementById('message-area');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-romantic-cream to-romantic-cream select-none">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-romantic-blush/30 blur-3xl saturate-150 animate-float pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-96 h-96 rounded-full bg-romantic-rose-light/10 blur-3xl saturate-150 animate-sway pointer-events-none" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center gap-1.5 text-romantic-rose font-script text-lg sm:text-xl md:text-2xl mb-4"
        >
          <Sparkle className="w-4 h-4 text-romantic-gold animate-sway" />
          <span>a birthday serenade in bloom</span>
          <Sparkle className="w-4 h-4 text-romantic-gold animate-sway" style={{ animationDelay: '0.8s' }} />
        </motion.div>

        {/* Cinematic Primary Title */}
        <h1 className="font-serif font-light text-romantic-dark tracking-tight leading-none mb-6">
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
            className="block font-love text-6xl sm:text-8xl md:text-9xl text-romantic-rose font-normal mt-3 lowercase leading-tight filter drop-shadow-sm"
          >
            {displayName}
          </motion.span>
        </h1>

        {/* Romantic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="max-w-xl text-base sm:text-lg font-light text-romantic-dark/75 leading-relaxed tracking-wide mb-12 px-4"
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
          <div className="absolute inset-0 rounded-full border border-dashed border-romantic-rose-light/40 animate-spin group-hover:border-romantic-gold transition-colors" style={{ animationDuration: '40s' }} />
          
          <svg className="w-28 h-28 filter drop-shadow-[0_4px_16px_rgba(169,124,80,0.3)] animate-spin group-hover:scale-110 transition-transform" style={{ animationDuration: '24s' }} viewBox="0 0 100 100">
            <g className="origin-center">
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="35"
                  rx="10"
                  ry="24"
                  fill="rgba(207, 163, 113, 0.95)"
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
                  fill="rgba(169, 124, 80, 0.95)"
                  className="origin-[50px_50px]"
                  style={{ transform: `rotate(${i * 45 + 22.5}deg)` }}
                />
              ))}
              <circle cx="50" cy="50" r="14" fill="#faf6f0" className="shadow-sm stroke-romantic-rose/20 stroke-1" />
            </g>
          </svg>
        </motion.div>

        {/* Scroll down trigger */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          onClick={handleScrollDown}
          className="group inline-flex flex-col items-center gap-2 cursor-pointer text-xs font-light tracking-widest text-romantic-dark/50 hover:text-romantic-rose transition-colors duration-300 uppercase outline-none"
        >
          <span>Discover your surprise</span>
          <div className="w-8 h-8 rounded-full border border-romantic-rose-light/30 flex items-center justify-center bg-white/20 hover:border-romantic-rose hover:bg-white/50 transition-all shadow-sm">
            <ChevronDown className="w-4 h-4 text-romantic-rose group-hover:translate-y-0.5 transition-transform duration-300" />
          </div>
        </motion.button>

      </div>
    </section>
  );
}
