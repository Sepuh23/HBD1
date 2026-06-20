import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import MemoryCollage from './MemoryCollage';

interface MessageCardProps {
  partnerName: string;
  config: any;
  theme?: 'cream' | 'skyblue';
}

export default function MessageCard({ partnerName, config, theme = 'cream' }: MessageCardProps) {
  const labelText = config?.messageCardLabel || 'dari lubuk hatiku yang terdalam';
  const title1 = config?.messageCardTitle1 || 'Hari ini adalah hari';
  const title2 = config?.messageCardTitle2 || 'ketika dunia menjadi';
  const title3 = config?.messageCardTitle3 || 'jauh lebih indah.';
  
  const paragraph1 = config?.messageParagraph1 || 'Hari ketika kamu lahir adalah peristiwa paling berharga yang pernah terjadi di semesta ini — dan hal terbaik yang pernah hadir dalam hidupku. Setiap kenangan bersamamu adalah kado indah yang selalu kusimpan erat di dada.';
  const paragraph2 = config?.messageParagraph2 || 'Kamu membuat hari-hari biasa terasa seperti dongeng ajaib, dan hari-hari ajaib terasa seperti mimpi yang sangat indah. Kebaikanmu, senyummu yang terpancar cantik, dan kehangatan jiwamu selalu menerangi hari-hariku.';
  const paragraph3 = config?.messageParagraph3 || 'Bunga virtual ini adalah lambang kecil dari rasa cinta yang tak terbatas untukmu. Tidak ada buket bunga di dunia yang cukup besar, tidak ada lagu yang cukup manis, tidak ada puisi yang cukup panjang untuk menggambarkan betapa berharganya dirimu — ketahuilah setiap detak jantungku adalah milikmu.';
  
  const signatureText = config?.messageSignature || '— Milikmu, selalu & selamanya 🌹';

  const isSky = theme === 'skyblue';

  return (
    <section id="message-area" className="relative py-24 px-6 overflow-hidden bg-white/30">
      
      {/* Decorative Drifting Petals inside the Section background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40">
        <div className="absolute top-[10%] left-[8%] text-2xl animate-float" style={{ animationDuration: '6s' }}>{isSky ? '⭐' : '🌸'}</div>
        <div className="absolute top-[25%] right-[10%] text-3xl animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}>{isSky ? '✨' : '🌺'}</div>
        <div className="absolute bottom-[20%] left-[12%] text-2xl animate-float" style={{ animationDuration: '5s', animationDelay: '2s' }}>{isSky ? '☁️' : '🌷'}</div>
        <div className="absolute bottom-[10%] right-[15%] text-2xl animate-float" style={{ animationDuration: '8s', animationDelay: '0.5s' }}>{isSky ? '🎈' : '🌹'}</div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center">
        
        {/* Animated Message Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className={`w-full glass-panel px-6 sm:px-12 py-12 sm:py-16 text-center relative overflow-hidden flex flex-col items-center ${
            isSky ? 'border-sky-200/50' : 'border-romantic-blush/60'
          }`}
        >
          {/* Subtly shimmering background sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full animate-pulse" />

          {/* Glowing Header Hearts icon group */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-2xl animate-float" style={{ animationDuration: '3s' }}>{isSky ? '⭐' : '🌸'}</span>
            <span className="text-3xl animate-float" style={{ animationDuration: '3.5s', animationDelay: '0.3s' }}>{isSky ? '🎈' : '🌹'}</span>
            <span className="text-2.5xl animate-float" style={{ animationDuration: '3s', animationDelay: '0.6s' }}>{isSky ? '✨' : '🌸'}</span>
          </div>

          {/* Card Headers */}
          <p className={`text-xs font-light uppercase tracking-widest mb-3 ${isSky ? 'text-sky-600' : 'text-romantic-rose'}`}>
            {labelText}
          </p>
          
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-8 ${isSky ? 'text-sky-950' : 'text-romantic-dark'}`}>
            {title1}<br />
            <span className={`font-script text-4xl sm:text-5xl md:text-6xl italic ${isSky ? 'text-sky-500' : 'text-romantic-rose'}`}>{title2}</span><br />
            {title3}
          </h2>

          {/* Letter Body paragraphs */}
          <div className={`max-w-2xl font-sans font-light text-base sm:text-lg leading-relaxed space-y-6 text-center mb-10 px-2 sm:px-4 ${
            isSky ? 'text-sky-900/80' : 'text-romantic-dark/80'
          }`}>
            {paragraph1 && <p>{paragraph1}</p>}
            {paragraph2 && <p>{paragraph2}</p>}
            {paragraph3 && <p>{paragraph3}</p>}
          </div>

          {/* Heart Beat Separation */}
          <div className="flex items-center justify-center mb-8">
            <div className={`h-px w-16 ${isSky ? 'bg-sky-200-light/30 bg-sky-200' : 'bg-romantic-rose-light/30'}`} />
            <Heart className={`w-5 h-5 mx-4 animate-heartbeat ${isSky ? 'text-sky-500 fill-sky-500' : 'text-romantic-rose fill-romantic-rose'}`} />
            <div className={`h-px w-16 ${isSky ? 'bg-sky-200-light/30 bg-sky-200' : 'bg-romantic-rose-light/30'}`} />
          </div>

          {/* Warm cursive signature */}
          <div className={`text-center font-script text-3xl sm:text-4xl select-none ${isSky ? 'text-sky-600' : 'text-romantic-rose'}`}>
            {signatureText}
          </div>
        </motion.div>

        {/* Dynamic customizable Memory Collage of the celebrated person */}
        <MemoryCollage config={config} theme={theme} />

      </div>
    </section>
  );
}
