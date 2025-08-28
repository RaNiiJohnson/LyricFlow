import { Artist } from "../src/lib/types/artist";

export const mockArtists: Artist[] = [
  {
    id: "artist-1",
    name: "KATSEYE",
    bio: "KATSEYE is a global girl group formed through the reality competition show 'The Debut: Dream Academy'. The group consists of six members from different countries, representing a new era of international Jazz collaboration.",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
    genres: ["Jazz", "Pop"],
    monthlyListeners: 2500000,
    verified: true,
    socialLinks: {
      instagram: "@katseye_official",
      twitter: "@katseye_twt",
      spotify: "katseye",
      youtube: "@katseye",
    },
    albums: ["album-1"],
    songs: ["1"],
    photos: [
      {
        id: "photo-1",
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
        caption: "Concert performance in Seoul",
        width: 400,
        height: 600,
        category: "concert",
      },
      {
        id: "photo-2",
        url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop",
        caption: "Behind the scenes photoshoot",
        width: 400,
        height: 300,
        category: "behind-scenes",
      },
      {
        id: "photo-3",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
        caption: "Studio recording session",
        width: 400,
        height: 500,
        category: "studio",
      },
      {
        id: "photo-4",
        url: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=400&fit=crop",
        caption: "Group portrait",
        width: 400,
        height: 400,
        category: "portrait",
      },
      {
        id: "photo-5",
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=700&fit=crop",
        caption: "Live performance",
        width: 400,
        height: 700,
        category: "concert",
      },
      {
        id: "photo-6",
        url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=350&fit=crop",
        caption: "Music video set",
        width: 400,
        height: 350,
        category: "behind-scenes",
      },
    ],
  },
  {
    id: "artist-2",
    name: "Queen",
    bio: "Queen are a British rock band formed in London in 1970. Their classic line-up was Freddie Mercury, Brian May, Roger Taylor and John Deacon. Queen's earliest works were influenced by progressive rock, hard rock and heavy metal, but the band gradually ventured into more conventional and radio-friendly works by incorporating further styles, such as arena rock and pop rock.",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    genres: ["Rock", "Progressive Rock", "Arena Rock"],
    monthlyListeners: 45000000,
    verified: true,
    socialLinks: {
      instagram: "@officialqueenmusic",
      twitter: "@queenwillrock",
      spotify: "queen",
      youtube: "@queen",
    },
    albums: ["album-2"],
    songs: ["2"],
    photos: [
      {
        id: "photo-q1",
        url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=500&fit=crop",
        caption: "Freddie Mercury live at Wembley",
        width: 400,
        height: 500,
        category: "concert",
      },
      {
        id: "photo-q2",
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
        caption: "Band portrait session",
        width: 400,
        height: 300,
        category: "portrait",
      },
      {
        id: "photo-q3",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
        caption: "Recording Bohemian Rhapsody",
        width: 400,
        height: 600,
        category: "studio",
      },
      {
        id: "photo-q4",
        url: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=350&fit=crop",
        caption: "Live Aid performance",
        width: 400,
        height: 350,
        category: "concert",
      },
      {
        id: "photo-q5",
        url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=450&fit=crop",
        caption: "Behind the scenes",
        width: 400,
        height: 450,
        category: "behind-scenes",
      },
    ],
  },
  {
    id: "artist-3",
    name: "John Lennon",
    bio: "John Winston Ono Lennon was an English singer, songwriter, musician and peace activist who achieved worldwide fame as founder, co-songwriter, co-lead vocalist and rhythm guitarist of the Beatles. Lennon's work was characterised by the rebellious nature and acerbic wit of his music, writing and drawings, on film, and in interviews.",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
    genres: ["Rock", "Pop Rock", "Experimental"],
    monthlyListeners: 15000000,
    verified: true,
    socialLinks: {
      instagram: "@johnlennon",
      twitter: "@johnlennon",
      spotify: "john-lennon",
      youtube: "@johnlennon",
    },
    albums: ["album-3"],
    songs: ["22"],
  },
  {
    id: "artist-4",
    name: "Eagles",
    bio: "The Eagles are an American rock band formed in Los Angeles in 1971. With five number-one singles and six number-one albums, six Grammy Awards and five American Music Awards, the Eagles were one of the most successful musical acts of the 1970s in North America.",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop",
    genres: ["Rock", "Country Rock", "Soft Rock"],
    monthlyListeners: 25000000,
    verified: true,
    socialLinks: {
      instagram: "@eagles",
      twitter: "@eagles",
      spotify: "eagles",
      youtube: "@eagles",
    },
    albums: ["album-4"],
    songs: ["3"],
  },
  {
    id: "artist-5",
    name: "Led Zeppelin",
    bio: "Led Zeppelin were an English rock band formed in London in 1968. The group consisted of vocalist Robert Plant, guitarist Jimmy Page, bassist/keyboardist John Paul Jones, and drummer John Bonham. With a heavy, guitar-driven sound, they are regularly cited as one of the progenitors of hard rock and heavy metal.",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop",
    genres: ["Rock", "Hard Rock", "Heavy Metal"],
    monthlyListeners: 30000000,
    verified: true,
    socialLinks: {
      instagram: "@ledzeppelin",
      twitter: "@ledzeppelin",
      spotify: "led-zeppelin",
      youtube: "@ledzeppelin",
    },
    albums: ["album-5"],
    songs: ["4"],
  },
  {
    id: "artist-6",
    name: "Nirvana",
    bio: "Nirvana was an American rock band formed in Aberdeen, Washington, in 1987. Founded by lead singer and guitarist Kurt Cobain and bassist Krist Novoselic, the band went through a succession of drummers, most notably Dave Grohl, who joined in 1990.",
    imageUrl:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=600&fit=crop",
    genres: ["Grunge", "Alternative Rock", "Punk Rock"],
    monthlyListeners: 20000000,
    verified: true,
    socialLinks: {
      instagram: "@nirvana",
      twitter: "@nirvana",
      spotify: "nirvana",
      youtube: "@nirvana",
    },
    albums: ["album-6"],
    songs: ["5"],
  },
  {
    id: "artist-7",
    name: "Michael Jackson",
    bio: "Michael Joseph Jackson was an American singer, songwriter, and dancer. Dubbed the 'King of Pop', he is regarded as one of the most significant cultural figures of the 20th century. Over a four-decade career, his contributions to music, dance, and fashion, along with his publicized personal life, made him a global figure in popular culture.",
    imageUrl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop",
    genres: ["Pop", "R&B", "Rock"],
    monthlyListeners: 35000000,
    verified: true,
    socialLinks: {
      instagram: "@michaeljackson",
      twitter: "@michaeljackson",
      spotify: "michael-jackson",
      youtube: "@michaeljackson",
    },
    albums: ["album-7"],
    songs: ["6"],
  },
];

// Helper functions
export const getArtistById = (id: string): Artist | undefined => {
  return mockArtists.find((artist) => artist.id === id);
};

export const getArtistByName = (name: string): Artist | undefined => {
  return mockArtists.find(
    (artist) => artist.name.toLowerCase() === name.toLowerCase()
  );
};

export const getAllArtists = (): Artist[] => {
  return mockArtists;
};

export const getArtistsByGenre = (genre: string): Artist[] => {
  return mockArtists.filter((artist) =>
    artist.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
  );
};

// Async versions
export const getAllArtistsAsync = async (): Promise<Artist[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockArtists), 0);
  });
};

export const getArtistByIdAsync = async (
  id: string
): Promise<Artist | undefined> => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(mockArtists.find((artist) => artist.id === id)),
      0
    );
  });
};

export const getArtistByNameAsync = async (
  name: string
): Promise<Artist | undefined> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          mockArtists.find(
            (artist) => artist.name.toLowerCase() === name.toLowerCase()
          )
        ),
      0
    );
  });
};
