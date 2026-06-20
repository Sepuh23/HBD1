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
  theme?: 'cream' | 'skyblue';
}

export default function Finale({ config, theme = 'cream' }: FinaleProps) {
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

  const isSky = theme === 'skyblue';

  return (
    <section className={`relative py-28 px-6 text-center select-none overflow-hidden min-h-screen flex flex-col justify-between transition-colors duration-700 ${
      isSky ? 'bg-gradient-to-b from-[#e4eff6] via-[#14263c] to-[#0c1622]' : 'bg-gradient-to-b from-romantic-cream via-romantic-dark to-romantic-dark'
    }`}>
      
      {/* Decorative Night Backdrop Grid */}
      <div className={`absolute inset-0 pointer-events-none ${
        isSky 
          ? 'bg-[radial-gradient(circle_at_bottom,rgba(14,165,233,0.22)_0%,transparent_60%)]' 
          : 'bg-[radial-gradient(circle_at_bottom,rgba(232,105,138,0.18)_0%,transparent_60%)]'
      }`} />

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
          <span className="animate-sway inline-block" style={{ animationDelay: '0s' }}>{isSky ? '✨' : '🌸'}</span>
          <span className="animate-sway inline-block" style={{ animationDelay: '0.2s' }}>{isSky ? '🎈' : '🌺'}</span>
          <span className="animate-sway inline-block" style={{ animationDelay: '0.4s' }}>{isSky ? '⭐' : '🌹'}</span>
          <span className="animate-sway inline-block" style={{ animationDelay: '0.6s' }}>{isSky ? '✨' : '🌸'}</span>
          <span className="animate-sway inline-block" style={{ animationDelay: '0.8s' }}>{isSky ? '☁️' : '🌷'}</span>
        </div>

        <p className={`text-xs uppercase tracking-widest font-light mb-4 text-center ${
          isSky ? 'text-sky-305/80 text-sky-450' : 'text-romantic-rose-light/70'
        }`}>
          {config.finaleLabel || 'selamat ulang tahun, sayangku 🎂'}
        </p>

        <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight mb-8">
          {config.finaleTitle1 || 'Kamu Sangat Dicintai'}<br />
          <span className={`font-love text-5xl sm:text-7xl italic lowercase ${
            isSky ? 'text-sky-300' : 'text-romantic-rose-light'
          }`}>{config.finaleTitle2 || 'lebih dari yang kamu tahu'}</span>
        </h2>

        {/* Letter wrap */}
        <p className={`max-w-xl text-sm sm:text-base leading-relaxed font-light mb-12 ${
          isSky ? 'text-sky-100/95' : 'text-romantic-blush/85'
        }`}>
          {config.finaleBody || 'Di hari indah yang sepenuhnya milikmu ini — aku ingin kamu tahu bahwa mencintaimu adalah petualangan terbesar dalam hidupku. Setiap tahun yang kulalui di sisimu adalah hadiah terbaik. Di sini untuk merayakan dirimu, hari ini dan selamanya. Selamat ulang tahun. 🌸'}
        </p>

        {/* Beating Heart Icon */}
        <div className="relative mb-8 flex items-center justify-center">
          <Heart className={`w-20 h-20 animate-heartbeat cursor-pointer filter ${
            isSky 
              ? 'text-sky-500 fill-sky-500/10 drop-shadow-[0_0_15px_rgba(56,189,248,0.55)]' 
              : 'text-romantic-rose fill-romantic-rose/10 drop-shadow-[0_0_15px_rgba(232,105,138,0.5)]'
          }`} />
          <span className="absolute text-2xl font-mono text-white pointer-events-none pb-1 font-semibold select-none">
            {isSky ? '💙' : '💖'}
          </span>
        </div>

        {/* Signature Line */}
        <p className={`font-script text-xl sm:text-2xl mb-8 ${
          isSky ? 'text-sky-300' : 'text-romantic-rose-light'
        }`}>
          {config.finaleSignature || 'Dibuat dengan cinta tanpa akhir, khusus untukmu'}
        </p>

        {/* Spark Magic celebration prompt button */}
        <button
          onClick={handleSparkMagic}
          className={`px-6 py-3.5 rounded-full border bg-white/10 text-white font-medium hover:bg-white/20 active:scale-95 text-xs uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2 mb-16 shadow-lg select-none outline-none ${
            isSky 
              ? 'border-sky-300/40 shadow-sky-400/10 hover:shadow-sky-400/25 text-white bg-white/10' 
              : 'border-romantic-rose-light/50 bg-white/10 shadow-romantic-rose/10 hover:shadow-romantic-rose/20'
          }`}
        >
          <Sparkles className={`w-4 h-4 animate-spin ${isSky ? 'text-sky-300 animate-spin' : 'text-romantic-gold animate-spin'}`} style={{ animationDuration: '6s' }} /> Nyalakan keajaiban ulang tahun ✨
        </button>

      </div>

      {/* Decorative footer */}
      <footer className={`w-full text-center border-t border-white/5 pt-8 pb-4 text-xs font-light font-serif select-none italic tracking-widest ${
        isSky ? 'text-sky-200/40' : 'text-romantic-blush/40'
      }`}>
        🎂 dibuat dengan cinta & kelopak bunga ulang tahun 🌸
      </footer>

    </section>
  );
}
