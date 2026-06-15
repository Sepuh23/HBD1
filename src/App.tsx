import React, { useState, useEffect } from 'react';
import IntroScene from './components/IntroScene';
import FloralBackground from './components/FloralBackground';
import MusicPlayer from './components/MusicPlayer';
import Hero from './components/Hero';
import MessageCard from './components/MessageCard';
import Reasons from './components/Reasons';
import VirtualGarden from './components/VirtualGarden';
import PhotoGallery from './components/PhotoGallery';
import Finale from './components/Finale';
import AdminPanel from './components/AdminPanel';
import { loadConfig, saveConfig } from './utils/configStore';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [partnerName, setPartnerName] = useState('Cintaku');
  const [config, setConfig] = useState<any>(null);

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

  const handleIntroComplete = async (name: string) => {
    if (config) {
      const updatedConfig = { ...config, partnerName: name };
      await saveConfig(updatedConfig);
    }
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
    <div className="min-h-screen relative font-sans text-romantic-dark bg-romantic-cream select-none antialiased">
      {showIntro ? (
        <IntroScene onComplete={handleIntroComplete} />
      ) : (
        <div className="relative animate-fade-in">
          {/* High performance fixed ambient layer */}
          <FloralBackground />
          <div className="cinematic-vignette" />

          {/* Core scroll segments */}
          <main className="relative z-10 w-full overflow-hidden">
            <Hero partnerName={partnerName} onOpenMusic={() => setIsMusicOpen(true)} config={config} />
            <MessageCard partnerName={partnerName} config={config} />
            <Reasons />
            <VirtualGarden />
            <PhotoGallery isAdmin={false} items={config.gallery || []} onUpdate={() => {}} />
            <Finale config={config} />
          </main>
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
        />
      )}
    </div>
  );
}
