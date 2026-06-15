import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export default function MemoryCollage({ config }: { config: any }) {
  // Load customizable properties
  const img1 = config?.collageImage1 || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600';
  const cap1 = config?.collageCaption1 || 'Your warm gaze ✨';
  const img2 = config?.collageImage2 || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600';
  const cap2 = config?.collageCaption2 || 'Most precious smile 🥰';
  const img3 = config?.collageImage3 || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600';
  const cap3 = config?.collageCaption3 || 'Perfect laughter 💖';

  const cards = [
    {
      id: 'collage-1',
      src: img1,
      caption: cap1,
      rotate: -4,
      translateY: 10,
      scale: 0.95,
      zIndex: 'z-10',
      tapeRotation: -12,
    },
    {
      id: 'collage-2',
      src: img2,
      caption: cap2,
      rotate: 2,
      translateY: -15,
      scale: 1.05,
      zIndex: 'z-20',
      tapeRotation: 5,
    },
    {
      id: 'collage-3',
      src: img3,
      caption: cap3,
      rotate: -2,
      translateY: 15,
      scale: 0.98,
      zIndex: 'z-10',
      tapeRotation: -6,
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-14 px-4 pb-4">
      {/* Small beautiful header for collage */}
      <div className="flex items-center justify-center gap-1.5 mb-10">
        <Sparkles className="w-4 h-4 text-romantic-gold animate-pulse" />
        <span className="text-xs font-serif tracking-widest text-romantic-dark/40 uppercase">memory frames of you</span>
        <Sparkles className="w-4 h-4 text-romantic-gold animate-pulse" />
      </div>

      {/* Grid container with responsive layouts */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-6 py-8">
        
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9, y: 30, rotate: card.rotate * 1.5 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: card.rotate }}
            viewport={{ once: true, margin: '-55px' }}
            transition={{
              type: 'spring',
              duration: 1.0,
              bounce: 0.2,
              delay: index * 0.15
            }}
            whileHover={{ 
              scale: 1.08, 
              rotate: card.rotate * 0.5, 
              y: -10,
              zIndex: 40,
              transition: { duration: 0.3 }
            }}
            className={`w-[260px] sm:w-[280px] bg-white p-4 pb-6 rounded-xl shadow-[0_8px_30px_rgb(55,34,19,0.06)] border border-romantic-blush/25 relative group flex flex-col items-center select-none ${card.zIndex}`}
          >
            {/* Washi Tape Accent */}
            <div 
              className="absolute -top-3 w-16 h-5 bg-romantic-rose-light/25 backdrop-blur-[2px] border-l border-r border-dashed border-romantic-rose-light/40 shadow-sm"
              style={{ transform: `rotate(${card.tapeRotation}deg)` }}
            />

            {/* Photo Image Frame */}
            <div className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-romantic-cream relative shadow-inner">
              <img
                src={card.src}
                alt={card.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
              />
              {/* Soft elegant warm vintage overlay */}
              <div className="absolute inset-0 bg-romantic-rose/5 pointer-events-none mix-blend-color-burn group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Polaroid handwritten captions */}
            <div className="mt-4 text-center px-1">
              <p className="font-script text-lg sm:text-xl text-romantic-dark select-none leading-none truncate max-w-[240px]">
                {card.caption}
              </p>
            </div>
            
            {/* Subtle shiny polaroid pin indicator */}
            <div className="absolute -top-1 left-4 w-1.5 h-1.5 rounded-full bg-romantic-rose-light shadow-sm opacity-50" />
          </motion.div>
        ))}

      </div>
    </div>
  );
}
