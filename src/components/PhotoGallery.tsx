import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Image as ImageIcon, Heart, Sparkles, Trash2 } from 'lucide-react';
import { GalleryItem } from '../types';

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'you',
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'g-2',
    title: 'are',
    src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'g-3',
    title: 'so',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'g-4',
    title: 'beautiful',
    src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
  }
];

function PolaroidCard({
  item,
  onDelete,
  onUpdateTitle,
  isAdmin
}: {
  item: GalleryItem;
  onDelete: (id: string) => void;
  onUpdateTitle: (id: string, text: string) => void;
  isAdmin?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [titleText, setTitleText] = useState(item.title);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `perspective(800px) rotateY(${cx * 10}deg) rotateX(${-cy * 10}deg) scale(1.025)`;
    card.style.boxShadow = '0 20px 45px rgba(169, 124, 80, 0.12), 0 0 35px rgba(217, 156, 74, 0.2)';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    card.style.boxShadow = '';
  };

  const saveTitle = () => {
    setIsEditing(false);
    onUpdateTitle(item.id, titleText.trim() || 'beautiful');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease' }}
      className="bg-white p-3.5 pb-6 rounded-2xl shadow-md border border-romantic-blush/25 relative group overflow-hidden flex flex-col cursor-default"
    >
      {/* 3D Sheen highlight link */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/8 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Image Container */}
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-romantic-cream relative">
        <img
          src={item.src || undefined}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
        />
        {/* Rose Tint overlay on hover */}
        <div className="absolute inset-0 bg-romantic-rose/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Delete button (only for admin user-uploaded or hovered when admin) */}
        {isAdmin && (
          <button
            onClick={() => onDelete(item.id)}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-romantic-dark/80 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-95 hover:scale-105 active:scale-95 shadow transition-all duration-300 cursor-pointer z-10"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Cursive Polaroid Text Label */}
      <div className="mt-4 text-center">
        {isEditing && isAdmin ? (
          <input
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => e.key === 'Enter' && saveTitle()}
            autoFocus
            maxLength={20}
            className="w-full px-2 py-0.5 border-b border-romantic-rose text-center italic font-script text-romantic-dark text-lg focus:outline-none"
          />
        ) : (
          <p
            onClick={() => isAdmin && setIsEditing(true)}
            className={`font-script text-xl sm:text-2xl text-romantic-dark select-none py-1 truncate max-w-full relative inline-block group/caption ${
              isAdmin ? 'hover:text-romantic-rose hover:cursor-pointer' : ''
            }`}
          >
            {item.title}
            {isAdmin && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-romantic-rose transition-all group-hover/caption:w-full" />
            )}
          </p>
        )}
      </div>
    </div>
  );
}

interface PhotoGalleryProps {
  isAdmin?: boolean;
}

export default function PhotoGallery({ isAdmin = false }: PhotoGalleryProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load photos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('romantic-surprise-gallery');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        setItems(DEFAULT_GALLERY);
      }
    } else {
      setItems(DEFAULT_GALLERY);
    }
  }, []);

  const saveToStorage = (updatedList: GalleryItem[]) => {
    setItems(updatedList);
    localStorage.setItem('romantic-surprise-gallery', JSON.stringify(updatedList));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: any) => {
      // Validate file is image
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const newItem: GalleryItem = {
          id: `g-custom-${Date.now()}-${Math.random()}`,
          title: 'precious item',
          src: base64,
          isUserUploaded: true,
        };
        const newList = [...items, newItem];
        saveToStorage(newList);
      };
      reader.readAsDataURL(file as Blob);
    });
  };

  const handleDelete = (id: string) => {
    const newList = items.filter((x) => x.id !== id);
    saveToStorage(newList);
  };

  const handleUpdateTitle = (id: string, text: string) => {
    const newList = items.map((x) => (x.id === id ? { ...x, title: text } : x));
    saveToStorage(newList);
  };

  const resetGallery = () => {
    saveToStorage(DEFAULT_GALLERY);
  };

  return (
    <section className="py-24 px-6 bg-white/20 select-none">
      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        
        {/* Header content */}
        <p className="text-xs font-light uppercase tracking-widest text-romantic-rose mb-3">
          celebrating you
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-romantic-dark leading-tight mb-4">
          Your Beautiful <em className="italic text-romantic-rose">Pictures</em>
        </h2>
        <p className="max-w-md text-sm text-romantic-dark/60 font-light mb-12 mx-auto">
          {isAdmin 
            ? "Manage and upload beautiful photographs or couple selfies together to create birthday memories. Double click captions to customize!"
            : "A beautiful collection of our special moments together. Memories captured with infinite warmth."}
        </p>

        {/* Gallery Control Actions - Only shown to Admin */}
        {isAdmin && (
          <div className="mb-12 flex items-center justify-center gap-4 flex-wrap">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-romantic-rose to-romantic-rose-light text-white text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 cursor-pointer shadow-md shadow-romantic-rose/15 hover:brightness-105 active:scale-98 transition-all duration-300"
            >
              <Upload className="w-4 h-4" /> Upload Her/His Picture
            </button>

            {/* Reset button only if user customized */}
            {items.some((x) => x.isUserUploaded) && (
              <button
                onClick={resetGallery}
                className="px-5 py-3 rounded-full bg-white/70 border border-romantic-blush text-romantic-dark text-xs font-medium tracking-wider uppercase inline-flex items-center gap-2 cursor-pointer hover:bg-white hover:text-romantic-rose transition-all duration-300 active:scale-98"
              >
                Reset to Defaults
              </button>
            )}
          </div>
        )}

        {/* Polaroid Grid deck */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
            >
              <PolaroidCard
                item={item}
                onDelete={handleDelete}
                onUpdateTitle={handleUpdateTitle}
                isAdmin={isAdmin}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Tiny polaroid footnote - Only shown to Admin */}
        {isAdmin && (
          <p className="mt-12 text-[11px] text-romantic-dark/40 font-light italic flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-romantic-gold" /> Tip: Tap photo text to type customized words and expressions!
          </p>
        )}

      </div>
    </section>
  );
}
