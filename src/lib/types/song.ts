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
