import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Gift } from 'lucide-react';

interface IntroSceneProps {
  onComplete: (partnerName: string) => void;
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

export default function IntroScene({ onComplete }: IntroSceneProps) {
  const [partnerName, setPartnerName] = useState('Cintaku');
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
    BURST_FLOWERS.forEach((sym, i) => {
      const angle = (i / BURST_FLOWERS.length) * Math.PI * 2 + Math.random() * 0.5;
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
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-romantic-dark via-romantic-burgundy to-romantic-mid">
      
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
              color: star.color,
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
            <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-romantic-rose/15 text-romantic-gold animate-sway">
              <Heart className="w-8 h-8 fill-romantic-gold" />
            </div>

            <h1 className="mb-2 font-serif text-3xl font-light tracking-wide text-romantic-gold">
              Birthday Surprise ❤️
            </h1>
            <p className="mb-8 text-sm font-light text-romantic-blush/80">
              Welcome to your digital garden. Please enter your partner's name so we can personalize their birthday gift!
            </p>

            <div className="w-full mb-6">
              <label className="block text-left text-xs uppercase tracking-widest text-romantic-gold/60 mb-2 font-light">
                Her/His Name or Nickname
              </label>
              <input
                type="text"
                placeholder="e.g. Cintaku, My Lov, Sweetheart"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                maxLength={24}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 text-center focus:outline-none focus:border-romantic-rose-light focus:ring-1 focus:ring-romantic-rose transition-all text-lg font-light"
              />
            </div>

            <button
              onClick={() => setShowInput(false)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-romantic-rose to-romantic-rose-light text-white font-medium hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-romantic-rose/25 tracking-wider uppercase text-xs"
            >
              Prepare Birthday Gift ✨
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
              className="text-xs font-light uppercase tracking-widest text-romantic-gold/70 mb-2"
            >
              A beautiful bloom created for you
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-serif text-4xl font-normal text-white mb-12 tracking-wide"
            >
              Happy Birthday, <span className="italic text-romantic-rose-light">{partnerName}</span> 🎂
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
                  className="absolute top-[35px] left-[-6px] w-[188px] h-[50px] rounded-t-lg z-20 flex items-center justify-center shadow-md bg-gradient-to-r from-romantic-rose via-romantic-rose-light to-romantic-mid"
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Cozy Cream Ribbons on Lid */}
                  <div className="absolute top-1/2 left-0 w-full h-3 bg-gradient-to-r from-romantic-cream via-white to-romantic-cream -translate-y-1/2 shadow-inner" />
                  <div className="absolute top-0 left-1/2 w-3 h-full bg-gradient-to-b from-romantic-cream via-white to-romantic-cream -translate-x-1/2 shadow-inner" />
                  
                  {/* Ribbon Bow */}
                  <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 w-16 h-8 z-30">
                    <div className="absolute left-[-16px] w-[30px] h-[20px] rounded-full bg-gradient-to-tr from-white to-romantic-cream rotate-[-15deg] shadow-md border-b border-romantic-blush" />
                    <div className="absolute right-[-16px] w-[30px] h-[20px] rounded-full bg-gradient-to-tl from-white to-romantic-cream rotate-[15deg] shadow-md border-b border-romantic-blush" />
                    <div className="absolute top-[2px] left-[15px] w-[14px] h-[14px] rounded-full bg-white shadow-inner" />
                  </div>
                </motion.div>

                {/* Box Body */}
                <div
                  className="w-[172px] h-[120px] rounded-b-xl relative overflow-hidden bg-gradient-to-b from-romantic-burgundy to-romantic-dark shadow-inner"
                  style={{
                    boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -3px 0 rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Body Golden Ribbons */}
                  <div className="absolute top-1/2 left-0 w-full h-3 bg-gradient-to-r from-romantic-cream via-white to-romantic-cream -translate-y-1/2 shadow-inner" />
                  <div className="absolute top-0 left-1/2 w-3 h-full bg-gradient-to-b from-romantic-cream via-white to-romantic-cream -translate-x-1/2 shadow-inner" />
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
                  className="text-romantic-gold/90 text-sm tracking-widest font-light flex items-center gap-2 select-none"
                >
                  <Gift className="w-4 h-4 text-romantic-gold/90 animate-sway" /> Tap to open your gift ✨
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
                  className="fixed inset-0 bg-romantic-cream z-99999 pointer-events-none flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <Heart className="w-16 h-16 text-romantic-rose fill-romantic-rose/10 animate-heartbeat mb-4" />
                    <span className="font-serif italic text-2xl text-romantic-dark font-light">
                      Let the romance bloom...
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
