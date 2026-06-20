import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Camera, Smile, ChevronLeft, ChevronRight, Pin, Coffee, ArrowLeft, Filter, Search, Award, X } from 'lucide-react';
import { ScrapbookItem } from '../types';

interface ScrapbookProps {
  config: any;
  isAdmin?: boolean;
  isLandingPage?: boolean;
  theme?: 'cream' | 'skyblue';
  setTheme?: (newTheme: 'cream' | 'skyblue') => void;
  onNavigateHome?: () => void;
  onModalToggle?: (isOpen: boolean) => void;
}

export default function Scrapbook({ 
  config, 
  isAdmin = false, 
  isLandingPage = false, 
  theme = 'cream',
  setTheme,
  onNavigateHome,
  onModalToggle
}: ScrapbookProps) {
  const scrapbookTitle = config?.scrapbookTitle || "Our Sweet & Funny Scrapbook 📖";
  const scrapbookSubtitle = config?.scrapbookSubtitle || "Kumpulan foto random, momen konyol, dan kalimat manis yang bikin senyum-senyum sendiri.";
  const items: ScrapbookItem[] = config?.scrapbook || [];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    if (onModalToggle) {
      onModalToggle(activeIndex !== null);
    }
  }, [activeIndex, onModalToggle]);

  const isSky = theme === 'skyblue';

  // Dynamic Theme Class mapping
  const s = {
    // Background and core structure
    bg: isSky ? "bg-[#ecf5fa]" : "bg-[#f7f3e9]",
    bodyText: isSky ? "text-[#1d2f3d]" : "text-romantic-dark",
    gridPattern: isSky 
      ? "bg-[radial-gradient(#bcd6e6_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-60" 
      : "bg-[radial-gradient(#d4caba_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40",
    
    // Core Navigation & Hero Container
    heroBg: isSky ? "bg-white border-2 border-[#b0d2e8] shadow-lg" : "bg-white border-2 border-[#e6dcbf] shadow-xl",
    titleText: isSky ? "text-[#102a43]" : "text-[#3d2f1d]",
    subtitleText: isSky ? "text-[#334e68]" : "text-romantic-dark/70",
    statItemBg: isSky ? "bg-[#f4faff] border-[#c0dcf0]" : "bg-[#fdfbf7] border-[#ede3cf]",
    statItemText: isSky ? "text-[#102a43]" : "text-[#5c4a30]",
    
    // Buttons & Icons
    navBtn: isSky 
      ? "border-sky-300 bg-white text-sky-600 hover:bg-sky-500 hover:text-white transition-colors" 
      : "border-romantic-rose/25 bg-white text-romantic-rose hover:bg-romantic-rose hover:text-white transition-colors",
    backBtnLanding: isSky 
      ? "bg-sky-500 hover:bg-sky-650 text-white shadow-md hover:shadow-sky-100" 
      : "bg-romantic-rose hover:bg-romantic-dark text-white shadow-md",
    accentHeartIcon: isSky ? "text-sky-500 fill-sky-500" : "text-romantic-rose fill-romantic-rose",
    subtleIcon: isSky ? "text-sky-400" : "text-romantic-rose-light",
    accentLabelText: isSky ? "text-sky-600" : "text-romantic-rose",
    badgeLabelBg: isSky 
      ? "bg-sky-50 py-1.5 px-3.5 border border-sky-200/50 text-sky-600 font-serif" 
      : "bg-romantic-blush/20 py-1.5 px-3 border border-romantic-rose/25 text-romantic-rose font-script",
    
    // Desk Filters Toolbar
    toolbarBg: isSky ? "bg-white border-2 border-[#badcf0] shadow-md" : "bg-white border-2 border-[#eadeca] shadow-md",
    tabInactive: isSky ? "bg-[#f2f8fc] text-[#243b53] hover:bg-[#d5eaf7]" : "bg-[#faf7f0] text-romantic-dark hover:bg-[#ede5d0]",
    tabActiveAll: isSky ? "bg-sky-600 text-white shadow-md" : "bg-romantic-dark text-white shadow-sm",
    tabActiveAbsurd: "bg-amber-600 text-white shadow-md",
    tabActiveManis: isSky ? "bg-indigo-500 text-white shadow-md" : "bg-rose-500 text-white shadow-md",
    tabActiveRandom: isSky ? "bg-cyan-600 text-white shadow-md" : "bg-amber-800 text-white shadow-md",
    
    // Search Bar
    searchInputBg: isSky ? "bg-[#f3f9fd]" : "bg-[#fdfaf2]",
    searchInputBorder: isSky ? "border-[#b8daf0] focus:border-sky-500" : "border-[#dcd2be] focus:border-romantic-rose",
    
    // Polaroid Cards Design
    cardBg: isSky ? "bg-white border border-[#badcf0]" : "bg-white border border-[#ebdcb9]",
    cardInnerSlotBorder: isSky ? "border-[#bad4e0]" : "border-[#eae0ca]",
    cardInnerSlotBg: isSky ? "bg-[#eaf4fa]" : "bg-[#faf8f2]",
    cardTitleText: isSky ? "text-[#1d2f3d]" : "text-romantic-dark",
    
    // Detailed Modal Inside Lightbox
    modalBg: isSky ? "bg-[#fcfdfe] border-2 border-[#badcf0] shadow-2xl" : "bg-[#fefcf8] border-2 border-[#eadeca] shadow-2xl",
    modalLeftBg: isSky ? "bg-[#ecf5fa] border-dashed border-[#badcf0]" : "bg-[#faf6ec] border-dashed border-[#eadcb9]",
    modalLeftCardBorder: isSky ? "border-[#badcf0]" : "border-[#ebdcb9]",
    modalRightBg: isSky ? "bg-white" : "bg-[#fdfdf9]",
    modalNavigationBtn: isSky 
      ? "bg-white border border-sky-100 hover:border-sky-500 hover:bg-sky-50 text-sky-900" 
      : "bg-white border border-gray-200 hover:border-romantic-rose hover:bg-romantic-blush/10 text-romantic-dark",
    modalCloseBtn: isSky 
      ? "border border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white transition-colors font-medium" 
      : "border border-romantic-rose text-romantic-rose hover:bg-romantic-rose hover:text-white transition-colors font-semibold",
    
    // Footer Decors
    footerDivider: isSky ? "border-[#cbdfe8]" : "border-[#ebdcb9]",
    footerLabelBg: isSky ? "bg-[#ecf5fa] text-[#2c3e50]" : "bg-[#f7f3e9] text-[#a39478]",
    footerQuoteText: isSky ? "text-[#34495e]" : "text-[#7e6e52]",
    footerButton: isSky 
      ? "bg-sky-600 hover:bg-sky-700 text-white hover:shadow-sky-100" 
      : "bg-romantic-rose hover:bg-romantic-dark text-white",
    footerQuoteLeftIcon: isSky ? "text-sky-400" : "text-[#7e6e52]",
    stickerTextBg: isSky ? "bg-sky-900/80 text-white" : "bg-romantic-dark/80 text-white",
    textMuted50: isSky ? "text-[#1d2f3d]/50" : "text-romantic-dark/50",
    accentText: isSky ? "text-sky-600 font-bold" : "text-romantic-rose font-script"
  };

  // Sticker components
  const renderSticker = (type?: string) => {
    switch (type) {
      case 'heart':
        return (
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-100 border-2 border-red-200 rounded-full flex items-center justify-center rotate-12 shadow-sm animate-pulse z-10">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          </div>
        );
      case 'coffee':
        return (
          <div className={`absolute -bottom-3 -left-3 px-2 py-1 border rounded-lg text-xs font-serif rotate-12 flex items-center gap-1 shadow-sm z-10 ${
            isSky ? 'bg-sky-100 border-sky-200 text-sky-800' : 'bg-amber-100 border-amber-200 text-amber-800'
          }`}>
            <Coffee className={`w-3.5 h-3.5 ${isSky ? 'text-sky-700' : 'text-amber-700'}`} />
            <span>Kencan Kafe</span>
          </div>
        );
      case 'sparkle':
        return (
          <div className={`absolute top-2 right-2 w-10 h-10 border rounded-full flex items-center justify-center -rotate-12 shadow-sm z-10 ${
            isSky ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'
          }`}>
            <Sparkles className={`w-5 h-5 animate-pulse ${isSky ? 'text-sky-500' : 'text-yellow-600'}`} />
          </div>
        );
      case 'cookie':
        return (
          <div className={`absolute -bottom-3 -right-3 px-2 py-1 border rounded-md text-[10px] font-sans -rotate-12 uppercase tracking-wide font-bold shadow-sm z-10 ${
            isSky ? 'bg-sky-100 border-sky-200 text-sky-800' : 'bg-orange-100 border-orange-200 text-orange-850'
          }`}>
            🍪 Ngemil
          </div>
        );
      case 'tape':
      default:
        return (
          <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 border-l border-r border-dashed backdrop-blur-[1px] rotate-2 shadow-sm z-10 ${
            isSky 
              ? 'bg-sky-200/40 border-sky-300/50' 
              : 'bg-romantic-rose-light/30 border-romantic-rose-light/40'
          }`} />
        );
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.caption.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (item.funnyNote || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      
      const text = (item.caption + ' ' + (item.funnyNote || '')).toLowerCase();
      if (selectedCategory === 'absurd') {
        return text.includes('cemberut') || text.includes('seblak') || 
               text.includes('panik') || text.includes('fals') || 
               text.includes('kuli') || text.includes('tidur') || 
               text.includes('serem') || text.includes('gagal') ||
               text.includes('belanja') || text.includes('bangun');
      }
      if (selectedCategory === 'manis') {
        return text.includes('cantik') || text.includes('manja') || 
               text.includes('senyum') || text.includes('indah') || 
               text.includes('halalin') || text.includes('sayang') ||
               text.includes('cinta');
      }
      if (selectedCategory === 'random') {
        return !text.includes('cemberut') && !text.includes('cantik') && !text.includes('seblak');
      }
      return true;
    });
  }, [items, selectedCategory, searchQuery]);

  if (!items || items.length === 0) {
    return null;
  }

  // Common Theme Controller component to let them pick themes
  const renderThemeController = (styleClass?: string) => {
    return (
      <div className={`flex items-center gap-1.5 p-1 rounded-2xl border border-dashed bg-white/40 shadow-sm ${styleClass || ''} ${
        isSky ? 'border-[#badcf0]' : 'border-[#ebdcb9]'
      }`}>
        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500/80 px-1.5 hidden sm:inline">Tema:</span>
        <button
          onClick={() => setTheme && setTheme('cream')}
          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-300 flex items-center gap-1 cursor-pointer hover:scale-105 ${
            !isSky 
              ? 'bg-romantic-rose text-white shadow-sm'
              : 'text-slate-600 hover:text-romantic-rose hover:bg-white/60'
          }`}
        >
          <span>🍦</span> Cream
        </button>
        <button
          onClick={() => setTheme && setTheme('skyblue')}
          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-300 flex items-center gap-1 cursor-pointer hover:scale-105 ${
            isSky 
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-slate-600 hover:text-sky-600 hover:bg-white/60'
          }`}
        >
          <span>⛅</span> Sky Blue
        </button>
      </div>
    );
  };

  // --- RENDERING STANDALONE DEDICATED LANDING PAGE MODE ---
  if (isLandingPage) {
    return (
      <div className={`min-h-screen relative pb-24 overflow-hidden pt-12 transition-colors duration-500 ${s.bg}`}>
        {/* Spiral Binder Ring Lines on background sides to mimic vintage physical scrapbook */}
        <div className="absolute left-6 top-10 bottom-10 w-2 flex flex-col justify-between items-center opacity-30 pointer-events-none hidden md:flex">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-5 h-4 bg-gray-400/50 rounded-full border border-gray-500/20" />
          ))}
        </div>
        <div className="absolute right-6 top-10 bottom-10 w-2 flex flex-col justify-between items-center opacity-30 pointer-events-none hidden md:flex">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-5 h-4 bg-gray-400/50 rounded-full border border-gray-500/20" />
          ))}
        </div>

        {/* Vintage grid overlay paper effect */}
        <div className={`absolute inset-0 pointer-events-none z-0 ${s.gridPattern}`} />

        <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Landing Header Navigation */}
          <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 pb-6 border-b relative ${s.footerDivider}`}>
            <button
              onClick={onNavigateHome}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer ${s.navBtn}`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ke Kejutan Utama 💖</span>
            </button>
            
            {/* Elegant Theme Picker directly in the header */}
            {renderThemeController()}

            <div className="text-center sm:text-right">
              <span className={`font-mono text-[10px] uppercase tracking-widest block mb-1 ${s.textMuted50}`}>Interactive Love Album</span>
              <span className={`font-love text-2xl tracking-wider block ${s.accentText}`}>Est. Forever & Always</span>
            </div>
          </div>

          {/* Epic Hero Jumbotron banner for the Scrapbook */}
          <div className="relative text-center mb-16 max-w-4xl mx-auto pt-6">
            <motion.div 
              initial={{ rotate: -1.5, scale: 0.98 }}
              animate={{ rotate: 0.5, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className={`p-8 rounded-[2rem] relative ${s.heroBg}`}
            >
              {/* Binder clips at the top corners */}
              <div className="absolute -top-4 left-10 w-12 h-8 bg-zinc-300 rounded-lg shadow-inner flex justify-center items-end border border-zinc-400">
                <div className="w-4 h-4 rounded-full bg-zinc-400 mb-1" />
              </div>
              <div className="absolute -top-4 right-10 w-12 h-8 bg-zinc-300 rounded-lg shadow-inner flex justify-center items-end border border-zinc-400">
                <div className="w-4 h-4 rounded-full bg-zinc-400 mb-1" />
              </div>

              {/* Floating Sticker Doodles */}
              <div className={`absolute -top-12 -left-8 w-24 h-24 rotate-[-15deg] hidden lg:block select-none pointer-events-none rounded-2xl border border-dashed p-2 shadow-sm text-center ${
                isSky ? 'bg-blue-50/85 border-blue-300/60' : 'bg-amber-50 rounded-2xl border-amber-300/60'
              }`}>
                <span className="text-3xl block">📖</span>
                <span className={`font-script text-[11px] leading-snug block mt-1 font-bold ${isSky ? 'text-sky-850' : 'text-[#785b2e]'}`}>11+ Kenangan Terbaik</span>
              </div>
              
              <div className={`absolute -bottom-8 -right-8 w-28 h-28 rotate-[12deg] z-20 hidden lg:block select-none pointer-events-none rounded-full border border-dashed p-4 shadow-sm text-center ${
                isSky ? 'bg-sky-50 border-sky-300/60' : 'bg-orange-50 border-orange-300/60'
              }`}>
                <span className="text-3xl block animate-bounce">🤪</span>
                <span className={`font-script text-[10px] leading-none block font-bold leading-tight ${isSky ? 'text-sky-900' : 'text-orange-850'}`}>Mood Booster Maksimal!</span>
              </div>

              <div className={`inline-flex items-center gap-2 rounded-full font-script text-base mb-4 animate-pulse ${s.badgeLabelBg}`}>
                <Heart className={`w-4 h-4 fill-current ${s.accentHeartIcon}`} />
                <span>Buku Harian & Komik Virtual Kita</span>
              </div>

              <h1 className={`text-4xl sm:text-6xl font-love leading-none mb-4 drop-shadow-sm transition-colors duration-500 ${s.titleText}`}>
                {scrapbookTitle}
              </h1>
              
              <p className={`text-base font-serif italic max-w-2xl mx-auto leading-relaxed mb-6 transition-colors duration-500 ${s.subtitleText}`}>
                "{scrapbookSubtitle}"
              </p>

              {/* Memory statistics milestone block */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-dashed text-center ${isSky ? 'border-sky-200' : 'border-[#eadeca]'}`}>
                <div className={`p-3 rounded-2xl border ${s.statItemBg}`}>
                  <span className={`text-[10px] block font-sans font-bold uppercase tracking-widest mb-1 ${s.textMuted50}`}>📸 Total Foto</span>
                  <span className={`font-serif text-xl font-bold ${s.statItemText}`}>{items.length} Halaman</span>
                </div>
                <div className={`p-3 rounded-2xl border ${s.statItemBg}`}>
                  <span className={`text-[10px] block font-sans font-bold uppercase tracking-widest mb-1 ${s.textMuted50}`}>⚡ Tingkat Tawa</span>
                  <span className={`font-serif text-xl font-bold ${s.statItemText}`}>Lebih dari 9000%</span>
                </div>
                <div className={`p-3 rounded-2xl border ${s.statItemBg}`}>
                  <span className={`text-[10px] block font-sans font-bold uppercase tracking-widest mb-1 ${s.textMuted50}`}>🧁 Kemanisan</span>
                  <span className="font-serif text-xl font-bold text-pink-500">Tak Terhingga 💖</span>
                </div>
                <div className={`p-3 rounded-2xl border ${s.statItemBg}`}>
                  <span className={`text-[10px] block font-sans font-bold uppercase tracking-widest mb-1 ${s.textMuted50}`}>🧸 Gaya Cerita</span>
                  <span className={`font-serif text-xl font-bold ${s.statItemText}`}>Buku Harian Lucu</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Search, Filter Tabs and Interactive Desk Toolbar */}
          <div className={`p-5 rounded-3xl flex flex-col md:flex-row gap-6 justify-between items-center transition-all ${s.toolbarBg}`}>
            
            {/* Folder Book Filter tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'all'
                    ? s.tabActiveAll
                    : s.tabInactive
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                Semua Kenangan ({items.length})
              </button>

              <button
                onClick={() => setSelectedCategory('absurd')}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'absurd'
                    ? s.tabActiveAbsurd
                    : s.tabInactive
                }`}
              >
                <span>🤪</span>
                Momen Absurd
              </button>

              <button
                onClick={() => setSelectedCategory('manis')}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'manis'
                    ? s.tabActiveManis
                    : s.tabInactive
                }`}
              >
                <span>🥰</span>
                Momen Manis
              </button>

              <button
                onClick={() => setSelectedCategory('random')}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'random'
                    ? s.tabActiveRandom
                    : s.tabInactive
                }`}
              >
                <span>📷</span>
                Foto Random
              </button>
            </div>

            {/* Quick search bar inside landing desk */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Cari kata kunci momen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-xs py-2.5 pl-9 pr-4 rounded-2xl outline-none transition-colors border ${s.searchInputBg} ${s.searchInputBorder} ${s.bodyText}`}
              />
              <Search className={`w-4 h-4 absolute left-3 top-3.5 pointer-events-none ${isSky ? 'text-sky-400' : 'text-romantic-dark/40'}`} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className={`text-xs absolute right-3 top-2.5 font-bold cursor-pointer ${s.accentLabelText}`}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Empty fallback state */}
          {filteredItems.length === 0 && (
            <div className={`text-center py-20 border border-dashed rounded-[2rem] max-w-xl mx-auto bg-white/70 ${isSky ? 'border-sky-200' : 'border-[#e6dcbf]'}`}>
              <Smile className={`w-12 h-12 mx-auto mb-3 animate-wiggle ${isSky ? 'text-sky-400' : 'text-[#9a8d7a]'}`} />
              <p className={`font-serif text-lg font-medium mb-1 ${s.bodyText}`}>Yah, Kenangan ga ditemuin...</p>
              <p className={`text-xs ${s.subtitleText}`}>Coba ganti kategori filter atau reset pencarianmu!</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className={`mt-4 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${s.footerButton}`}
              >
                Reset Pencarian
              </button>
            </div>
          )}

          {/* Premium Scattered Grid Scrapbook Desk */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 pt-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                const rotation = item.rotation ?? ((idx % 2 === 0 ? -1 : 1) * (2 + (idx % 4)));
                return (
                  <motion.div
                    key={item.id}
                    layoutId={`landing-card-${item.id}`}
                    initial={{ opacity: 0, scale: 0.85, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 15 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: rotation * 0.3, 
                      zIndex: 35,
                      transition: { duration: 0.2 } 
                    }}
                    className="relative cursor-pointer group"
                    onClick={() => {
                      const realIdx = items.findIndex(sub => sub.id === item.id);
                      setActiveIndex(realIdx !== -1 ? realIdx : idx);
                    }}
                    style={{ rotate: `${rotation}deg` }}
                  >
                    {/* Retro shadows representation */}
                    <div className="absolute inset-0 bg-romantic-dark/8 rounded-2xl blur-md translate-y-1.5 transition-transform group-hover:translate-y-3 pointer-events-none" />

                    {/* The Polaroid Card */}
                    <div className={`p-4 pb-8 rounded-xl relative flex flex-col items-center h-full select-none ${s.cardBg}`}>
                      {/* Stickers placement */}
                      {renderSticker(item.stickerType)}

                      {/* Polaroid Push Pin representation */}
                      <div className={`absolute -top-2 left-6 drop-shadow-sm z-10 ${s.subtleIcon}`}>
                        <Pin className="w-4 h-4 fill-current transform rotate-45 animate-pulse" />
                      </div>

                      {/* Photo slot inside card */}
                      <div className={`w-full aspect-square rounded-lg overflow-hidden relative shadow-inner border ${s.cardInnerSlotBg} ${s.cardInnerSlotBorder}`}>
                        <img
                          src={item.src}
                          alt={item.caption}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-yellow-900/5 mix-blend-multiply group-hover:bg-transparent pointer-events-none transition-colors duration-500" />
                        
                        {/* Sticker label type indicator */}
                        {item.stickerType && (
                          <div className={`absolute top-2 left-2 px-2 py-0.5 backdrop-blur-sm rounded-full text-[8px] tracking-widest uppercase font-semibold z-10 pointer-events-none ${s.stickerTextBg}`}>
                            📎 {item.stickerType}
                          </div>
                        )}
                      </div>

                      {/* Sweet handwritten polaroid label */}
                      <div className="mt-5 text-center px-1">
                        <span className={`font-script text-xl leading-tight block truncate max-w-[210px] drop-shadow-sm ${s.cardTitleText}`}>
                          {item.caption}
                        </span>
                      </div>

                      {/* Cute open marker */}
                      <div className={`absolute bottom-2 font-serif text-[8px] uppercase tracking-widest opacity-33 group-hover:opacity-100 transition-opacity duration-300 animate-pulse ${s.accentLabelText}`}>
                        Klik untuk Baca Diary 🧸
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Cozy bottom footer inside scrapbook view */}
          <div className={`mt-24 text-center max-w-2xl mx-auto border-t pt-12 relative ${s.footerDivider}`}>
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 flex items-center gap-1.5 font-script text-lg ${s.footerLabelBg}`}>
              <Award className="w-5 h-5 text-romantic-gold fill-romantic-gold" />
              <span>Dibuat dengan cinta tak terhingga</span>
            </div>
            
            <p className={`font-serif italic text-sm leading-relaxed mb-6 ${s.footerQuoteText}`}>
              "Setiap cemberutmu, tawa lepasmu, bahkan tingkah absurdmu adalah kepingan puzzle berharga yang menyempurnakan cerita hidupku. Selamat membaca album kita sayang!" 💌
            </p>

            <button
              onClick={onNavigateHome}
              className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer ${s.footerButton}`}
            >
              <Heart className="w-4 h-4 fill-white" />
              Kembali ke Surat Utama Ulang Tahun
            </button>
          </div>

        </div>

        {/* Global Modal View (Active item inside lightbox) */}
        <AnimatePresence>
          {activeIndex !== null && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-romantic-dark/50 backdrop-blur-sm"
                onClick={() => setActiveIndex(null)}
              />

              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                className={`relative w-full max-w-3xl rounded-3xl overflow-y-auto md:overflow-hidden max-h-[92vh] md:max-h-[85vh] z-10 flex flex-col md:flex-row ${s.modalBg}`}
              >
                {/* Floating Top-Right Close Button */}
                <button
                  onClick={() => setActiveIndex(null)}
                  className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border shadow-sm transition-all hover:scale-110 active:scale-95 cursor-pointer z-30 ${
                    isSky 
                      ? 'bg-white/80 border-sky-200 text-sky-800 hover:bg-sky-100' 
                      : 'bg-white/80 border-romantic-gold/20 text-romantic-dark hover:bg-romantic-cream/50'
                  }`}
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Spiral notebook decoration */}
                <div className="hidden md:flex flex-col justify-around absolute top-0 bottom-0 left-[48%] -translate-x-1/2 w-4 z-20 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`w-6 h-3 bg-gradient-to-r rounded-full border shadow-sm ${
                      isSky ? 'from-sky-200 to-sky-300 border-sky-400/40' : 'from-zinc-300 to-zinc-400 border-zinc-400/50'
                    }`} />
                  ))}
                </div>

                {/* Photo Side */}
                <div className={`w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center items-center relative border-b md:border-b-0 md:border-r ${s.modalLeftBg}`}>
                  <div className={`relative bg-white p-3 pb-5 md:p-4 md:pb-6 rounded-lg shadow-md transform -rotate-1 w-full max-w-[240px] sm:max-w-[280px] ${s.modalLeftCardBorder}`}>
                    {/* Sticker style tape head */}
                    {renderSticker('tape')}
                    
                    <div className="aspect-square bg-gray-50 rounded overflow-hidden shadow-inner border border-gray-100">
                      <img 
                        src={items[activeIndex].src} 
                        alt={items[activeIndex].caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="mt-4 text-center font-script text-base text-[#3d2f1d] font-semibold">
                      {items[activeIndex].caption}
                    </h4>
                  </div>
                </div>

                {/* Love Note Diary Side */}
                <div className={`w-full md:w-1/2 p-5 md:p-8 flex flex-col justify-between relative min-h-0 md:min-h-[300px] ${s.modalRightBg}`}>
                  {/* Grid Lines on notebook page */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(169,124,80,0.06)_1px,transparent_1px)] bg-[size:100%_28px] pointer-events-none opacity-80" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1.5 text-xs text-romantic-gold uppercase tracking-wider font-semibold">
                        <Heart className="w-4 h-4 text-romantic-rose fill-romantic-rose animate-pulse" />
                        <span>Kapsul Kenangan Cantik</span>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold text-white ${isSky ? 'bg-sky-500' : 'bg-romantic-rose'}`}>
                        {activeIndex + 1} dari {items.length}
                      </div>
                    </div>

                    <p className={`font-love text-2xl sm:text-3xl md:text-4xl mb-4 leading-none ${isSky ? 'text-sky-600' : 'text-romantic-gold'}`}>
                      Pojok Diary Cerita 📖
                    </p>

                    {/* Sweet funny handwriting note style */}
                    <p className={`font-serif italic text-base leading-relaxed pl-3 border-l-2 ${s.bodyText} ${isSky ? 'border-sky-300' : 'border-romantic-rose-light'}`}>
                      "{items[activeIndex].funnyNote || 'Saking gemesnya momen ini nulis ini drajat cintaku langsung naik 1000% !!'}"
                    </p>
                  </div>

                  {/* Footer/Navigation inside dialog */}
                  <div className={`relative z-10 flex items-center justify-between mt-8 pt-4 border-t ${s.footerDivider}`}>
                    <button 
                      onClick={() => {
                        setActiveIndex(prev => prev !== null ? (prev - 1 + items.length) % items.length : null);
                      }}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${s.modalNavigationBtn}`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button 
                      onClick={() => setActiveIndex(null)}
                      className={`px-4 py-1.5 text-xs rounded-full cursor-pointer ${s.modalCloseBtn}`}
                    >
                      Tutup Lembaran 📖
                    </button>

                    <button 
                      onClick={() => {
                        setActiveIndex(prev => prev !== null ? (prev + 1) % items.length : null);
                      }}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${s.modalNavigationBtn}`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- EMBEDDED PREVIEW VERSION inside main timeline page ---
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 relative" id="scrapbook-section">
      {/* Decorative top binder ring lines */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-2 bg-gradient-to-r from-transparent to-transparent ${
        isSky ? 'via-sky-200' : 'via-romantic-rose-light/20'
      }`} />
      
      {/* Title Section */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 right-4">
          {renderThemeController()}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full border shadow-sm text-xs uppercase tracking-widest mb-4 ${
            isSky ? 'border-sky-150 text-sky-600' : 'border-romantic-rose/15 text-romantic-amber'
          }`}
        >
          <Camera className={`w-3.5 h-3.5 ${isSky ? 'text-sky-500' : 'text-romantic-gold'}`} />
          <span>Kumpulan memori konyol tapi manis</span>
        </motion.div>
        
        <h2 className={`text-4xl sm:text-5xl font-love mb-4 drop-shadow-sm transition-colors duration-500 ${s.titleText}`}>
          {scrapbookTitle}
        </h2>
        <p className={`text-sm font-sans max-w-xl mx-auto leading-relaxed transition-colors duration-500 ${s.subtitleText}`}>
          {scrapbookSubtitle}
        </p>
      </div>

      {/* Grid Scrapbook Desk. Limit to first 4 in the bottom preview, then offer button to view dedicated landing page! */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-8">
        {items.slice(0, 4).map((item, idx) => {
          const rotation = item.rotation ?? ((idx % 2 === 0 ? -1 : 1) * (3 + (idx % 3)));
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: rotation * 0.4, 
                zIndex: 35,
                transition: { duration: 0.2 } 
              }}
              className="relative cursor-pointer group"
              onClick={() => setActiveIndex(idx)}
              style={{ rotate: `${rotation}deg` }}
            >
              {/* Paper shadow representation */}
              <div className="absolute inset-0 bg-romantic-dark/5 rounded-2xl blur-md translate-y-1 transition-transform group-hover:translate-y-2 pointer-events-none" />

              {/* The Polaroid Card */}
              <div id={`scrapbook-card-${item.id}`} className={`p-4 pb-8 rounded-xl relative flex flex-col items-center h-full select-none ${s.cardBg}`}>
                {/* sticker */}
                {renderSticker(item.stickerType)}

                {/* Polaroid Push Pin representation */}
                <div className={`absolute -top-2 left-6 drop-shadow-sm ${s.subtleIcon}`}>
                  <Pin className="w-4 h-4 fill-current transform rotate-45" />
                </div>

                {/* Foto Slot */}
                <div className={`w-full aspect-square rounded-lg overflow-hidden relative shadow-inner border ${s.cardInnerSlotBg} ${s.cardInnerSlotBorder}`}>
                  <img
                    src={item.src}
                    alt={item.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-yellow-900/5 mix-blend-multiply group-hover:bg-transparent pointer-events-none transition-colors duration-500" />
                </div>

                {/* Simple handwritten label */}
                <div className="mt-5 text-center px-1">
                  <span className={`font-script text-lg leading-tight block truncate max-w-[210px] drop-shadow-sm ${s.cardTitleText}`}>
                    {item.caption}
                  </span>
                </div>

                {/* Tiny sweet helper text pointing to open */}
                <div className={`absolute bottom-2 font-serif text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${s.accentLabelText}`}>
                  Click to open note 🧸
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* BIG BEAUTIFUL PROMINENT CTA TO VIEW THE WHOLE 11+ SCRAPBOOK LANDING PAGE */}
      <div className={`mt-16 text-center max-w-xl mx-auto border-2 border-dashed p-8 rounded-[2rem] shadow-sm relative bg-white/70 ${
        isSky ? 'border-sky-300' : 'border-romantic-rose/30'
      }`}>
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow ${
          isSky ? 'bg-sky-500' : 'bg-romantic-rose'
        }`}>
          ✨ 11+ Foto Ter-Absurd & Manis ✨
        </div>
        
        <p className={`font-serif italic text-sm mb-6 leading-relaxed ${s.subtitleText}`}>
          "Ga cukup cuma 4 foto? Aku udah siapin satu **Halaman Scrapbook Khusus** interaktif buat kita berdua lengkap dengan 10+ foto super random, konyol, manis, filter foto, kuis dan cerita cinta rahasia kita. Mau lihat?" 👀💖
        </p>

        {onNavigateHome && (
          <button
            onClick={onNavigateHome}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer scale-105 hover:scale-110 ${s.footerButton}`}
          >
            <Camera className="w-4 h-4 animate-bounce" />
            Buka Halaman Scrapbook Khusus Kita 📖✨
          </button>
        )}
      </div>

      {/* Pop-up Interactive Card view (AnimatePresence) */}
      <AnimatePresence>
        {activeIndex !== null && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-romantic-dark/40 backdrop-blur-sm"
              onClick={() => setActiveIndex(null)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className={`relative w-full max-w-3xl rounded-3xl overflow-y-auto md:overflow-hidden max-h-[92vh] md:max-h-[85vh] z-10 flex flex-col md:flex-row ${s.modalBg}`}
            >
              {/* Floating Top-Right Close Button */}
              <button
                onClick={() => setActiveIndex(null)}
                className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border shadow-sm transition-all hover:scale-110 active:scale-95 cursor-pointer z-35 ${
                  isSky 
                    ? 'bg-white/80 border-sky-200 text-sky-800 hover:bg-sky-100' 
                    : 'bg-white/80 border-romantic-gold/20 text-romantic-dark hover:bg-romantic-cream/50'
                }`}
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Wooden spiral notebook binder decoration on the side */}
              <div className="hidden md:flex flex-col justify-around absolute top-0 bottom-0 left-[48%] -translate-x-1/2 w-4 z-20 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`w-6 h-3 bg-gradient-to-r rounded-full border shadow-sm ${
                    isSky ? 'from-sky-200 to-sky-300 border-sky-400/40' : 'from-gray-300 to-gray-400 border-gray-400/50'
                  }`} />
                ))}
              </div>

              {/* Photo Side */}
              <div className={`w-full md:w-1/2 p-4 md:p-6 flex flex-col justify-center items-center relative border-b md:border-b-0 md:border-r ${s.modalLeftBg}`}>
                <div className={`relative bg-white p-3 pb-5 md:p-4 md:pb-6 rounded-lg shadow-md transform -rotate-1 w-full max-w-[240px] sm:max-w-[280px] ${s.modalLeftCardBorder}`}>
                  {/* Sticky Sticker */}
                  {renderSticker('tape')}
                  
                  <div className="aspect-square bg-gray-50 rounded overflow-hidden shadow-inner border border-romantic-dark/5">
                    <img 
                      src={items[activeIndex].src} 
                      alt={items[activeIndex].caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="mt-4 text-center font-script text-base text-romantic-dark font-semibold">
                    {items[activeIndex].caption}
                  </h4>
                </div>
              </div>

              {/* Love Note Diary Side */}
              <div className={`w-full md:w-1/2 p-5 md:p-8 flex flex-col justify-between relative min-h-0 md:min-h-[300px] ${s.modalRightBg}`}>
                {/* Grid paper lines background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(169,124,80,0.06)_1px,transparent_1px)] bg-[size:100%_28px] pointer-events-none opacity-80" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1.5 text-xs text-romantic-gold uppercase tracking-wider font-semibold">
                      <Heart className="w-4 h-4 text-romantic-rose fill-romantic-rose animate-pulse" />
                      <span>Untuk cintaku</span>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold text-white ${isSky ? 'bg-sky-500' : 'bg-romantic-rose'}`}>
                      {activeIndex + 1} dari {items.length}
                    </div>
                  </div>

                  <p className={`font-love text-2xl sm:text-3xl md:text-4xl mb-4 leading-none ${isSky ? 'text-sky-600' : 'text-romantic-gold'}`}>
                    Momen Terindah...
                  </p>

                  {/* Sweet funny handwriting note style */}
                  <p className={`font-serif italic text-base leading-relaxed pl-2 border-l-2 ${s.bodyText} ${isSky ? 'border-sky-300 font-medium' : 'border-romantic-rose-light'}`}>
                    "{items[activeIndex].funnyNote || 'Saking gemesnya momen ini nulis ini drajat cintaku langsung naik 1000% !!'}"
                  </p>
                </div>

                {/* Footer/Navigation inside dialog */}
                <div className={`relative z-10 flex items-center justify-between mt-8 pt-4 border-t ${s.footerDivider}`}>
                  <button 
                    onClick={() => {
                      setActiveIndex(prev => prev !== null ? (prev - 1 + items.length) % items.length : null);
                    }}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${s.modalNavigationBtn}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setActiveIndex(null)}
                    className={`px-4 py-1.5 text-xs rounded-full cursor-pointer ${s.modalCloseBtn}`}
                  >
                    Tutup Buku 📖
                  </button>

                  <button 
                    onClick={() => {
                      setActiveIndex(prev => prev !== null ? (prev + 1) % items.length : null);
                    }}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${s.modalNavigationBtn}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
