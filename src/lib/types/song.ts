export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  thumbnailUrl: string;
  lyrics: LyricLine[];
  annotations: Annotation[];
  releaseDate?: string;
  genre?: string;
}

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
