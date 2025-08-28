export interface Album {
  id: string;
  title: string;
  artist: string; // Artist name
  artistId: string; // Artist ID
  coverUrl: string;
  releaseDate: string;
  genre: string;
  description?: string;
  tracks: AlbumTrack[];
  totalDuration?: number; // in seconds
}

export interface AlbumTrack {
  id: string;
  trackNumber: number;
  title: string;
  duration: number; // in seconds
  songId: string; // Reference to Song ID
}
