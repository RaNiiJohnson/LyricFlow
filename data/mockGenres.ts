import { Genre } from "../src/lib/types/genre";

export const mockGenres: Genre[] = [
  {
    id: "genre-1",
    name: "Jazz",
    description:
      "Korean popular music characterized by catchy melodies, synchronized choreography, and high production values.",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    color: "#FF6B9D",
    songCount: 1,
    popularSongs: ["1"],
  },
  {
    id: "genre-2",
    name: "Rock",
    description:
      "A broad genre of popular music that originated as rock and roll in the 1950s, characterized by electric guitars, bass, and drums.",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop",
    color: "#FF4757",
    songCount: 4,
    popularSongs: ["2", "22", "3", "4"],
  },
  {
    id: "genre-3",
    name: "Pop",
    description:
      "Popular music that is commercially recorded and designed to appeal to a broad audience, typically featuring catchy hooks and melodies.",
    imageUrl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
    color: "#3742FA",
    songCount: 1,
    popularSongs: ["6"],
  },
  {
    id: "genre-4",
    name: "Grunge",
    description:
      "A subgenre of alternative rock that emerged in the mid-1980s, characterized by distorted guitars and angst-filled lyrics.",
    imageUrl:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=400&fit=crop",
    color: "#2F3542",
    songCount: 1,
    popularSongs: ["5"],
  },
  {
    id: "genre-5",
    name: "Progressive Rock",
    description:
      "A rock music subgenre that developed in the late 1960s, characterized by complex compositions and conceptual themes.",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
    color: "#5F27CD",
    songCount: 2,
    popularSongs: ["2", "4"],
  },
  {
    id: "genre-6",
    name: "Hard Rock",
    description:
      "A subgenre of rock music characterized by aggressive vocals, distorted electric guitars, bass guitar, and drums.",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop",
    color: "#FF3838",
    songCount: 1,
    popularSongs: ["4"],
  },
  {
    id: "genre-7",
    name: "Alternative Rock",
    description:
      "A category of rock music that emerged from the independent music underground of the 1980s.",
    imageUrl:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=400&fit=crop",
    color: "#FF6348",
    songCount: 1,
    popularSongs: ["5"],
  },
  {
    id: "genre-8",
    name: "R&B",
    description:
      "Rhythm and blues, a genre that combines elements of pop, gospel, blues, and soul music.",
    imageUrl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
    color: "#8E44AD",
    songCount: 1,
    popularSongs: ["6"],
  },
];

// Helper functions
export const getGenreById = (id: string): Genre | undefined => {
  return mockGenres.find((genre) => genre.id === id);
};

export const getGenreByName = (name: string): Genre | undefined => {
  return mockGenres.find(
    (genre) => genre.name.toLowerCase() === name.toLowerCase()
  );
};

export const getAllGenres = (): Genre[] => {
  return mockGenres;
};

export const getPopularGenres = (): Genre[] => {
  return mockGenres.sort((a, b) => b.songCount - a.songCount).slice(0, 6);
};

// Async versions
export const getAllGenresAsync = async (): Promise<Genre[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockGenres), 0);
  });
};

export const getGenreByIdAsync = async (
  id: string
): Promise<Genre | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockGenres.find((genre) => genre.id === id)), 0);
  });
};

export const getPopularGenresAsync = async (): Promise<Genre[]> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          mockGenres.sort((a, b) => b.songCount - a.songCount).slice(0, 6)
        ),
      0
    );
  });
};
