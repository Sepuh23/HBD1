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
}

export const DEFAULT_PLAYLIST: Track[] = [
  {
    id: 'track-1',
    title: 'Semua Aku Dirayakan (Classical Piano Op. 9)',
    artist: 'Chopin - Romantic Tribute',
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Frederic_Chopin_-_Nocturne_Op_9_No_2_E_flat_Major.mp3',
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=260',
  },
  {
    id: 'track-2',
    title: 'Gymnopédie of the Soul',
    artist: 'Erik Satie - Emotional Mood',
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Erik_Satie_-_Gymnop%C3%A9die_No._1.mp3',
    cover: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=260',
  },
  {
    id: 'track-3',
    title: 'Love Moonlight Sonata',
    artist: 'Beethoven - Evening Serenade',
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Beethoven_Moonlight_Sonata_MCG.mp3',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=260',
  }
];

export const DEFAULT_CONFIG: AppConfig = {
  partnerName: 'Cintaku',
  heroTitleLine1: 'Happy Birthday,',
  heroTitleLine2: 'My Everything',
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

  playlist: DEFAULT_PLAYLIST
};

const CONFIG_KEY = 'romantic-birthday-config-v1';

export function loadConfig(): AppConfig {
  const data = localStorage.getItem(CONFIG_KEY);
  if (!data) return { ...DEFAULT_CONFIG };
  try {
    const parsed = JSON.parse(data);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch (e) {
    return { ...DEFAULT_CONFIG };
  }
}

export function saveConfig(cfg: AppConfig) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
}
