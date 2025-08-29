// export interface Song {
//   id: string;
//   title: string;
//   artist: string;
//   album?: string;
//   thumbnailUrl: string;
//   lyrics: LyricLine[];
//   annotations: Annotation[];
//   releaseDate?: string;
//   genre?: string;
// }

type Artist = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  bio: string | null;
  imageUrl: string | null;
  spotifyId: string | null;
  verified: boolean;
};

type Album = {
  id: string;
  title: string;
  releaseDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  artistId: string;
  spotifyId: string | null;
  coverUrl: string | null;
} | null;

export type Song = {
  id: string;
  title: string;
  duration: number | null;
  trackNumber: number | null;
  thumbnailUrl: string | null;
  youtubeId: string | null;
  releaseDate: Date | null;
  genre: string | null;
  isExplicit: boolean;
  createdAt: Date;
  updatedAt: Date;
  artistId: string;
  albumId: string | null;
  artist: Artist;
  album: Album;
};

// ton tableau devient :
const popularSongs: Song[] = [];

export interface LyricLine {
  id: string;
  text: string;
  lineNumber: number;
  section?: string; // Section name like "Verse 1", "Chorus", etc.
  isSection?: boolean; // True if this line is a section header
  annotations?: string[]; // Array of annotation IDs
}

export interface Annotation {
  id: string;
  lyricLineId: string;
  startIndex: number;
  endIndex: number;
  content: string;
  author?: string;
  createdAt?: string;
}
