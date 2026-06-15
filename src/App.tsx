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
  const [showIntro, setShowIntro] = useState(true);
  const [partnerName, setPartnerName] = useState(() => {
    const config = loadConfig();
    return config.partnerName || 'Cintaku';
  });

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

  const handleIntroComplete = (name: string) => {
    const config = loadConfig();
    config.partnerName = name;
    saveConfig(config);
    setPartnerName(name);
    setShowIntro(false);
    setIsMusicOpen(true);
  };

  if (isAdminMode) {
    return <AdminPanel />;
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
            <Hero partnerName={partnerName} onOpenMusic={() => setIsMusicOpen(true)} />
            <MessageCard partnerName={partnerName} />
            <Reasons />
            <VirtualGarden />
            <PhotoGallery isAdmin={false} />
            <Finale />
          </main>
        </div>
      )}

      {/* Floated beautiful state-synced audio companion */}
      <MusicPlayer 
        autoPlay={true} 
        isOpen={isMusicOpen} 
        onOpenChange={setIsMusicOpen} 
        hidden={showIntro}
      />
    </div>
  );
}
