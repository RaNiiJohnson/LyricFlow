import { Song } from "../src/lib/types/song";

export const mockSongs: Song[] = [
  {
    id: "70",
    title: "POWER",
    artist: "Kevs",
    album: "FEAR",
    thumbnailUrl: "/images/kevs.png",
    releaseDate: "31 Jul 2025 ",
    genre: "RnB",
    lyrics: [
      {
        id: "section-1",
        text: "Refrain",
        lineNumber: 1,
        isSection: true,
      },
      {
        id: "line-1",
        text: "I Got that power mahatonga anao lasa saina",
        lineNumber: 2,
        annotations: ["ann-1"],
      },
      {
        id: "line-2",
        text: "Ny olona mora miova iriko ianao mba tsy ho anisany",
        lineNumber: 3,
      },
      {
        id: "line-3",
        text: "Nampadiso fanantenana anah tsy afaka isaina",
        lineNumber: 4,
      },
      {
        id: "line-4",
        text: "Mandeha irery tsy mitaraina , Alatsinainy atr@weekend",
        lineNumber: 5,
      },
      {
        id: "line-5",
        text: "Hmmm , misy zavatra tsy azoko efa miezaka mitsoka mbola tratrany fomba ratsiko",
        lineNumber: 6,
      },
      {
        id: "line-6",
        text: "Hmmm , azafady ra hoe nandratra / indraindray tsy ianao ilay diso fa ilay mibaiko anatiko",
        lineNumber: 7,
      },
      {
        id: "section-2",
        text: "Couplet 1",
        lineNumber: 10,
        isSection: true,
      },
      {
        id: "line-9",
        text: "Izay napitambatra no manasaraka antsika tsy hiray ihany",
        lineNumber: 11,
      },
      {
        id: "line-10",
        text: "Ny hiafarantsika sy ianao ho fatin’ny love sy ny pride",
        lineNumber: 12,
      },
      {
        id: "line-11",
        text: "We dreamin' hard, we came so far",
        lineNumber: 13,
      },
      {
        id: "line-12",
        text: "Now I believe",
        lineNumber: 14,
      },
      {
        id: "section-3",
        text: "Chorus: Rumi, All",
        lineNumber: 15,
        isSection: true,
      },
      {
        id: "line-13",
        text: "We're goin' up, up, up",
        lineNumber: 16,
        annotations: ["ann-4"],
      },
      {
        id: "line-14",
        text: "It's our moment",
        lineNumber: 17,
      },
      {
        id: "line-15",
        text: "You know together we're glowing",
        lineNumber: 18,
      },
      {
        id: "line-16",
        text: "Gonna be, gonna be golden",
        lineNumber: 19,
        annotations: ["ann-5"],
      },
      {
        id: "line-17",
        text: "Oh, up, up, up",
        lineNumber: 20,
      },
      {
        id: "line-18",
        text: "With our voices",
        lineNumber: 21,
      },
      {
        id: "line-19",
        text: "Yeongwonhi kkaejil su eomneun",
        lineNumber: 22,
      },
      {
        id: "line-20",
        text: "Gonna be, gonna be golden",
        lineNumber: 23,
      },
    ],
    annotations: [
      {
        id: "ann-1",
        lyricLineId: "line-1",
        startIndex: 0,
        endIndex: 29,
        content:
          "The opening line establishes the protagonist's past state of isolation and invisibility.",
        author: "Jazz Analyst",
        createdAt: "2024-08-20T10:30:00Z",
      },
      {
        id: "ann-2",
        lyricLineId: "line-3",
        startIndex: 0,
        endIndex: 47,
        content:
          "References being given power or responsibility but lacking the confidence to embrace it.",
        author: "Music Scholar",
        createdAt: "2024-08-20T11:00:00Z",
      },
      {
        id: "ann-3",
        lyricLineId: "line-7",
        startIndex: 0,
        endIndex: 44,
        content:
          "Reclaiming the 'problem child' label as a source of strength and authenticity.",
        author: "Cultural Critic",
        createdAt: "2024-08-20T11:30:00Z",
      },
      {
        id: "ann-4",
        lyricLineId: "line-13",
        startIndex: 0,
        endIndex: 21,
        content:
          "The repetitive 'up, up, up' emphasizes the ascending journey and momentum of growth.",
        author: "Lyric Expert",
        createdAt: "2024-08-20T12:00:00Z",
      },
      {
        id: "ann-5",
        lyricLineId: "line-16",
        startIndex: 0,
        endIndex: 26,
        content:
          "The central metaphor of becoming 'golden' represents achieving one's full potential and worth.",
        author: "Pop Music Critic",
        createdAt: "2024-08-20T12:30:00Z",
      },
    ],
  },
  {
    id: "1",
    title: "Golden",
    artist: "KATSEYE",
    album: "SIS (Soft Is Strong)",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    releaseDate: "2024-08-16",
    genre: "Jazz",
    lyrics: [
      {
        id: "section-1",
        text: "Verse 1: Rumi, Zoey, Mira, All",
        lineNumber: 1,
        isSection: true,
      },
      {
        id: "line-1",
        text: "I was a ghost, I was alone",
        lineNumber: 2,
        annotations: ["ann-1"],
      },
      {
        id: "line-2",
        text: "Eoduwojin apgilsoge (Hah)",
        lineNumber: 3,
      },
      {
        id: "line-3",
        text: "Given the throne, I didn't know how to believe (Hah)",
        lineNumber: 4,
        annotations: ["ann-2"],
      },
      {
        id: "line-4",
        text: "I was the queen that I'm meant to be (Ah)",
        lineNumber: 5,
      },
      {
        id: "line-5",
        text: "I lived two lives, tried to play both sides",
        lineNumber: 6,
      },
      {
        id: "line-6",
        text: "But I couldn't find my own place (Oh, oh)",
        lineNumber: 7,
      },
      {
        id: "line-7",
        text: "Called a problem child, 'cause I got too wild",
        lineNumber: 8,
        annotations: ["ann-3"],
      },
      {
        id: "line-8",
        text: "But now that's how I'm getting paid, kkeuteopsi on stage",
        lineNumber: 9,
      },
      {
        id: "section-2",
        text: "Pre-Chorus: Rumi, All",
        lineNumber: 10,
        isSection: true,
      },
      {
        id: "line-9",
        text: "I'm done hidin', now I'm shinin'",
        lineNumber: 11,
      },
      {
        id: "line-10",
        text: "Like I'm born to be",
        lineNumber: 12,
      },
      {
        id: "line-11",
        text: "We dreamin' hard, we came so far",
        lineNumber: 13,
      },
      {
        id: "line-12",
        text: "Now I believe",
        lineNumber: 14,
      },
      {
        id: "section-3",
        text: "Chorus: Rumi, All",
        lineNumber: 15,
        isSection: true,
      },
      {
        id: "line-13",
        text: "We're goin' up, up, up",
        lineNumber: 16,
        annotations: ["ann-4"],
      },
      {
        id: "line-14",
        text: "It's our moment",
        lineNumber: 17,
      },
      {
        id: "line-15",
        text: "You know together we're glowing",
        lineNumber: 18,
      },
      {
        id: "line-16",
        text: "Gonna be, gonna be golden",
        lineNumber: 19,
        annotations: ["ann-5"],
      },
      {
        id: "line-17",
        text: "Oh, up, up, up",
        lineNumber: 20,
      },
      {
        id: "line-18",
        text: "With our voices",
        lineNumber: 21,
      },
      {
        id: "line-19",
        text: "Yeongwonhi kkaejil su eomneun",
        lineNumber: 22,
      },
      {
        id: "line-20",
        text: "Gonna be, gonna be golden",
        lineNumber: 23,
      },
    ],
    annotations: [
      {
        id: "ann-1",
        lyricLineId: "line-1",
        startIndex: 0,
        endIndex: 29,
        content:
          "The opening line establishes the protagonist's past state of isolation and invisibility.",
        author: "Jazz Analyst",
        createdAt: "2024-08-20T10:30:00Z",
      },
      {
        id: "ann-2",
        lyricLineId: "line-3",
        startIndex: 0,
        endIndex: 47,
        content:
          "References being given power or responsibility but lacking the confidence to embrace it.",
        author: "Music Scholar",
        createdAt: "2024-08-20T11:00:00Z",
      },
      {
        id: "ann-3",
        lyricLineId: "line-7",
        startIndex: 0,
        endIndex: 44,
        content:
          "Reclaiming the 'problem child' label as a source of strength and authenticity.",
        author: "Cultural Critic",
        createdAt: "2024-08-20T11:30:00Z",
      },
      {
        id: "ann-4",
        lyricLineId: "line-13",
        startIndex: 0,
        endIndex: 21,
        content:
          "The repetitive 'up, up, up' emphasizes the ascending journey and momentum of growth.",
        author: "Lyric Expert",
        createdAt: "2024-08-20T12:00:00Z",
      },
      {
        id: "ann-5",
        lyricLineId: "line-16",
        startIndex: 0,
        endIndex: 26,
        content:
          "The central metaphor of becoming 'golden' represents achieving one's full potential and worth.",
        author: "Pop Music Critic",
        createdAt: "2024-08-20T12:30:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    releaseDate: "1975-10-31",
    genre: "Rock",
    lyrics: [
      {
        id: "section-1",
        text: "Verse 1",
        lineNumber: 1,
        isSection: true,
      },
      {
        id: "line-1",
        text: "Is this the real life?",
        lineNumber: 2,
        annotations: ["ann-1"],
      },
      {
        id: "line-2",
        text: "Is this just fantasy?",
        lineNumber: 3,
        annotations: ["ann-2"],
      },
      {
        id: "line-3",
        text: "Caught in a landslide",
        lineNumber: 4,
        annotations: ["ann-3"],
      },
      {
        id: "line-4",
        text: "No escape from reality",
        lineNumber: 5,
      },
      {
        id: "line-5",
        text: "Open your eyes",
        lineNumber: 6,
      },
      {
        id: "line-6",
        text: "Look up to the skies and see",
        lineNumber: 7,
      },
    ],
    annotations: [
      {
        id: "ann-1",
        lyricLineId: "line-1",
        startIndex: 0,
        endIndex: 19,
        content:
          "The opening line questions the nature of reality, setting up the existential theme of the song.",
        author: "Music Scholar",
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        id: "ann-2",
        lyricLineId: "line-2",
        startIndex: 0,
        endIndex: 20,
        content:
          "Continues the philosophical questioning, blurring the line between reality and imagination.",
        author: "Literature Expert",
        createdAt: "2024-01-15T11:00:00Z",
      },
      {
        id: "ann-3",
        lyricLineId: "line-3",
        startIndex: 0,
        endIndex: 18,
        content:
          "Metaphor for being overwhelmed by circumstances beyond one's control.",
        author: "Poetry Analyst",
        createdAt: "2024-01-15T11:30:00Z",
      },
    ],
  },
  {
    id: "22",
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    releaseDate: "1971-09-09",
    genre: "Rock",
    lyrics: [
      {
        id: "line-7",
        text: "Imagine there's no heaven",
        lineNumber: 1,
        annotations: ["ann-4"],
      },
      {
        id: "line-8",
        text: "It's easy if you try",
        lineNumber: 2,
      },
      {
        id: "line-9",
        text: "No hell below us",
        lineNumber: 3,
        annotations: ["ann-5"],
      },
      {
        id: "line-10",
        text: "Above us only sky",
        lineNumber: 4,
      },
    ],
    annotations: [
      {
        id: "ann-4",
        lyricLineId: "line-7",
        startIndex: 0,
        endIndex: 24,
        content:
          "Lennon challenges religious concepts to promote unity and peace among humanity.",
        author: "Peace Studies Scholar",
        createdAt: "2024-01-16T09:00:00Z",
      },
      {
        id: "ann-5",
        lyricLineId: "line-9",
        startIndex: 0,
        endIndex: 15,
        content: "Continues the theme of removing divisive religious concepts.",
        author: "Philosophy Professor",
        createdAt: "2024-01-16T09:30:00Z",
      },
    ],
  },
  {
    id: "3",
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    releaseDate: "1976-12-08",
    genre: "Rock",
    lyrics: [
      {
        id: "line-11",
        text: "On a dark desert highway",
        lineNumber: 1,
        annotations: ["ann-6"],
      },
      {
        id: "line-12",
        text: "Cool wind in my hair",
        lineNumber: 2,
      },
      {
        id: "line-13",
        text: "Warm smell of colitas",
        lineNumber: 3,
        annotations: ["ann-7"],
      },
      {
        id: "line-14",
        text: "Rising up through the air",
        lineNumber: 4,
      },
    ],
    annotations: [
      {
        id: "ann-6",
        lyricLineId: "line-11",
        startIndex: 0,
        endIndex: 23,
        content:
          "Sets the mysterious, isolated atmosphere that defines the song's narrative.",
        author: "Music Journalist",
        createdAt: "2024-01-17T14:00:00Z",
      },
      {
        id: "ann-7",
        lyricLineId: "line-13",
        startIndex: 0,
        endIndex: 21,
        content:
          '"Colitas" refers to the buds of the cannabis plant, hinting at the hedonistic lifestyle.',
        author: "Cultural Historian",
        createdAt: "2024-01-17T14:30:00Z",
      },
    ],
  },
  {
    id: "4",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
    releaseDate: "1971-11-08",
    genre: "Rock",
    lyrics: [
      {
        id: "line-15",
        text: "There's a lady who's sure",
        lineNumber: 1,
        annotations: ["ann-8"],
      },
      {
        id: "line-16",
        text: "All that glitters is gold",
        lineNumber: 2,
        annotations: ["ann-9"],
      },
      {
        id: "line-17",
        text: "And she's buying a stairway to heaven",
        lineNumber: 3,
        annotations: ["ann-10"],
      },
    ],
    annotations: [
      {
        id: "ann-8",
        lyricLineId: "line-15",
        startIndex: 0,
        endIndex: 22,
        content:
          "Introduces the central character - a materialistic woman seeking spiritual fulfillment.",
        author: "Rock Historian",
        createdAt: "2024-01-18T16:00:00Z",
      },
      {
        id: "ann-9",
        lyricLineId: "line-16",
        startIndex: 0,
        endIndex: 23,
        content:
          "Classic saying meaning not everything valuable-looking is actually valuable.",
        author: "Literature Teacher",
        createdAt: "2024-01-18T16:15:00Z",
      },
      {
        id: "ann-10",
        lyricLineId: "line-17",
        startIndex: 0,
        endIndex: 35,
        content:
          "Metaphor for trying to purchase salvation or spiritual enlightenment through material means.",
        author: "Theology Student",
        createdAt: "2024-01-18T16:30:00Z",
      },
    ],
  },
  {
    id: "5",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
    releaseDate: "1991-09-10",
    genre: "Grunge",
    lyrics: [
      {
        id: "line-18",
        text: "Load up on guns",
        lineNumber: 1,
        annotations: ["ann-11"],
      },
      {
        id: "line-19",
        text: "Bring your friends",
        lineNumber: 2,
      },
      {
        id: "line-20",
        text: "It's fun to lose and to pretend",
        lineNumber: 3,
        annotations: ["ann-12"],
      },
    ],
    annotations: [
      {
        id: "ann-11",
        lyricLineId: "line-18",
        startIndex: 0,
        endIndex: 13,
        content:
          "Not literal guns, but rather preparing for the intensity of youth culture and rebellion.",
        author: "Grunge Expert",
        createdAt: "2024-01-19T12:00:00Z",
      },
      {
        id: "ann-12",
        lyricLineId: "line-20",
        startIndex: 0,
        endIndex: 29,
        content:
          "Reflects the nihilistic attitude of Generation X and the performative nature of teenage rebellion.",
        author: "Cultural Critic",
        createdAt: "2024-01-19T12:30:00Z",
      },
    ],
  },
  {
    id: "6",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
    releaseDate: "1983-01-02",
    genre: "Pop",
    lyrics: [
      {
        id: "line-21",
        text: "Billie Jean is not my lover",
        lineNumber: 1,
        annotations: ["ann-13"],
      },
      {
        id: "line-22",
        text: "She's just a girl who claims that I am the one",
        lineNumber: 2,
        annotations: ["ann-14"],
      },
      {
        id: "line-23",
        text: "But the kid is not my son",
        lineNumber: 3,
        annotations: ["ann-15"],
      },
    ],
    annotations: [
      {
        id: "ann-13",
        lyricLineId: "line-21",
        startIndex: 0,
        endIndex: 25,
        content:
          "Direct denial of romantic involvement, setting up the song's defensive narrative.",
        author: "Pop Music Analyst",
        createdAt: "2024-01-20T10:00:00Z",
      },
      {
        id: "ann-14",
        lyricLineId: "line-22",
        startIndex: 0,
        endIndex: 43,
        content:
          "Describes the accusation of paternity that forms the song's central conflict.",
        author: "Music Journalist",
        createdAt: "2024-01-20T10:15:00Z",
      },
      {
        id: "ann-15",
        lyricLineId: "line-23",
        startIndex: 0,
        endIndex: 22,
        content:
          "The famous refrain denying paternity, inspired by Jackson's own experiences with false accusations.",
        author: "Biography Writer",
        createdAt: "2024-01-20T10:30:00Z",
      },
    ],
  },
];

// Helper function to get a song by ID
export const getSongById = (id: string): Song | undefined => {
  return mockSongs.find((song) => song.id === id);
};

// Helper function to get popular songs (for homepage)
export const getPopularSongs = (): Song[] => {
  return mockSongs;
};

// Async version for server-side data fetching
export const getPopularSongsAsync = async (): Promise<Song[]> => {
  // Simulate async data fetching (in real app, this would be a database call)
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSongs), 0);
  });
};

// Async version for getting song by ID
export const getSongByIdAsync = async (
  id: string
): Promise<Song | undefined> => {
  // Simulate async data fetching (in real app, this would be a database call)
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSongs.find((song) => song.id === id)), 0);
  });
};
