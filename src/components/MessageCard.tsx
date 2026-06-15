import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { loadConfig } from '../utils/configStore';
import MemoryCollage from './MemoryCollage';

interface MessageCardProps {
  partnerName: string;
}

export default function MessageCard({ partnerName }: MessageCardProps) {
  const config = loadConfig();
  
  const labelText = config.messageCardLabel || 'from the bottom of my heart';
  const title1 = config.messageCardTitle1 || 'Today is the day';
  const title2 = config.messageCardTitle2 || 'the world became';
  const title3 = config.messageCardTitle3 || 'more beautiful.';
  
  const paragraph1 = config.messageParagraph1 || 'The day you were born is the most precious event to ever occur in this universe — and the absolute best thing that ever happened to my life. Every single memory I spend beside you is a gift I hold close to my chest and never take for granted.';
  const paragraph2 = config.messageParagraph2 || 'You make normal, routine days feel like magical fairytales, and magical days feel like dreams I never want to wake up from. Your gentle kindness, your beautiful radiant smile, and the warmth in your soul light up my dark evenings and keep me going.';
  const paragraph3 = config.messageParagraph3 || 'These virtual flowers are a tiny token of the immense, boundless love I carry for you. No bouquet in the world is big enough, no song sweet enough, no poem long enough to write how much you mean to me — but please know that every single heartbeat of mine belongs entirely to you.';
  
  const signatureText = config.messageSignature || '— Yours, always & forever 🌹';

  return (
    <section id="message-area" className="relative py-24 px-6 overflow-hidden bg-white/30">
      
      {/* Decorative Drifting Petals inside the Section background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40">
        <div className="absolute top-[10%] left-[8%] text-2xl animate-float" style={{ animationDuration: '6s' }}>🌸</div>
        <div className="absolute top-[25%] right-[10%] text-3xl animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}>🌺</div>
        <div className="absolute bottom-[20%] left-[12%] text-2xl animate-float" style={{ animationDuration: '5s', animationDelay: '2s' }}>🌷</div>
        <div className="absolute bottom-[10%] right-[15%] text-2xl animate-float" style={{ animationDuration: '8s', animationDelay: '0.5s' }}>🌹</div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center">
        
        {/* Animated Message Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="w-full glass-panel px-6 sm:px-12 py-12 sm:py-16 text-center border-romantic-blush/60 relative overflow-hidden flex flex-col items-center"
        >
          {/* Subtly shimmering background sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full animate-pulse" />

          {/* Glowing Header Hearts icon group */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-2xl animate-float" style={{ animationDuration: '3s' }}>🌸</span>
            <span className="text-3xl animate-float" style={{ animationDuration: '3.5s', animationDelay: '0.3s' }}>🌹</span>
            <span className="text-2.5xl animate-float" style={{ animationDuration: '3s', animationDelay: '0.6s' }}>🌸</span>
          </div>

          {/* Card Headers */}
          <p className="text-xs font-light uppercase tracking-widest text-romantic-rose mb-3">
            {labelText}
          </p>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-romantic-dark leading-tight mb-8">
            {title1}<br />
            <span className="font-script text-4xl sm:text-5xl md:text-6xl text-romantic-rose italic">{title2}</span><br />
            {title3}
          </h2>

          {/* Letter Body paragraphs */}
          <div className="max-w-2xl font-sans font-light text-romantic-dark/80 text-base sm:text-lg leading-relaxed space-y-6 text-center mb-10 px-2 sm:px-4">
            {paragraph1 && <p>{paragraph1}</p>}
            {paragraph2 && <p>{paragraph2}</p>}
            {paragraph3 && <p>{paragraph3}</p>}
          </div>

          {/* Heart Beat Separation */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-romantic-rose-light/30 w-16" />
            <Heart className="w-5 h-5 text-romantic-rose fill-romantic-rose mx-4 animate-heartbeat" />
            <div className="h-px bg-romantic-rose-light/30 w-16" />
          </div>

          {/* Warm cursive signature */}
          <div className="text-center font-script text-3xl sm:text-4xl text-romantic-rose select-none">
            {signatureText}
          </div>
        </motion.div>

        {/* Dynamic customizable Memory Collage of the celebrated person */}
        <MemoryCollage />

      </div>
    </section>
  );
}
