import { Track, GalleryItem, ScrapbookItem } from '../types';

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
  
  scrapbookTitle?: string;
  scrapbookSubtitle?: string;
  scrapbook?: ScrapbookItem[];
}

export const DEFAULT_PLAYLIST: Track[] = [
  {
    id: 'track-1',
    title: 'Semua Aku Dirayakan',
    artist: 'Nadin Amizah',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Note: Ganti URL ini di admin panel dengan link mp3 asli
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=260',
  }
];

export const DEFAULT_CONFIG: AppConfig = {
  partnerName: 'cintaku',
  heroTitleLine1: 'SELAMAT ULANG TAHUN,',
  heroTitleLine2: '',
  heroSubtitle: 'Hari ini, seluruh semesta merayakan hari kelahiranmu yang membawa cahaya, warna, dan tawa ke duniaku. Kamu adalah segalanya bagiku.',
  
  messageCardLabel: 'dari lubuk hatiku yang terdalam',
  messageCardTitle1: 'Hari ini adalah hari',
  messageCardTitle2: 'ketika dunia menjadi',
  messageCardTitle3: 'jauh lebih indah.',
  messageParagraph1: 'Hari ketika kamu lahir adalah peristiwa paling berharga yang pernah terjadi di semesta ini — dan hal terbaik yang pernah hadir dalam hidupku. Setiap kenangan bersamamu adalah kado indah yang selalu kusimpan erat di dada.',
  messageParagraph2: 'Kamu membuat hari-hari biasa terasa seperti dongeng ajaib, dan hari-hari ajaib terasa seperti mimpi yang sangat indah. Kebaikanmu, senyummu yang terpancar cantik, dan kehangatan jiwamu selalu menerangi hari-hariku.',
  messageParagraph3: 'Bunga virtual ini adalah lambang kecil dari rasa cinta yang tak terbatas untukmu. Tidak ada buket bunga di dunia yang cukup besar, tidak ada lagu yang cukup manis, tidak ada puisi yang cukup panjang untuk menggambarkan betapa berharganya dirimu — ketahuilah setiap detak jantungku adalah milikmu.',
  messageSignature: '— Milikmu, selalu & selamanya 🌹',

  collageImage1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
  collageCaption1: 'Tatap hangatmu ✨',
  collageImage2: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
  collageCaption2: 'Senyum paling berharga 🥰',
  collageImage3: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
  collageCaption3: 'Tawa yang sempurna 💖',

  finaleLabel: 'selamat ulang tahun, sayangku 🎂',
  finaleTitle1: 'Kamu Sangat Dicintai',
  finaleTitle2: 'lebih dari yang kamu tahu',
  finaleBody: 'Di hari indah yang sepenuhnya milikmu ini — aku ingin kamu tahu bahwa mencintaimu adalah petualangan terbesar dalam hidupku. Setiap tahun yang kulalui di sisimu adalah hadiah terbaik. Di sini untuk merayakan dirimu, hari ini dan selamanya. Selamat ulang tahun. 🌸',
  finaleSignature: 'Dibuat dengan cinta tanpa akhir, khusus untukmu',

  playlist: DEFAULT_PLAYLIST,
  gallery: [
    {
      id: 'g-1',
      title: 'kamu',
      src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'g-2',
      title: 'adalah',
      src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'g-3',
      title: 'sangat',
      src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'g-4',
      title: 'cantik',
      src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    }
  ],
  scrapbookTitle: "Scrapbook Lucu & Manis Kita 📖",
  scrapbookSubtitle: "Kumpulan foto random, momen konyol, dan kalimat manis yang bikin senyum-senyum sendiri.",
  scrapbook: [
    {
      id: 'sb-1',
      src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600',
      caption: 'Momen Kamu Cemberut Pas Laper 😤',
      funnyNote: 'Katanya lagi diet ketat, tapi pas tahu bulat anget lewat langsung beli 20 biji dimaem sendiri. Unyu bgt pas pipimu gembul ngunyah!',
      stickerType: 'heart',
      rotation: -3
    },
    {
      id: 'sb-2',
      src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600',
      caption: 'Muka Konyol & Mangkuk Seblak 🤪🌶️',
      funnyNote: 'Pose estetik ala selebgram gagal total gara-gara kamu kepedesan sampai megap-megap. Tapi entah kenapa ini foto tercantikmu di mataku!',
      stickerType: 'cookie',
      rotation: 4
    },
    {
      id: 'sb-3',
      src: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=600',
      caption: 'Sleepyhead Mode On 😴💤',
      funnyNote: 'Nelpon malem-malem bilangnya "aku gak ngantuk kok sayang", dua detik kemudian terdengar suara dengkuran super halus ala kucing manja.',
      stickerType: 'tape',
      rotation: -5
    },
    {
      id: 'sb-4',
      src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
      caption: 'Ketawa Lebar Tanpa Jaga Image! 😂',
      funnyNote: 'Ketawa paling lepas pas aku kepleset waktu itu. Senyum lebar tanpa jaim inilah yang selalu bikin duniaku yang sepi jadi rame musik indah.',
      stickerType: 'sparkle',
      rotation: 3
    },
    {
      id: 'sb-5',
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
      caption: 'Muka Panik Kunci Motor Ilang 🔑🤦‍♀️',
      funnyNote: 'Udah nangis bombay nyariin kunci motor di tas sampe dibongkar semua, ternyata kuncinya digenggam di tangan kananmu sendiri dari tadi. Capek bgt tapi gemesin pol!',
      stickerType: 'tape',
      rotation: -4
    },
    {
      id: 'sb-6',
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      caption: 'Nyobain Filter TikTok Serem 👹📱',
      funnyNote: 'Berniat mau bikin video cute es estetik, eh salah pencet filter hantu kuyang. Kamu langsung jerit histeris sampe hp-mu dilempar ke kasur. Ngakak seminggu aku!',
      stickerType: 'sparkle',
      rotation: 2
    },
    {
      id: 'sb-7',
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600',
      caption: 'Porsi Makan Kuli Berkedok Diet 🍚🍗',
      funnyNote: '"Aku kenyang banget beib, ga sanggup makan lagi." Dua menit kemudian: mencuri sisa ayam gorengku dan pesen es buah jumbo. Dietnya mulai besok terus ya sayang.',
      stickerType: 'cookie',
      rotation: -3
    },
    {
      id: 'sb-8',
      src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
      caption: 'Pose Aesthetic Ala Korea Gagal 🇰🇷💨',
      funnyNote: 'Mau niru gaya drakor jalan slow-motion ditiup angin sore, pas angin kencang dateng, mukamu malah ketutup rambut jabrik kayak singa sirkus. Tolong, ini masterpiece!',
      stickerType: 'heart',
      rotation: 5
    },
    {
      id: 'sb-9',
      src: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=600',
      caption: 'Keracunan Belanja Online Paket Murah 📦💸',
      funnyNote: 'Katanya stop boros, tapi kurir J&T dateng sehari 3 kali manggil namamu. Isinya ternyata gantungan kunci bebek bunyi teot-teot seharga lima ribu rupiah. Ampun deh bidadariku!',
      stickerType: 'coffee',
      rotation: -2
    },
    {
      id: 'sb-10',
      src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600',
      caption: 'Nyanyi Fals Volume Maksimal 🎤🚗',
      funnyNote: 'Konser tunggal sepanjang jalan tol. Nada tinggi dihantam, nada rendah dilewati, yang penting ekspresi penghayatannya dapet 100/100. Aku fans setiamu selamanya!',
      stickerType: 'sparkle',
      rotation: 4
    },
    {
      id: 'sb-11',
      src: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600',
      caption: 'Muka Setengah Sadar Baru Bangun 🥱🧸',
      funnyNote: 'Muka paling tulus tanpa skincare, rambut acak-acakan kayak sarang burung, matanya sipit sebelah. Muka terlucu inilah yang selalu bikin aku pengen buru-buru halalin kamu.',
      stickerType: 'tape',
      rotation: -5
    }
  ]
};

