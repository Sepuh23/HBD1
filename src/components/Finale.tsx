import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface Confetti {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
}

const CELEBRATE_EMOJIS = ['🌸', '💖', '✨', '🌺', '🌹', '🍬', '🌷', '🎈', '🎉', '🎁', '🎀', '💘', '💮'];

interface FinaleProps {
  config: any;
}

export default function Finale({ config }: FinaleProps) {
  const [confettis, setConfettis] = useState<Confetti[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Manage flying celebration particles with custom physics loops
  useEffect(() => {
    if (confettis.length === 0) return;

    const timer = setTimeout(() => {
      let isStillActive = false;
      
      setConfettis((prev) => {
        const updated = prev
          .map((c) => {
            const nextY = c.y - c.vy; // float upwards
            const nextX = c.x + c.vx; // sway horizontally
            const nextRot = c.rotation + c.rotationSpeed;
            
            // drag down speed slightly
            const nextVy = c.vy * 0.96;
            const nextVx = c.vx * 0.98;

            return {
              ...c,
              x: nextX,
              y: nextY,
              vy: nextVy,
              vx: nextVx,
              rotation: nextRot,
            };
          })
          // keep particles inside viewport
          .filter((c) => c.y > -50 && c.x > -50 && c.x < window.innerWidth + 50);

        if (updated.length > 0) {
          isStillActive = true;
        }
        return updated;
      });

      // trigger next tick if active
      if (isStillActive) {
        // simple fast timeout loop
      }
    }, 16);

    return () => clearTimeout(timer);
  }, [confettis]);

  const handleSparkMagic = (e: React.MouseEvent<HTMLButtonElement>) => {
    const list: Confetti[] = [];
    const count = 40;
    const rect = e.currentTarget.getBoundingClientRect();
    const spawnX = rect.left + rect.width / 2;
    const spawnY = rect.top + window.scrollY;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 1.6 + Math.PI * 0.2; // vector shooting upwards
      const speed = Math.random() * 8 + 4;
      list.push({
        id: Date.now() + i + Math.random(),
        x: spawnX,
        y: spawnY,
        emoji: CELEBRATE_EMOJIS[Math.floor(Math.random() * CELEBRATE_EMOJIS.length)],
        size: Math.random() * 20 + 16,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 5, // base upward force
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
      });
    }
    setConfettis((prev) => [...prev, ...list]);
  };

  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-romantic-cream via-romantic-dark to-romantic-dark text-center select-none overflow-hidden min-h-screen flex flex-col justify-between">
      
      {/* Decorative Night Backdrop Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(232,105,138,0.18)_0%,transparent_60%)] pointer-events-none" />

      {/* Burst confetti layer */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {confettis.map((c) => (
          <div
            key={c.id}
            className="absolute select-none pointer-events-none"
            style={{
              left: `${c.x}px`,
              top: `${c.y}px`,
              fontSize: `${c.size}px`,
              transform: `translate(-50%, -50%) rotate(${c.rotation}deg)`,
              transition: 'left 0.016s linear, top 0.016s linear',
            }}
          >
            {c.emoji}
          </div>
        ))}
      </div>

      <div /> {/* Spacer */}

      <div className="container mx-auto max-w-3xl relative z-10 flex flex-col items-center">
        
        {/* Cascade flower array */}
        <div className="flex justify-center gap-3 mb-8 text-3xl sm:text-4xl">
          <span className="animate-sway inline-block" style={{ animationDelay: '0s' }}>🌸</span>
          <span className="animate-sway inline-block" style={{ animationDelay: '0.2s' }}>🌺</span>
          <span className="animate-sway inline-block" style={{ animationDelay: '0.4s' }}>🌹</span>
          <span className="animate-sway inline-block" style={{ animationDelay: '0.6s' }}>🌸</span>
          <span className="animate-sway inline-block" style={{ animationDelay: '0.8s' }}>🌷</span>
        </div>

        <p className="text-xs uppercase tracking-widest text-romantic-rose-light/70 font-light mb-4 text-center">
          {config.finaleLabel || 'happy birthday, my love 🎂'}
        </p>

        <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-8">
          {config.finaleTitle1 || 'You Are Loved'}<br />
          <span className="font-love text-5xl sm:text-7xl text-romantic-rose-light italic lowercase">{config.finaleTitle2 || 'more than you know'}</span>
        </h2>

        {/* Letter wrap */}
        <p className="max-w-xl text-sm sm:text-base text-romantic-blush/85 leading-relaxed font-light mb-12">
          {config.finaleBody || 'On this beautiful day that belongs entirely to you — I want you to know that loving you is the greatest adventure of my life. Every year spent beside you is a gift I treasure. Every laugh we share, every quiet heartbeat of yours. Here is to celebrating you, today and every single day after. Happy Birthday. 🌸'}
        </p>

        {/* Beating Heart Icon */}
        <div className="relative mb-8 flex items-center justify-center">
          <Heart className="w-20 h-20 text-romantic-rose fill-romantic-rose/10 animate-heartbeat cursor-pointer filter drop-shadow-[0_0_15px_rgba(232,105,138,0.5)]" />
          <span className="absolute text-2xl font-mono text-white pointer-events-none pb-1 font-semibold select-none">
            💖
          </span>
        </div>

        {/* Signature Line */}
        <p className="font-script text-xl sm:text-2xl text-romantic-rose-light mb-8">
          {config.finaleSignature || 'Made with endless love, just for you'}
        </p>

        {/* Spark Magic celebration prompt button */}
        <button
          onClick={handleSparkMagic}
          className="px-6 py-3.5 rounded-full border border-romantic-rose-light/50 bg-white/10 text-white font-medium hover:bg-white/20 active:scale-95 text-xs uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2 mb-16 shadow-lg shadow-romantic-rose/10 select-none hover:shadow-romantic-rose/20 outline-none"
        >
          <Sparkles className="w-4 h-4 text-romantic-gold animate-spin" style={{ animationDuration: '6s' }} /> Spark birthday magic ✨
        </button>

      </div>

      {/* Decorative footer */}
      <footer className="w-full text-center border-t border-white/5 pt-8 pb-4 text-xs font-light text-romantic-blush/40 font-serif select-none italic tracking-widest">
        🎂 crafted with love & birthday petals 🌸
      </footer>

    </section>
  );
}
