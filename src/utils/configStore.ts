import { Track, GalleryItem } from '../types';

export interface AppConfig {
  partnerName: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  
  messageCardLabel: string;
  messageCardTitle1: string;
  messageCardTitle2: string;
  messageCardTitle3: string;
  messageParagraph1: string;
  messageParagraph2: string;
  messageParagraph3: string;
  messageSignature: string;

  collageImage1?: string;
  collageCaption1?: string;
  collageImage2?: string;
  collageCaption2?: string;
  collageImage3?: string;
  collageCaption3?: string;

  finaleLabel: string;
  finaleTitle1: string;
  finaleTitle2: string;
  finaleBody: string;
  finaleSignature: string;
  playlist: Track[];
  gallery: GalleryItem[];
}

export const DEFAULT_PLAYLIST: Track[] = [
  {
    id: 'track-custom-1',
    title: 'halo',
    artist: 'halo',
    src: 'https://example.com/audio.mp3', // This is just a placeholder from their screenshot, they'll likely update it.
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=260',
  }
];

export const DEFAULT_CONFIG: AppConfig = {
  partnerName: 'cintaku',
  heroTitleLine1: 'HAPPY BIRTHDAY,',
  heroTitleLine2: '',
  heroSubtitle: 'Today, the entire universe is celebrating the day you were born to bring light, color, and laughter into my world. You are everything to me.',
  
  messageCardLabel: 'from the bottom of my heart',
  messageCardTitle1: 'Today is the day',
  messageCardTitle2: 'the world became',
  messageCardTitle3: 'more beautiful.',
  messageParagraph1: 'The day you were born is the most precious event to ever occur in this universe — and the absolute best thing that ever happened to my life. Every single memory I spend beside you is a gift I hold close to my chest and never take for granted.',
  messageParagraph2: 'You make normal, routine days feel like magical fairytales, and magical days feel like dreams I never want to wake up from. Your gentle kindness, your beautiful radiant smile, and the warmth in your soul light up my dark evenings and keep me going.',
  messageParagraph3: 'These virtual flowers are a tiny token of the immense, boundless love I carry for you. No bouquet in the world is big enough, no song sweet enough, no poem long enough to write how much you mean to me — but please know that every single heartbeat of mine belongs entirely to you.',
  messageSignature: '— Yours, always & forever 🌹',

  collageImage1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
  collageCaption1: 'Your warm gaze ✨',
  collageImage2: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
  collageCaption2: 'Most precious smile 🥰',
  collageImage3: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
  collageCaption3: 'Perfect laughter 💖',

  finaleLabel: 'happy birthday, my love 🎂',
  finaleTitle1: 'You Are Loved',
  finaleTitle2: 'more than you know',
  finaleBody: 'On this beautiful day that belongs entirely to you — I want you to know that loving you is the greatest adventure of my life. Every year spent beside you is a gift I treasure. Every laugh we share, every quiet heartbeat of yours. Here is to celebrating you, today and every single day after. Happy Birthday. 🌸',
  finaleSignature: 'Made with endless love, just for you',

  playlist: DEFAULT_PLAYLIST,
  gallery: [
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
  ]
};

const CONFIG_KEY = 'romantic-birthday-config-v2';

export async function loadConfig(): Promise<AppConfig> {
  // First try localStorage for immediate local feedback
  const local = localStorage.getItem(CONFIG_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error('Failed to parse local config');
    }
  }

  // Then try server
  try {
    const response = await fetch('/api/config');
    const data = await response.json();
    if (data && Object.keys(data).length > 0) {
      const merged = { ...DEFAULT_CONFIG, ...data };
      localStorage.setItem(CONFIG_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.error('Failed to load config from server:', e);
  }

  return { ...DEFAULT_CONFIG };
}

export async function saveConfig(cfg: AppConfig): Promise<void> {
  // Save to localStorage immediately
  localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));

  // Try to save to server
  try {
    await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cfg)
    });
  } catch (e) {
    console.error('Failed to save config to server:', e);
  }
}
