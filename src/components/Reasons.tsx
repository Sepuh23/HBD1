import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Reason } from '../types';

const REASONS: Reason[] = [
  {
    id: 'reason-1',
    title: 'Your Radiant Smile',
    emoji: '🌹',
    description: 'The one that made me fall head over heels, and still lights up my face every single day. Happy Birthday to those beautiful eyes and that spectacular smile.',
    colorClass: 'from-amber-600/10 to-romantic-rose/5 hover:shadow-romantic-rose/20',
  },
  {
    id: 'reason-2',
    title: 'Your Luminous Soul',
    emoji: '💫',
    description: 'Rare, bright, and more precious than anything this entire world has to offer. I feel like the luckiest soul in the universe knowing you are beside me.',
    colorClass: 'from-romantic-gold/15 to-romantic-rose-light/5 hover:shadow-romantic-gold/20',
  },
  {
    id: 'reason-3',
    title: 'Your Infinite Kindness',
    emoji: '🌸',
    description: 'The way you care for, cherish, and love everyone around you makes this world a softer, warmer, and more beautiful place. You inspire me to be better.',
    colorClass: 'from-romantic-rose-light/10 to-romantic-rose/5 hover:shadow-romantic-rose-light/20',
  },
  {
    id: 'reason-4',
    title: 'Your Magical Laughter',
    emoji: '✨',
    description: 'My absolute favorite symphony in the universe. More soothing than any song, may today be filled with a million cute reasons to laugh aloud.',
    colorClass: 'from-yellow-600/10 to-romantic-rose/5 hover:shadow-romantic-rose/20',
  },
  {
    id: 'reason-5',
    title: 'Your Beautiful Strength',
    emoji: '🌺',
    description: 'The grace, composure, and power with which you walk through life and overcome challenges. I admire you more with each passing year.',
    colorClass: 'from-amber-700/10 to-romantic-rose-light/5 hover:shadow-romantic-rose-light/20',
  },
  {
    id: 'reason-6',
    title: 'Your Complete Self',
    emoji: '💖',
    description: 'Every side of you, every mood, every dream. You are more than enough. You are my absolute sanctuary, my beginning, and my happy ending.',
    colorClass: 'from-romantic-rose/10 to-romantic-rose-light/5 hover:shadow-romantic-rose/20',
  }
];

// Interactive 3D Card tilt component
function ReasonCard({ reason }: { reason: Reason; key?: React.Key }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized cursor coordinate from -0.5 to 0.5
    const cx = (e.clientX - rect.left) / width - 0.5;
    const cy = (e.clientY - rect.top) / height - 0.5;

    // Apply smooth 3D tilt values of max 8 degrees
    card.style.transform = `perspective(900px) rotateY(${cx * 12}deg) rotateX(${-cy * 12}deg) translateY(-8px) scale(1.02)`;
    card.style.boxShadow = '0 24px 50px rgba(169, 124, 80, 0.15), 0 0 40px rgba(217, 156, 74, 0.25)';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)';
    card.style.boxShadow = '';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease' }}
      className={`glass-panel p-8 rounded-3xl text-center flex flex-col items-center hover:cursor-default bg-gradient-to-br ${reason.colorClass}`}
    >
      <div className="text-5xl mb-4 animate-sway inline-block" style={{ transformOrigin: 'bottom center' }}>
        {reason.emoji}
      </div>
      <h3 className="font-serif text-2xl font-light text-romantic-dark mb-3">
        {reason.title}
      </h3>
      <p className="text-romantic-dark/70 text-sm font-light leading-relaxed max-w-xs">
        {reason.description}
      </p>
    </div>
  );
}

export default function Reasons() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-romantic-cream via-white to-romantic-cream">
      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        
        {/* Section title block */}
        <p className="text-xs font-light uppercase tracking-widest text-romantic-rose mb-3">
          a thousand wishes for you
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-romantic-dark leading-tight mb-16">
          What I Celebrate <em className="italic text-romantic-rose">About You</em>
        </h2>

        {/* Dynamic Interactive Reasons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
        >
          {REASONS.map((item) => (
            <ReasonCard key={item.id} reason={item} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
