import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Music, Image as ImageIcon, FileText, ArrowLeft, RefreshCw, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { loadConfig, saveConfig, AppConfig, DEFAULT_CONFIG } from '../utils/configStore';
import { uploadFile } from '../utils/fileUpload';
import PhotoGallery from './PhotoGallery';

export default function AdminPanel() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  
  useEffect(() => {
    async function init() {
      const cfg = await loadConfig();
      setConfig(cfg);
      setIsLoaded(true);
    }
    init();
  }, []);
  const [activeTab, setActiveTab] = useState<'text' | 'music' | 'gallery'>('text');
  const [isSaved, setIsSaved] = useState(false);

  // Music input state
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [newTrackArtist, setNewTrackArtist] = useState('');
  const [newTrackSrc, setNewTrackSrc] = useState('');
  const [newTrackCover, setNewTrackCover] = useState('');

  const handleSave = async () => {
    await saveConfig(config);
    // Sync partnerName across systems
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Are you sure you want to reset all customized text and playlist back to the default settings?')) {
      setConfig({ ...DEFAULT_CONFIG });
      await saveConfig(DEFAULT_CONFIG);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const updateConfigField = (key: keyof AppConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAddTrack = () => {
    if (!newTrackTitle || !newTrackSrc) {
      alert('Please fill out at least song title and mp3 stream link.');
      return;
    }
    const newTrack = {
      id: `track-${Date.now()}`,
      title: newTrackTitle,
      artist: newTrackArtist || 'Unknown Artist',
      src: newTrackSrc,
      cover: newTrackCover || 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=260'
    };

    const updatedPlaylist = [...config.playlist, newTrack];
    updateConfigField('playlist', updatedPlaylist);

    // Clear inputs
    setNewTrackTitle('');
    setNewTrackArtist('');
    setNewTrackSrc('');
    setNewTrackCover('');
  };

  const handleDeleteTrack = async (id: string) => {
    if (config.playlist.length <= 1) {
      alert('You should have at least one song in your musical playlist!');
      return;
    }
    const updatedPlaylist = config.playlist.filter(t => t.id !== id);
    updateConfigField('playlist', updatedPlaylist);
  };

  return (
    <div className="min-h-screen bg-romantic-cream relative select-none">
      {/* Decorative floral backgrounds */}
      <div className="absolute top-[5%] left-[5%] w-60 h-60 rounded-full bg-romantic-blush/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[5%] right-[5%] w-72 h-72 rounded-full bg-romantic-rose/10 blur-3xl pointer-events-none" />

      {/* Admin Header Navbar */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-romantic-blush/20 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {!isLoaded ? (
             <div className="text-romantic-dark font-medium">Loading settings...</div>
          ) : (
            <>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2 rounded-full bg-romantic-cream text-romantic-dark hover:text-romantic-rose transition-colors"
              title="Back to Surprise Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl text-romantic-dark flex items-center gap-2">
                Surprise Maker <span className="text-sm px-2.5 py-0.5 rounded-full bg-romantic-rose/10 text-romantic-rose font-sans font-medium">Admin Panel</span>
              </h1>
              <p className="text-xs text-romantic-dark/50">Configure public texts, photos, and music streaming</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block mr-4 text-right">
              <div className="text-[10px] font-bold text-romantic-rose uppercase tracking-tighter">Vercel Mode</div>
              <div className="text-[9px] text-romantic-dark/40 max-w-[150px] leading-tight">Persistence follows hardcoded source defaults.</div>
            </div>
            <button
              onClick={handleResetDefaults}
              className="px-4 py-2 rounded-full border border-gray-200 text-romantic-dark/70 hover:text-romantic-rose hover:bg-romantic-blush/30 hover:border-romantic-rose-light text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Defaults
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-romantic-rose to-romantic-rose-light hover:brightness-105 text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-md shadow-romantic-rose/25 active:scale-98 transition-all duration-300"
            >
              {isSaved ? <Check className="w-4 h-4 animate-bounce" /> : <Save className="w-4 h-4" />}
              {isSaved ? 'Saved & Live!' : 'Save changes'}
            </button>
          </div>
          </>
          )}
        </div>
      </header>

      {/* Main Form Fields Layout */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {isSaved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm font-medium shadow-sm"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0">✓</div>
            <span>Your updates have been published! Open the surprise in a new tab or click the home icon to view the customized live experience.</span>
          </motion.div>
        )}

        {/* Dynamic Navigation Tabs */}
        <div className="flex border-b border-romantic-blush/20 mb-8 sm:mb-12">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-4 text-center text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'text'
                ? 'border-romantic-rose text-romantic-rose bg-romantic-rose/5'
                : 'border-transparent text-romantic-dark/50 hover:text-romantic-rose hover:bg-romantic-rose/2'
            }`}
          >
            <FileText className="w-4 h-4" /> Customized Texts
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`flex-1 py-4 text-center text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'music'
                ? 'border-romantic-rose text-romantic-rose bg-romantic-rose/5'
                : 'border-transparent text-romantic-dark/50 hover:text-romantic-rose hover:bg-romantic-rose/2'
            }`}
          >
            <Music className="w-4 h-4" /> Surprise Music
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 py-4 text-center text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-romantic-rose text-romantic-rose bg-romantic-rose/5'
                : 'border-transparent text-romantic-dark/50 hover:text-romantic-rose hover:bg-romantic-rose/2'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Gallery Polaroid
          </button>
        </div>

        {/* Tab content rendering */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-romantic-blush/10 shadow-lg">
          
          {/* 1. TEXT TAB */}
          {activeTab === 'text' && (
            <div className="space-y-8 animate-fade-in">
              <h3 className="font-serif text-2xl text-romantic-dark mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-romantic-gold" /> Personalize Love Letter & Headings
              </h3>

              {/* Partner Name Form section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-rose mb-2">Partner's Name</label>
                  <input
                    type="text"
                    value={config.partnerName}
                    onChange={(e) => updateConfigField('partnerName', e.target.value)}
                    placeholder="e.g. Cintaku, Sayang, Elena"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none font-medium text-romantic-dark"
                  />
                  <p className="text-[11px] text-romantic-dark/40 mt-1">This will be prominent in titles, letters, and custom messages.</p>
                </div>
              </div>

              {/* Hero titles and subtitle */}
              <div className="space-y-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold uppercase tracking-wider text-romantic-dark/70">1. Hero Section</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Hero Welcome (Row 1)</label>
                    <input
                      type="text"
                      value={config.heroTitleLine1}
                      onChange={(e) => updateConfigField('heroTitleLine1', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Hero Welcome (Row 2 - Big cursive)</label>
                    <input
                      type="text"
                      value={config.heroTitleLine2}
                      onChange={(e) => updateConfigField('heroTitleLine2', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Primary Subheading</label>
                  <textarea
                    rows={2}
                    value={config.heroSubtitle}
                    onChange={(e) => updateConfigField('heroSubtitle', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark"
                  />
                </div>
              </div>

              {/* Message card section */}
              <div className="space-y-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold uppercase tracking-wider text-romantic-dark/70">2. Love Message Card</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Card Eyebrow Label</label>
                    <input
                      type="text"
                      value={config.messageCardLabel}
                      onChange={(e) => updateConfigField('messageCardLabel', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Title Row 1</label>
                    <input
                      type="text"
                      value={config.messageCardTitle1}
                      onChange={(e) => updateConfigField('messageCardTitle1', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Title Row 2 (Beautiful Cursive)</label>
                    <input
                      type="text"
                      value={config.messageCardTitle2}
                      onChange={(e) => updateConfigField('messageCardTitle2', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Title Row 3</label>
                    <input
                      type="text"
                      value={config.messageCardTitle3}
                      onChange={(e) => updateConfigField('messageCardTitle3', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-1">Letter Paragraph 1</label>
                    <textarea
                      rows={3}
                      value={config.messageParagraph1}
                      onChange={(e) => updateConfigField('messageParagraph1', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-1">Letter Paragraph 2</label>
                    <textarea
                      rows={3}
                      value={config.messageParagraph2}
                      onChange={(e) => updateConfigField('messageParagraph2', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-1">Letter Paragraph 3</label>
                    <textarea
                      rows={3}
                      value={config.messageParagraph3}
                      onChange={(e) => updateConfigField('messageParagraph3', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark leading-relaxed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Custom Cursive Signature</label>
                  <input
                    type="text"
                    value={config.messageSignature}
                    onChange={(e) => updateConfigField('messageSignature', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark font-script text-lg"
                  />
                </div>

                {/* Collage section */}
                <div className="space-y-4 pt-6 border-t border-dashed border-gray-150">
                  <h5 className="text-sm font-semibold uppercase tracking-wider text-romantic-rose flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-romantic-gold animate-bounce" /> Memory Collage of the Person Celebrated
                  </h5>
                  <p className="text-xs text-romantic-dark/50 leading-relaxed">
                    These 3 photos appear as physical-style taped Polaroid frames right below the love letter card. You can upload photo files directly or paste web URLs, and write custom handwritten captions below each!
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    {/* Photo 1 */}
                    <div className="space-y-3 p-4 bg-romantic-cream/20 border border-romantic-blush/20 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-romantic-dark block mb-2">Polaroid Photo #1</span>
                        {config.collageImage1 && (
                          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-romantic-cream border border-gray-200/50 shadow-inner mb-3">
                            <img src={config.collageImage1 || undefined} alt="Frame 1" className="w-full h-full object-cover" />
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <label className="block text-[10px] font-semibold text-romantic-dark/50 uppercase tracking-wider">Device Upload</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  const url = await uploadFile(file);
                                  updateConfigField('collageImage1', url);
                                } catch (err) {
                                  console.error('Upload failed:', err);
                                  alert('Failed to upload image to server');
                                }
                              }
                            }}
                            className="w-full text-xs cursor-pointer text-romantic-dark/70"
                          />
                          
                          <label className="block text-[10px] font-semibold text-romantic-dark/50 uppercase tracking-wider">Or Image URL</label>
                          <input
                            type="text"
                            value={config.collageImage1 || ''}
                            onChange={(e) => updateConfigField('collageImage1', e.target.value)}
                            placeholder="e.g. https://images.unsplash.com/..."
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-romantic-rose/50 outline-none text-xs text-romantic-dark font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 mt-4">
                        <label className="block text-[10px] font-semibold text-romantic-rose uppercase tracking-wider">Handwritten Caption</label>
                        <input
                          type="text"
                          value={config.collageCaption1 || ''}
                          onChange={(e) => updateConfigField('collageCaption1', e.target.value)}
                          placeholder="Your warm gaze ✨"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-romantic-rose outline-none text-xs text-romantic-dark font-script text-base"
                        />
                      </div>
                    </div>

                    {/* Photo 2 */}
                    <div className="space-y-3 p-4 bg-romantic-cream/20 border border-romantic-blush/20 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-romantic-dark block mb-2">Polaroid Photo #2</span>
                        {config.collageImage2 && (
                          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-romantic-cream border border-gray-200/50 shadow-inner mb-3">
                            <img src={config.collageImage2 || undefined} alt="Frame 2" className="w-full h-full object-cover" />
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <label className="block text-[10px] font-semibold text-romantic-dark/50 uppercase tracking-wider">Device Upload</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  const url = await uploadFile(file);
                                  updateConfigField('collageImage2', url);
                                } catch (err) {
                                  console.error('Upload failed:', err);
                                  alert('Failed to upload image to server');
                                }
                              }
                            }}
                            className="w-full text-xs cursor-pointer text-romantic-dark/70"
                          />
                          
                          <label className="block text-[10px] font-semibold text-romantic-dark/50 uppercase tracking-wider">Or Image URL</label>
                          <input
                            type="text"
                            value={config.collageImage2 || ''}
                            onChange={(e) => updateConfigField('collageImage2', e.target.value)}
                            placeholder="e.g. https://images.unsplash.com/..."
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-romantic-rose/50 outline-none text-xs text-romantic-dark font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 mt-4">
                        <label className="block text-[10px] font-semibold text-romantic-rose uppercase tracking-wider">Handwritten Caption</label>
                        <input
                          type="text"
                          value={config.collageCaption2 || ''}
                          onChange={(e) => updateConfigField('collageCaption2', e.target.value)}
                          placeholder="Most precious smile 🥰"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-romantic-rose outline-none text-xs text-romantic-dark font-script text-base"
                        />
                      </div>
                    </div>

                    {/* Photo 3 */}
                    <div className="space-y-3 p-4 bg-romantic-cream/20 border border-romantic-blush/20 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-romantic-dark block mb-2">Polaroid Photo #3</span>
                        {config.collageImage3 && (
                          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-romantic-cream border border-gray-200/50 shadow-inner mb-3">
                            <img src={config.collageImage3 || undefined} alt="Frame 3" className="w-full h-full object-cover" />
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <label className="block text-[10px] font-semibold text-romantic-dark/50 uppercase tracking-wider">Device Upload</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                try {
                                  const url = await uploadFile(file);
                                  updateConfigField('collageImage3', url);
                                } catch (err) {
                                  console.error('Upload failed:', err);
                                  alert('Failed to upload image to server');
                                }
                              }
                            }}
                            className="w-full text-xs cursor-pointer text-romantic-dark/70"
                          />
                          
                          <label className="block text-[10px] font-semibold text-romantic-dark/50 uppercase tracking-wider">Or Image URL</label>
                          <input
                            type="text"
                            value={config.collageImage3 || ''}
                            onChange={(e) => updateConfigField('collageImage3', e.target.value)}
                            placeholder="e.g. https://images.unsplash.com/..."
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-romantic-rose/50 outline-none text-xs text-romantic-dark font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 mt-4">
                        <label className="block text-[10px] font-semibold text-romantic-rose uppercase tracking-wider">Handwritten Caption</label>
                        <input
                          type="text"
                          value={config.collageCaption3 || ''}
                          onChange={(e) => updateConfigField('collageCaption3', e.target.value)}
                          placeholder="Perfect laughter 💖"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-romantic-rose outline-none text-xs text-romantic-dark font-script text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Finale section configuration */}
              <div className="space-y-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold uppercase tracking-wider text-romantic-dark/70">3. Proposal Finale Card</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Finale Label Eyebrow</label>
                    <input
                      type="text"
                      value={config.finaleLabel}
                      onChange={(e) => updateConfigField('finaleLabel', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Finale Title Row 1</label>
                    <input
                      type="text"
                      value={config.finaleTitle1}
                      onChange={(e) => updateConfigField('finaleTitle1', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Finale Title Row 2 (Beautiful Cursive)</label>
                    <input
                      type="text"
                      value={config.finaleTitle2}
                      onChange={(e) => updateConfigField('finaleTitle2', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Finale Paragraph content</label>
                  <textarea
                    rows={3}
                    value={config.finaleBody}
                    onChange={(e) => updateConfigField('finaleBody', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-romantic-dark/50 mb-2">Finale Footer Signature</label>
                  <input
                    type="text"
                    value={config.finaleSignature}
                    onChange={(e) => updateConfigField('finaleSignature', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-romantic-rose focus:ring-1 focus:ring-romantic-rose outline-none text-sm text-romantic-dark text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. MUSIC TAB */}
          {activeTab === 'music' && (
            <div className="space-y-8 animate-fade-in">
              <h3 className="font-serif text-2xl text-romantic-dark mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                <Music className="w-5 h-5 text-romantic-rose" /> Manage Soundtrack Playlist
              </h3>

              {/* Playlist songs list */}
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-romantic-dark/70">Current Playlist</label>
                {config.playlist.map((track, idx) => (
                  <div
                    key={track.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-romantic-cream/30 border border-romantic-blush/20 rounded-2xl gap-4"
                  >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-romantic-cream">
                        <img src={track.cover || undefined} alt={track.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="truncate flex-1">
                        <h4 className="text-sm font-semibold text-romantic-dark truncate">{track.title}</h4>
                        <p className="text-xs text-romantic-dark/50 truncate">{track.artist}</p>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 text-xs">
                      <span className="font-mono text-romantic-dark/40 truncate max-w-[200px] block sm:inline" title={track.src}>
                        {track.src.substring(0, 30)}...
                      </span>
                      <button
                        onClick={() => handleDeleteTrack(track.id)}
                        className="p-2 rounded-full text-romantic-rose hover:bg-romantic-blush/35 hover:text-romantic-burgundy transition-colors"
                        title="Delete Song"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add sound dialog */}
              <div className="p-6 bg-romantic-cream/15 border border-dashed border-romantic-blush/30 rounded-3xl mt-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-romantic-rose mb-4 flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Custom Sound Soundtrack (.mp3)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-romantic-dark/65 mb-1.5">Song Title</label>
                    <input
                      type="text"
                      value={newTrackTitle}
                      onChange={(e) => setNewTrackTitle(e.target.value)}
                      placeholder="e.g. Beautiful In White"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 outline-none text-xs text-romantic-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-romantic-dark/65 mb-1.5">Artist / Coverer Name</label>
                    <input
                      type="text"
                      value={newTrackArtist}
                      onChange={(e) => setNewTrackArtist(e.target.value)}
                      placeholder="e.g. Shane Filan"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 outline-none text-xs text-romantic-dark"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-romantic-dark/65 mb-1.5">Streaming Audio (.mp3 Direct URL)</label>
                    <input
                      type="url"
                      value={newTrackSrc}
                      onChange={(e) => setNewTrackSrc(e.target.value)}
                      placeholder="https://example.com/audio.mp3"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 outline-none text-xs text-romantic-dark font-mono"
                    />
                    <div className="text-center text-[10px] text-romantic-rose font-medium italic">Pasting direct MP3 links is recommended for Vercel.</div>
                    <div className="text-center text-[10px] text-romantic-dark/40 italic">or upload local file (Limited)</div>
                    <input
                      type="file"
                      accept="audio/mp3,audio/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 20 * 1024 * 1024) {
                            alert("File too large! Max 20MB.");
                            return;
                          }
                          try {
                            const url = await uploadFile(file);
                            setNewTrackSrc(url);
                            if (!newTrackTitle) setNewTrackTitle(file.name.replace(/\.[^/.]+$/, ""));
                          } catch (err) {
                            console.error('Failed to upload audio:', err);
                            alert('Failed to upload file to server.');
                          }
                        }
                      }}
                      className="w-full text-xs text-romantic-dark/70"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-romantic-dark/65 mb-1.5">Song Artwork Cover Image URL (Optional)</label>
                    <input
                      type="url"
                      value={newTrackCover}
                      onChange={(e) => setNewTrackCover(e.target.value)}
                      placeholder="https://images.unsplash.com/... or leave empty"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 outline-none text-xs text-romantic-dark font-mono"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddTrack}
                  className="px-4 py-2 bg-romantic-dark text-white text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-romantic-rose hover:shadow transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Song
                </button>
              </div>
            </div>
          )}

          {/* 3. GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-2xl text-romantic-dark mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-romantic-rose" /> Customize Interactive Gallery Photographs
              </h3>
              
              <p className="text-sm text-romantic-dark/60 leading-relaxed mb-6">
                Below is a preview of the Polaroid card grid. Since you are in the <strong>Admin Panel</strong>, you can instantly add and upload new photographs, delete any item, or tap on any caption text below to customize what it says! All modifications are saved automatically as you make them.
              </p>

              {/* Direct inline PhotoGallery rendered with isAdmin={true} */}
              <div className="border border-romantic-blush/20 rounded-3xl overflow-hidden bg-romantic-cream/10 p-4">
                <PhotoGallery 
                  isAdmin={true} 
                  items={config.gallery || []} 
                  onUpdate={(newGallery) => updateConfigField('gallery', newGallery)}
                />
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
