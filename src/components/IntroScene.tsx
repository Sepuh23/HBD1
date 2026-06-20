import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift } from 'lucide-react';

interface IntroSceneProps {
  onComplete: (partnerName: string) => void;
  theme: 'cream' | 'skyblue';
  setTheme: (newTheme: 'cream' | 'skyblue') => void;
  defaultPartnerName?: string;
}

const BURST_FLOWERS = ['✨', '🤎', '🍂', '✨', '💛', '🤍', '🌼', '⭐', '✨', '🍯', '🍂', '✨'];

interface SparkleStar {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  size: number;
  delay: number;
  duration: number;
}

interface BurstFlower {
  id: number;
  symbol: string;
  tx: number;
  ty: number;
  rot: number;
  scale: number;
}

export default function IntroScene({ onComplete, theme, setTheme, defaultPartnerName }: IntroSceneProps) {
  const [partnerName, setPartnerName] = useState(defaultPartnerName || 'Cintaku');
  const [showInput, setShowInput] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [bursts, setBursts] = useState<BurstFlower[]>([]);
  const [sparkles, setSparkles] = useState<SparkleStar[]>([]);

  // Generate pretty twinkling background stars
  useEffect(() => {
    const symbols = ['✦', '✧', '⋆', '✷', '✹', '❋', '✨'];
    const colors = ['#d99c4a', '#cfa371', '#f3eae0', '#ffffff', '#a97c50'];
    const stars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 14 + 10,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
    }));
    setSparkles(stars);
  }, []);

  const handleOpenGift = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);

    // Play visual burst of flowers
    const list: BurstFlower[] = [];
    const burstSymbols = theme === 'cream'
      ? BURST_FLOWERS
      : ['✨', '💙', '☁️', '✨', '❄️', '🤍', '🎐', '⭐', '✨', '🐳', '🎐', '✨'];

    burstSymbols.forEach((sym, i) => {
      const angle = (i / burstSymbols.length) * Math.PI * 2 + Math.random() * 0.5;
      const distance = Math.random() * 160 + 120; // shoot out distance
      list.push({
        id: i,
        symbol: sym,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        rot: Math.random() * 540 - 270,
        scale: Math.random() * 0.5 + 0.9,
      });
    });
    setBursts(list);

    // Audio unlocking callback and delay transition
    setTimeout(() => {
      setIsOpened(true);
      setTimeout(() => {
        onComplete(partnerName.trim() || 'Cintaku');
      }, 2500); // Wait for the transition output
    }, 1200);
  };

  return (
    <div className={`fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 bg-gradient-to-tr ${
      theme === 'cream' 
        ? 'from-romantic-dark via-romantic-burgundy to-romantic-mid' 
        : 'from-[#0e1726] via-[#1c2e4a] to-[#2e5b88]'
    }`}>
      
      {/* Immersive Star background */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        {sparkles.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              color: theme === 'cream' ? star.color : star.color.replace('#d99c4a', '#8fcbf8').replace('#cfa371', '#aadafa').replace('#a97c50', '#569cd6'),
              fontSize: `${star.size}px`,
            }}
          >
            {star.symbol}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showInput ? (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 w-11/12 max-w-md px-8 py-10 text-center rounded-3xl dark-glass-panel flex flex-col items-center"
          >
            <div className={`mb-4 flex items-center justify-center w-16 h-16 rounded-full animate-sway ${
              theme === 'cream' ? 'bg-romantic-rose/15 text-romantic-gold' : 'bg-sky-500/15 text-sky-450'
            }`}>
              <Heart className={`w-8 h-8 ${theme === 'cream' ? 'fill-romantic-gold text-romantic-gold' : 'fill-sky-400 text-sky-400'}`} />
            </div>

            <h1 className={`mb-2 font-serif text-3xl font-light tracking-wide ${
              theme === 'cream' ? 'text-romantic-gold' : 'text-sky-300'
            }`}>
              Kejutan Ulang Tahun ❤️
            </h1>
            <p className={`mb-6 text-sm font-light ${
              theme === 'cream' ? 'text-romantic-blush/80' : 'text-sky-100/80'
            }`}>
              Selamat datang di taman digitalmu. Silakan masukkan nama pasanganmu agar kami dapat mempersonalisasi hadiah ulang tahunnya!
            </p>

            {/* PARTNER NAME INPUT */}
            <div className="w-full mb-5">
              <label className={`block text-left text-xs uppercase tracking-widest mb-2 font-light ${
                theme === 'cream' ? 'text-romantic-gold/60' : 'text-sky-200/60'
              }`}>
                Nama atau Nama Panggilan Dia
              </label>
              <input
                type="text"
                placeholder="misal: Cintaku, Sayang, Cantik"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                maxLength={24}
                className={`w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 text-center focus:outline-none focus:ring-1 transition-all text-lg font-light ${
                  theme === 'cream'
                    ? 'focus:border-romantic-rose-light focus:ring-romantic-rose'
                    : 'focus:border-sky-300 focus:ring-sky-400'
                }`}
              />
            </div>

            {/* INTEGRATED THEME SELECTOR WIDGET */}
            <div className="w-full mb-8">
              <label className={`block text-left text-xs uppercase tracking-widest mb-2.5 font-light ${
                theme === 'cream' ? 'text-romantic-gold/60' : 'text-sky-200/60'
              }`}>
                Pilih Tema Kejutan / Theme 🎨
              </label>
              <div className="grid grid-cols-2 gap-3 p-1 bg-white/5 border border-white/10 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setTheme('cream')}
                  className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                    theme === 'cream'
                      ? 'bg-gradient-to-r from-romantic-rose to-romantic-rose-light text-white shadow-md scale-102 font-extrabold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>🍦 Cream</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('skyblue')}
                  className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                    theme === 'skyblue'
                      ? 'bg-gradient-to-r from-sky-500 to-sky-450 text-white shadow-md scale-102 font-extrabold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>⛅ Sky Blue</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowInput(false)}
              className={`w-full py-4 rounded-2xl text-white font-medium hover:brightness-110 active:scale-98 transition-all shadow-lg tracking-wider uppercase text-xs ${
                theme === 'cream'
                  ? 'bg-gradient-to-r from-romantic-rose to-romantic-rose-light shadow-romantic-rose/25'
                  : 'bg-gradient-to-r from-sky-500 to-sky-450 shadow-sky-500/25'
              }`}
            >
              Siapkan Kado Ulang Tahun ✨
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="gift-room"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center relative z-10 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-xs font-light uppercase tracking-widest mb-2 ${
                theme === 'cream' ? 'text-romantic-gold/70' : 'text-sky-200/70'
              }`}
            >
              Sebuah taman indah yang mekar untukmu
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-serif text-4xl font-normal text-white mb-12 tracking-wide"
            >
              Happy Birthday, <span className={`italic ${theme === 'cream' ? 'text-romantic-rose-light' : 'text-sky-300'}`}>{partnerName}</span> 🎂
            </motion.h2>

            {/* Simulated 3D Gift Box Wrapper */}
            <div className="relative select-none cursor-pointer w-48 h-48 mb-6 group flex items-center justify-center" onClick={handleOpenGift}>
              
              {/* Gift Container with shake and open anims */}
              <motion.div
                animate={
                  isOpened
                    ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] }
                    : isOpening
                    ? {
                        rotate: [0, -6, 6, -6, 6, -3, 3, 0],
                        scale: [1, 1.05, 1],
                      }
                    : { y: [0, -10, 0] }
                }
                transition={
                  isOpened
                    ? { duration: 0.8, ease: 'easeInOut' }
                    : isOpening
                    ? { duration: 0.8 }
                    : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }
                className="relative w-44 h-44 flex flex-col items-center justify-end"
              >
                {/* 3D Box Lid */}
                <motion.div
                  animate={
                    isOpening
                      ? {
                          y: -140,
                          rotateX: -30,
                          rotateZ: -40,
                          scale: 0.6,
                          opacity: 0,
                        }
                      : {}
                  }
                  transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`absolute top-[35px] left-[-6px] w-[188px] h-[50px] rounded-t-lg z-20 flex items-center justify-center shadow-md ${
                    theme === 'cream'
                      ? 'bg-gradient-to-r from-romantic-rose via-romantic-rose-light to-romantic-mid'
                      : 'bg-gradient-to-r from-sky-400 via-sky-300 to-blue-500'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Cozy Ribbons on Lid */}
                  <div className={`absolute top-1/2 left-0 w-full h-3 -translate-y-1/2 shadow-inner ${
                    theme === 'cream'
                      ? 'bg-gradient-to-r from-romantic-cream via-white to-romantic-cream'
                      : 'bg-gradient-to-r from-blue-100 via-white to-blue-100'
                  }`} />
                  <div className={`absolute top-0 left-1/2 w-3 h-full -translate-x-1/2 shadow-inner ${
                    theme === 'cream'
                      ? 'bg-gradient-to-b from-romantic-cream via-white to-romantic-cream'
                      : 'bg-gradient-to-b from-blue-100 via-white to-blue-100'
                  }`} />
                  
                  {/* Ribbon Bow */}
                  <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 w-16 h-8 z-30">
                    <div className={`absolute left-[-16px] w-[30px] h-[20px] rounded-full rotate-[-15deg] shadow-md border-b ${
                      theme === 'cream'
                        ? 'bg-gradient-to-tr from-white to-romantic-cream border-romantic-blush'
                        : 'bg-gradient-to-tr from-white to-blue-100 border-sky-300'
                    }`} />
                    <div className={`absolute right-[-16px] w-[30px] h-[20px] rounded-full rotate-[15deg] shadow-md border-b ${
                      theme === 'cream'
                        ? 'bg-gradient-to-tl from-white to-romantic-cream border-romantic-blush'
                        : 'bg-gradient-to-tl from-white to-blue-100 border-sky-300'
                    }`} />
                    <div className="absolute top-[2px] left-[15px] w-[14px] h-[14px] rounded-full bg-white shadow-inner" />
                  </div>
                </motion.div>

                {/* Box Body */}
                <div
                  className={`w-[172px] h-[120px] rounded-b-xl relative overflow-hidden shadow-inner ${
                    theme === 'cream'
                      ? 'bg-gradient-to-b from-romantic-burgundy to-romantic-dark'
                      : 'bg-gradient-to-b from-blue-600 to-indigo-950'
                  }`}
                  style={{
                    boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -3px 0 rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Body Ribbons */}
                  <div className={`absolute top-1/2 left-0 w-full h-3 -translate-y-1/2 shadow-inner ${
                    theme === 'cream'
                      ? 'bg-gradient-to-r from-romantic-cream via-white to-romantic-cream'
                      : 'bg-gradient-to-r from-blue-100 via-white to-blue-100'
                  }`} />
                  <div className={`absolute top-0 left-1/2 w-3 h-full -translate-x-1/2 shadow-inner ${
                    theme === 'cream'
                      ? 'bg-gradient-to-b from-romantic-cream via-white to-romantic-cream'
                      : 'bg-gradient-to-b from-blue-100 via-white to-blue-100'
                  }`} />
                </div>

                {/* Ground reflection shadow */}
                <div className="absolute bottom-[-16px] w-[140px] h-[12px] bg-black/40 blur-sm rounded-full pointer-events-none -z-10" />
              </motion.div>

              {/* Burst Flowers on Open */}
              <AnimatePresence>
                {isOpening &&
                  bursts.map((f) => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, f.scale, f.scale * 1.2, 0.4],
                        x: f.tx,
                        y: f.ty,
                        rotate: f.rot,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 2.0,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 0.1,
                      }}
                      className="absolute text-5xl pointer-events-none select-none z-50 filter drop-shadow-md"
                    >
                      {f.symbol}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            {/* Hint label */}
            <AnimatePresence>
              {!isOpening && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className={`text-sm tracking-widest font-light flex items-center gap-2 select-none ${
                    theme === 'cream' ? 'text-romantic-gold/90' : 'text-sky-200/90'
                  }`}
                >
                  <Gift className={`w-4 h-4 animate-sway ${theme === 'cream' ? 'text-romantic-gold/90' : 'text-sky-200/90'}`} /> Ketuk untuk membuka kadomu ✨
                </motion.p>
              )}
            </AnimatePresence>

            {/* Pure white flash background transition */}
            <AnimatePresence>
              {isOpened && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, ease: 'easeIn' }}
                  className={`fixed inset-0 z-99999 pointer-events-none flex items-center justify-center ${
                    theme === 'cream' ? 'bg-romantic-cream' : 'bg-[#e4eff6]'
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <Heart className={`w-16 h-16 animate-heartbeat mb-4 ${
                      theme === 'cream' ? 'text-romantic-rose fill-romantic-rose/10' : 'text-sky-500 fill-sky-500/10'
                    }`} />
                    <span className={`font-serif italic text-2xl font-light ${
                      theme === 'cream' ? 'text-romantic-dark' : 'text-sky-950'
                    }`}>
                      Biarkan romansa mekar bermekaran...
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
