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