const CONFIG_KEY = 'romantic-birthday-config-v6';

export async function loadConfig(): Promise<AppConfig> {
  // Always try server first for the most up-to-date config
  try {
    const response = await fetch('/api/config');
    if (response.ok) {
      const data = await response.json();
      if (data && Object.keys(data).length > 0) {
        console.log('Loaded config from server');
        const merged = { ...DEFAULT_CONFIG, ...data };
        localStorage.setItem(CONFIG_KEY, JSON.stringify(merged));
        return merged;
      }
    }
  } catch (e) {
    console.warn('Failed to load config from server, falling back to local storage:', e);
  }

  // Fallback to localStorage if server fails or is unreachable
  const local = localStorage.getItem(CONFIG_KEY);
  if (local) {
    try {
      const parsed = JSON.parse(local);
      console.log('Loaded config from local storage');
      return { ...DEFAULT_CONFIG, ...parsed };
    } catch (e) {
      console.warn('Failed to parse local config');
    }
  }

  console.log('Using default hardcoded config');
  return { ...DEFAULT_CONFIG };
}

export async function saveConfig(cfg: AppConfig): Promise<void> {
  // Save to localStorage immediately for fast UI feedback
  localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));

  // Save to server filesystem persistence
  try {
    const response = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cfg)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to save to server: ${errorText}`);
    }
    console.log('Successfully saved to server');
  } catch (e) {
    console.error('Server save error:', e);
    throw e;
  }
}
