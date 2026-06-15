import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GardenFlowerItem } from '../types';

const GARDEN_FLOWERS: GardenFlowerItem[] = [
  { id: 'f-1', name: 'Elegant Rose', emoji: '🌹', wish: 'May love and romantic warmth surround you always.', stemHeight: 88 },
  { id: 'f-2', name: 'Cherry Blossom', emoji: '🌸', wish: 'May each day bring you sweet soft beginnings.', stemHeight: 72 },
  { id: 'f-3', name: 'White Lotus', emoji: '💮', wish: 'May you rise above any storm with peace & beauty.', stemHeight: 96 },
  { id: 'f-4', name: 'Hibiscus', emoji: '🌺', wish: 'May your heart always burn with sweet passion.', stemHeight: 80 },
  { id: 'f-5', name: 'Daisy', emoji: '🌼', wish: 'May child-like joy and deep laughter trace your steps.', stemHeight: 64 },
  { id: 'f-6', name: 'Tulip', emoji: '🌷', wish: 'May all your deepest dreams and hopes blossom beautifully.', stemHeight: 76 },
  { id: 'f-7', name: 'Sunflower', emoji: '🌻', wish: 'May this year be filled with radiant sunshine & good health.', stemHeight: 92 },
];

interface Sparkle {
  id: number;
  x: number;
  y: number;
  char: string;
}

export default function VirtualGarden() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const handleMouseEnter = (flower: GardenFlowerItem, e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredId(flower.id);

    // Spawn 6 pretty mini star sparkles at mouse/flower position
    const chars = ['✨', '✦', '✧', '🌸', '💫', '💖'];
    const rect = e.currentTarget.getBoundingClientRect();
    const list: Sparkle[] = [];
    
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 40 + 10;
      list.push({
        id: Date.now() + i,
        // center coordinate calculations relative to current hover
        x: Math.cos(angle) * dist + 40, 
        y: Math.sin(angle) * dist - 15,
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }
    setSparkles(list);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setSparkles([]);
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-romantic-cream/40 border-b border-t border-romantic-blush/35 select-none text-center">
      
      {/* Garden Background Gradient overlay */}
      <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-white/0 via-romantic-blush/12 to-white/0 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center">
        
        {/* Section title block */}
        <p className="text-xs font-light uppercase tracking-widest text-romantic-rose mb-3">
          your personalized birthday garden
        </p>
        
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-romantic-dark leading-tight mb-6">
          A Garden Blooming<br />
          <span className="font-script text-4xl sm:text-5xl text-romantic-rose italic leading-normal">just for you today</span>
        </h2>

        <p className="max-w-md text-sm text-romantic-dark/60 font-light mb-16 italic">
          Hover or tap each blossom below to unlock the birthday wishes and blessings planted inside...
        </p>

        {/* The Garden Stage */}
        <div className="w-full flex justify-center items-end gap-3 sm:gap-7 flex-wrap pt-20 pb-12 relative min-h-[340px]">
          {GARDEN_FLOWERS.map((flower) => {
            const isHovered = hoveredId === flower.id;
            return (
              <div
                key={flower.id}
                onMouseEnter={(e) => handleMouseEnter(flower, e)}
                onMouseLeave={handleMouseLeave}
                className="flex flex-col items-center relative cursor-pointer pt-2 group shrink-0"
              >
                {/* Custom Garden Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, x: '-50%', scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                      exit={{ opacity: 0, y: 15, x: '-50%', scale: 0.9 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute bottom-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-48 p-4 rounded-2xl glass-panel text-center z-30 shadow-lg border border-romantic-rose-light/50"
                    >
                      <h4 className="font-serif text-sm font-medium text-romantic-dark mb-1">
                        {flower.name}
                      </h4>
                      <p className="text-[11px] text-romantic-rose/90 font-light leading-relaxed font-sans">
                        {flower.wish}
                      </p>
                      
                      {/* Tooltip caret */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/80 pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sparkling Flower stars */}
                {isHovered &&
                  sparkles.map((sp) => (
                    <motion.div
                      key={sp.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0.4] }}
                      transition={{ duration: 0.8 }}
                      className="absolute pointer-events-none text-sm z-20 select-none pb-20"
                      style={{ left: `${sp.x}px`, top: `${sp.y}px` }}
                    >
                      {sp.char}
                    </motion.div>
                  ))}

                {/* Blossom Bloom with Hover Scales and Sways */}
                <motion.div
                  animate={{
                    rotate: isHovered ? [0, -5, 5, 0] : [-3, 3, -3],
                    scale: isHovered ? 1.3 : 1,
                  }}
                  transition={
                    isHovered
                      ? { duration: 0.5 }
                      : { repeat: Infinity, duration: 4, ease: 'easeInOut' }
                  }
                  className="text-5xl sm:text-6xl mb-1 filter drop-shadow-[0_4px_8px_rgba(169,124,80,0.15)] group-hover:drop-shadow-[0_8px_16px_rgba(169,124,80,0.4)] transition-all z-10 select-none"
                  style={{ transformOrigin: 'bottom center' }}
                >
                  {flower.emoji}
                </motion.div>

                {/* Stalk / Stem */}
                <div
                  style={{ height: `${flower.stemHeight}px` }}
                  className="w-1 bg-gradient-to-b from-green-400 to-green-600 rounded-b-md transition-all duration-300 group-hover:brightness-110 shadow-sm"
                />

                {/* Ground reflection base shadow */}
                <div className="w-8 h-2 bg-green-900/10 rounded-full blur-xs -mt-1" />
              </div>
            );
          })}
        </div>

        {/* Delicate decorative floor soil line */}
        <div className="w-10/12 max-w-lg h-0.5 bg-gradient-to-r from-transparent via-romantic-rose-light/25 to-transparent mt-4 mb-2" />
        
        <p className="text-xs text-romantic-dark/40 font-light flex items-center gap-1">
          Each flower holds unique blessings cultivated specifically for {hoveredId ? 'you' : 'your birthday'}...
        </p>

      </div>
    </section>
  );
}
