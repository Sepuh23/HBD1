import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Reason } from '../types';

const REASONS: Reason[] = [
  {
    id: 'reason-1',
    title: 'Senyuman Indahmu',
    emoji: '🌹',
    description: 'Senyum yang membuatku jatuh cinta setengah mati, dan selalu mencerahkan hariku setiap hari. Selamat ulang tahun untuk mata indah dan senyuman spektakuler itu.',
    colorClass: 'from-amber-600/10 to-romantic-rose/5 hover:shadow-romantic-rose/20',
  },
  {
    id: 'reason-2',
    title: 'Jiwamu yang Bercahaya',
    emoji: '💫',
    description: 'Langka, terang, dan lebih berharga dari apa pun yang ditawarkan dunia ini. Aku merasa menjadi jiwa paling beruntung di alam semesta karena kamu ada di sisiku.',
    colorClass: 'from-romantic-gold/15 to-romantic-rose-light/5 hover:shadow-romantic-gold/20',
  },
  {
    id: 'reason-3',
    title: 'Kebaikan Tanpa Batasmu',
    emoji: '🌸',
    description: 'Caramu peduli, menyayangi, dan mencintai orang-orang di sekitarmu membuat dunia ini terasa lebih lembut, lebih hangat, dan lebih indah. Kamu menginspirasiku untuk menjadi lebih baik.',
    colorClass: 'from-romantic-rose-light/10 to-romantic-rose/5 hover:shadow-romantic-rose-light/20',
  },
  {
    id: 'reason-4',
    title: 'Tawamu yang Ajaib',
    emoji: '✨',
    description: 'Simfoni paling favorit bagiku di seluruh semesta. Lebih menenangkan dari lagu apa pun, semoga hari ini dipenuhi dengan sejuta alasan lucu untuk tertawa lepas.',
    colorClass: 'from-yellow-600/10 to-romantic-rose/5 hover:shadow-romantic-rose/20',
  },
  {
    id: 'reason-5',
    title: 'Kekuatanmu yang Indah',
    emoji: '🌺',
    description: 'Keanggunan, ketenangan, dan kekuatan caramu menjalani hidup dan mengatasi rintangan. Aku semakin mengagumimu di setiap tahun yang berlalu.',
    colorClass: 'from-amber-700/10 to-romantic-rose-light/5 hover:shadow-romantic-rose-light/20',
  },
  {
    id: 'reason-6',
    title: 'Dirimu yang Seutuhnya',
    emoji: '💖',
    description: 'Setiap sisi darimu, setiap suasana hatimu, setiap impianmu. Kamu lebih dari sekadar cukup. Kamu adalah tempat ternyamanku, awal, dan akhir bahagiaku.',
    colorClass: 'from-romantic-rose/10 to-romantic-rose-light/5 hover:shadow-romantic-rose/20',
  }
];

// Interactive 3D Card tilt component
const ReasonCard: React.FC<{ reason: Reason; theme: 'cream' | 'skyblue' }> = ({ reason, theme }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const isSky = theme === 'skyblue';

  const colorMap: Record<string, string> = {
    'reason-1': isSky ? 'from-cyan-500/10 to-sky-400/5 hover:shadow-sky-500/10 border-sky-200/20' : 'from-amber-600/10 to-romantic-rose/5 hover:shadow-romantic-rose/20 border-romantic-blush/20',
    'reason-2': isSky ? 'from-sky-500/15 to-blue-400/5 hover:shadow-sky-400/10 border-sky-200/20' : 'from-romantic-gold/15 to-romantic-rose-light/5 hover:shadow-romantic-gold/20 border-romantic-blush/20',
    'reason-3': isSky ? 'from-indigo-500/10 to-sky-400/5 hover:shadow-sky-400/10 border-sky-200/20' : 'from-romantic-rose-light/10 to-romantic-rose/5 hover:shadow-romantic-rose-light/20 border-romantic-blush/20',
    'reason-4': isSky ? 'from-cyan-600/10 to-blue-400/5 hover:shadow-sky-400/10 border-sky-200/20' : 'from-yellow-600/10 to-romantic-rose/5 hover:shadow-romantic-rose/20 border-romantic-blush/20',
    'reason-5': isSky ? 'from-sky-600/10 to-indigo-400/5 hover:shadow-indigo-400/10 border-sky-200/20' : 'from-amber-700/10 to-romantic-rose-light/5 hover:shadow-romantic-rose-light/20 border-romantic-blush/20',
    'reason-6': isSky ? 'from-sky-500/10 to-cyan-400/5 hover:shadow-sky-500/10 border-sky-200/20' : 'from-romantic-rose/10 to-romantic-rose-light/5 hover:shadow-romantic-rose/20 border-romantic-blush/20',
  };

  const activeColorClass = colorMap[reason.id] || reason.colorClass;

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
    card.style.boxShadow = isSky
      ? '0 24px 50px rgba(14, 116, 144, 0.1), 0 0 40px rgba(56, 189, 248, 0.15)'
      : '0 24px 50px rgba(169, 124, 80, 0.15), 0 0 40px rgba(217, 156, 74, 0.25)';
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
      className={`glass-panel p-8 rounded-3xl text-center flex flex-col items-center hover:cursor-default bg-gradient-to-br border ${activeColorClass}`}
    >
      <div className="text-5xl mb-4 animate-sway inline-block" style={{ transformOrigin: 'bottom center' }}>
        {reason.emoji}
      </div>
      <h3 className={`font-serif text-2xl font-light mb-3 ${isSky ? 'text-sky-950' : 'text-romantic-dark'}`}>
        {reason.title}
      </h3>
      <p className={`text-sm font-light leading-relaxed max-w-xs ${isSky ? 'text-sky-900/75' : 'text-romantic-dark/70'}`}>
        {reason.description}
      </p>
    </div>
  );
}

interface ReasonsProps {
  theme?: 'cream' | 'skyblue';
}

export default function Reasons({ theme = 'cream' }: ReasonsProps) {
  const isSky = theme === 'skyblue';
  return (
    <section className={`py-24 px-6 border-b border-white/5 transition-colors duration-500 bg-gradient-to-b ${
      isSky ? 'from-[#e4eff6] via-white/40 to-[#e4eff6]' : 'from-romantic-cream via-white to-romantic-cream'
    }`}>
      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        
        {/* Section title block */}
        <p className={`text-xs font-light uppercase tracking-widest mb-3 ${isSky ? 'text-sky-600' : 'text-romantic-rose'}`}>
          sejuta doa untukmu
        </p>
        <h2 className={`font-serif text-3xl sm:text-5xl font-light leading-tight mb-16 ${isSky ? 'text-sky-950' : 'text-romantic-dark'}`}>
          Momen yang Aku Rayakan <em className={`italic ${isSky ? 'text-sky-500' : 'text-romantic-rose'}`}>Dari Dirimu</em>
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
            <ReasonCard key={item.id} reason={item} theme={theme} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
