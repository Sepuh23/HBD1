import React, { useState, useEffect } from 'react';
import IntroScene from './components/IntroScene';
import FloralBackground from './components/FloralBackground';
import MusicPlayer from './components/MusicPlayer';
import Hero from './components/Hero';
import MessageCard from './components/MessageCard';
import Reasons from './components/Reasons';
import VirtualGarden from './components/VirtualGarden';
import PhotoGallery from './components/PhotoGallery';
import Scrapbook from './components/Scrapbook';
import Finale from './components/Finale';
import AdminPanel from './components/AdminPanel';
import { loadConfig, saveConfig } from './utils/configStore';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [partnerName, setPartnerName] = useState('Cintaku');
  const [config, setConfig] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<'tribute' | 'scrapbook'>('tribute');
  const [isScrapbookModalOpen, setIsScrapbookModalOpen] = useState(false);
  const [theme, setTheme] = useState<'cream' | 'skyblue'>(() => {
    return (localStorage.getItem('scrapbook-theme') as 'cream' | 'skyblue') || 'cream';
  });

  const handleThemeChange = (newTheme: 'cream' | 'skyblue') => {
    setTheme(newTheme);
    localStorage.setItem('scrapbook-theme', newTheme);
  };

  useEffect(() => {
    async function init() {
      const cfg = await loadConfig();
      setConfig(cfg);
      setPartnerName(cfg.partnerName || 'Cintaku');
      setIsLoaded(true);
    }
    init();
  }, []);

  const [isAdminMode, setIsAdminMode] = useState(() => {
    const hash = window.location.hash;
    return hash === '#admin' || hash === '##admin' || hash.includes('admin');
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setIsAdminMode(hash === '#admin' || hash === '##admin' || hash.includes('admin'));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [isMusicOpen, setIsMusicOpen] = useState(false);

  useEffect(() => {
    if (!isAdminMode && isLoaded) {
      loadConfig().then(cfg => {
        setConfig(cfg);
        setPartnerName(cfg.partnerName || 'Cintaku');
      });
    }
  }, [isAdminMode, isLoaded]);

  const handleIntroComplete = (name: string) => {
    setPartnerName(name);
    setShowIntro(false);
    setIsMusicOpen(true);
  };

  if (isAdminMode) {
    return <AdminPanel />;
  }

  if (!isLoaded) {
    return <div className="min-h-screen bg-romantic-cream flex items-center justify-center font-serif text-romantic-dark">Preparing your surprise...</div>;
  }

  return (
    <div className={`min-h-screen relative font-sans select-none antialiased transition-colors duration-500 ${
      theme === 'cream' ? 'bg-romantic-cream text-romantic-dark' : 'bg-[#e4eff6] text-[#1c2e3d]'
    }`}>
      {/* Immersive Floating Responsive Navigation & Theme Header Dock */}
      {!showIntro && !isScrapbookModalOpen && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] backdrop-blur-md rounded-full p-1 md:p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex items-center gap-1 border transition-all duration-300 max-w-[95vw] w-fit whitespace-nowrap ${
          theme === 'cream' 
            ? 'bg-white/80 border-white/80 text-romantic-dark' 
            : 'bg-[#f0f8ff]/85 border-sky-200/50 text-sky-950'
        }`}>
          {/* Surat Pindah Tab Button */}
          <button
            onClick={() => {
              setCurrentTab('tribute');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className={`px-3 md:px-5 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-1 ${
              currentTab === 'tribute'
                ? theme === 'cream' ? 'bg-romantic-rose text-white shadow-sm' : 'bg-sky-500 text-white shadow-sm'
                : theme === 'cream' ? 'text-romantic-dark/60 hover:text-romantic-rose hover:bg-romantic-rose/5' : 'text-sky-950/60 hover:text-sky-600 hover:bg-sky-100/40'
            }`}
          >
            <span className="hidden sm:inline">💝</span>
            <span>SURAT PINDAH</span>
          </button>

          {/* Scrapbook Tab Button */}
          <button
            onClick={() => {
              setCurrentTab('scrapbook');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className={`px-3 md:px-5 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-1 ${
              currentTab === 'scrapbook'
                ? theme === 'cream' ? 'bg-romantic-rose text-white shadow-sm' : 'bg-sky-500 text-white shadow-sm'
                : theme === 'cream' ? 'text-romantic-dark/60 hover:text-[#fb7185] hover:bg-romantic-rose/5' : 'text-sky-950/60 hover:text-sky-600 hover:bg-sky-100/40'
            }`}
          >
            <span className="hidden sm:inline">📖</span>
            <span>SCRAPBOOK ({config?.scrapbook?.length || 11})</span>
          </button>

          {/* Separator Line */}
          <div className={`w-[1px] h-4 self-center mx-1 ${
            theme === 'cream' ? 'bg-romantic-gold/20' : 'bg-sky-200'
          }`} />

          {/* Unified Compact Theme Toggle Switcher */}
          <button
            onClick={() => handleThemeChange(theme === 'cream' ? 'skyblue' : 'cream')}
            aria-label="Ubah Tema"
            title={`Ubah ke tema ${theme === 'cream' ? 'Sky Blue' : 'Cream'}`}
            className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${
              theme === 'cream'
                ? 'bg-romantic-rose/10 text-romantic-rose hover:bg-romantic-rose/20'
                : 'bg-sky-100 text-sky-600 hover:bg-sky-200'
            }`}
          >
            <span className="text-sm md:text-base">{theme === 'cream' ? '⛅' : '🍦'}</span>
          </button>
        </div>
      )}

      {showIntro ? (
        <IntroScene 
          onComplete={handleIntroComplete} 
          theme={theme}
          setTheme={handleThemeChange}
        />
      ) : (
        <div className="relative animate-fade-in pt-12">
          {/* High performance fixed ambient layer */}
          <FloralBackground theme={theme} />
          <div className="cinematic-vignette" />

          {/* Dynamic viewport layout */}
          {currentTab === 'scrapbook' ? (
            <main className="relative w-full overflow-hidden">
              <Scrapbook 
                config={config} 
                isLandingPage={true} 
                theme={theme}
                setTheme={handleThemeChange}
                onNavigateHome={() => {
                  setCurrentTab('tribute');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }} 
                onModalToggle={setIsScrapbookModalOpen}
              />
            </main>
          ) : (
            <main className="relative w-full overflow-hidden">
              <Hero partnerName={partnerName} onOpenMusic={() => setIsMusicOpen(true)} config={config} theme={theme} />
              <MessageCard partnerName={partnerName} config={config} theme={theme} />
              <Reasons theme={theme} />
              <VirtualGarden theme={theme} />
              <PhotoGallery isAdmin={false} items={config.gallery || []} onUpdate={() => {}} theme={theme} />
              <Scrapbook 
                config={config} 
                isLandingPage={false} 
                theme={theme}
                setTheme={handleThemeChange}
                onNavigateHome={() => {
                  setCurrentTab('scrapbook');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }} 
                onModalToggle={setIsScrapbookModalOpen}
              />
              <Finale config={config} theme={theme} />
            </main>
          )}
        </div>
      )}

      {/* Floated beautiful state-synced audio companion */}
      {config && (
        <MusicPlayer 
          autoPlay={true} 
          isOpen={isMusicOpen} 
          onOpenChange={setIsMusicOpen} 
          hidden={showIntro}
          config={config}
          theme={theme}
        />
      )}
    </div>
  );
}
