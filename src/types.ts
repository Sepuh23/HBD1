export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration?: string;
}

export interface Reason {
  id: string;
  title: string;
  emoji: string;
  description: string;
  colorClass: string;
}

export interface GardenFlowerItem {
  id: string;
  name: string;
  emoji: string;
  wish: string;
  stemHeight: number; // in pixels
}

export interface GalleryItem {
  id: string;
  title: string;
  src: string; // Base64 or URL
  isUserUploaded?: boolean;
}

export interface ScrapbookItem {
  id: string;
  src: string; // URL or base64 file
  caption: string; // Sweet or funny description
  funnyNote?: string; // Additional hand-written humorous bubble or commentary
  stickerType?: 'tape' | 'heart' | 'star' | 'coffee' | 'cookie' | 'sparkle';
  rotation?: number; // tilt angle
}
