export interface ArtistPhoto {
  id: string;
  url: string;
  caption?: string;
  width: number;
  height: number;
  category?: "concert" | "studio" | "portrait" | "behind-scenes" | "event";
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  genres: string[];
  monthlyListeners?: number;
  verified?: boolean;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    spotify?: string;
    youtube?: string;
  };
  albums: string[]; // Album IDs
  songs: string[]; // Song IDs
  photos?: ArtistPhoto[]; // Galerie de photos style Pinterest
}
