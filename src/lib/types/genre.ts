export interface Genre {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string; // Hex color for theming
  songCount: number;
  popularSongs: string[]; // Song IDs
}
