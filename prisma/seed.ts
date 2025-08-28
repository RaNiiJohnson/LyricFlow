import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clean existing data
  await prisma.annotation.deleteMany();
  await prisma.lyric.deleteMany();
  await prisma.playlistSong.deleteMany();
  await prisma.userFavoriteSong.deleteMany();
  await prisma.playlist.deleteMany();
  await prisma.song.deleteMany();
  await prisma.album.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Cleaned existing data");

  // Create users
  const user1 = await prisma.user.create({
    data: {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane@example.com",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log("👥 Created users");

  // Create artists
  const katseye = await prisma.artist.create({
    data: {
      id: "artist-1",
      name: "KATSEYE",
      bio: 'KATSEYE is a global girl group formed through the reality competition show "The Debut: Dream Academy". The group consists of six members from different countries, representing a new era of international collaboration.',
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
      verified: true,
    },
  });

  const queen = await prisma.artist.create({
    data: {
      id: "artist-2",
      name: "Queen",
      bio: "Queen are a British rock band formed in London in 1970. Their classic line-up was Freddie Mercury, Brian May, Roger Taylor and John Deacon.",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
      verified: true,
    },
  });

  const johnLennon = await prisma.artist.create({
    data: {
      id: "artist-3",
      name: "John Lennon",
      bio: "John Winston Ono Lennon was an English singer, songwriter, musician and peace activist who achieved worldwide fame as founder, co-songwriter, co-lead vocalist and rhythm guitarist of the Beatles.",
      imageUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
      verified: true,
    },
  });

  const eagles = await prisma.artist.create({
    data: {
      id: "artist-4",
      name: "Eagles",
      bio: "The Eagles are an American rock band formed in Los Angeles in 1971. With five number-one singles and six number-one albums, they were one of the most successful musical acts of the 1970s.",
      imageUrl:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop",
      verified: true,
    },
  });

  const michaelJackson = await prisma.artist.create({
    data: {
      id: "artist-5",
      name: "Michael Jackson",
      bio: 'Michael Joseph Jackson was an American singer, songwriter, and dancer. Dubbed the "King of Pop", he is regarded as one of the most significant cultural figures of the 20th century.',
      imageUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop",
      verified: true,
    },
  });

  const kevs = await prisma.artist.create({
    data: {
      id: "artist-6",
      name: "Kevs",
      bio: "Rising R&B artist known for powerful vocals and introspective lyrics.",
      imageUrl: "/images/kevs.png",
      verified: false,
    },
  });

  console.log("🎤 Created artists");

  // Create albums
  const sisAlbum = await prisma.album.create({
    data: {
      id: "album-1",
      title: "SIS (Soft Is Strong)",
      coverUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      releaseDate: new Date("2024-08-16"),
      artistId: katseye.id,
    },
  });

  const nightAtOpera = await prisma.album.create({
    data: {
      id: "album-2",
      title: "A Night at the Opera",
      coverUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
      releaseDate: new Date("1975-10-31"),
      artistId: queen.id,
    },
  });

  const imagineAlbum = await prisma.album.create({
    data: {
      id: "album-3",
      title: "Imagine",
      coverUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
      releaseDate: new Date("1971-09-09"),
      artistId: johnLennon.id,
    },
  });

  const hotelCaliforniaAlbum = await prisma.album.create({
    data: {
      id: "album-4",
      title: "Hotel California",
      coverUrl:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      releaseDate: new Date("1976-12-08"),
      artistId: eagles.id,
    },
  });

  const thrillerAlbum = await prisma.album.create({
    data: {
      id: "album-5",
      title: "Thriller",
      coverUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
      releaseDate: new Date("1983-01-02"),
      artistId: michaelJackson.id,
    },
  });

  const fearAlbum = await prisma.album.create({
    data: {
      id: "album-6",
      title: "FEAR",
      coverUrl: "/images/kevs.png",
      releaseDate: new Date("2025-07-31"),
      artistId: kevs.id,
    },
  });

  console.log("💿 Created albums");

  // Create songs
  const goldenSong = await prisma.song.create({
    data: {
      id: "1",
      title: "Golden",
      duration: 210, // 3:30 in seconds
      thumbnailUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      releaseDate: new Date("2024-08-16"),
      genre: "Pop",
      youtubeId: "dQw4w9WgXcQ", // Example YouTube ID
      artistId: katseye.id,
      albumId: sisAlbum.id,
    },
  });

  const bohemianRhapsody = await prisma.song.create({
    data: {
      id: "2",
      title: "Bohemian Rhapsody",
      duration: 355, // 5:55 in seconds
      thumbnailUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
      releaseDate: new Date("1975-10-31"),
      genre: "Rock",
      youtubeId: "fJ9rUzIMcZQ",
      artistId: queen.id,
      albumId: nightAtOpera.id,
    },
  });

  const imagine = await prisma.song.create({
    data: {
      id: "22",
      title: "Imagine",
      duration: 183, // 3:03 in seconds
      thumbnailUrl:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
      releaseDate: new Date("1971-09-09"),
      genre: "Rock",
      youtubeId: "YkgkThdzX-8",
      artistId: johnLennon.id,
      albumId: imagineAlbum.id,
    },
  });

  const hotelCalifornia = await prisma.song.create({
    data: {
      id: "3",
      title: "Hotel California",
      duration: 391, // 6:31 in seconds
      thumbnailUrl:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      releaseDate: new Date("1976-12-08"),
      genre: "Rock",
      youtubeId: "09839DpTctU",
      artistId: eagles.id,
      albumId: hotelCaliforniaAlbum.id,
    },
  });

  const billieJean = await prisma.song.create({
    data: {
      id: "6",
      title: "Billie Jean",
      duration: 294, // 4:54 in seconds
      thumbnailUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
      releaseDate: new Date("1983-01-02"),
      genre: "Pop",
      youtubeId: "Zi_XLOBDo_Y",
      artistId: michaelJackson.id,
      albumId: thrillerAlbum.id,
    },
  });

  const powerSong = await prisma.song.create({
    data: {
      id: "70",
      title: "POWER",
      duration: 240, // 4:00 in seconds
      thumbnailUrl: "/images/kevs.png",
      releaseDate: new Date("2025-07-31"),
      genre: "R&B",
      youtubeId: "example123",
      artistId: kevs.id,
      albumId: fearAlbum.id,
    },
  });

  console.log("🎵 Created songs");

  // Create lyrics for Golden song
  await prisma.lyric.createMany({
    data: [
      {
        songId: goldenSong.id,
        content: "Verse 1: Rumi, Zoey, Mira, All",
        section: "verse",
        order: 1,
      },
      {
        songId: goldenSong.id,
        content: "I was a ghost, I was alone",
        section: "verse",
        order: 2,
      },
      {
        songId: goldenSong.id,
        content: "Eoduwojin apgilsoge (Hah)",
        section: "verse",
        order: 3,
      },
      {
        songId: goldenSong.id,
        content: "Given the throne, I didn't know how to believe (Hah)",
        section: "verse",
        order: 4,
      },
      {
        songId: goldenSong.id,
        content: "Pre-Chorus: Rumi, All",
        section: "pre-chorus",
        order: 5,
      },
      {
        songId: goldenSong.id,
        content: "I'm done hidin', now I'm shinin'",
        section: "pre-chorus",
        order: 6,
      },
      {
        songId: goldenSong.id,
        content: "Like I'm born to be",
        section: "pre-chorus",
        order: 7,
      },
      {
        songId: goldenSong.id,
        content: "Chorus: Rumi, All",
        section: "chorus",
        order: 8,
      },
      {
        songId: goldenSong.id,
        content: "We're goin' up, up, up",
        section: "chorus",
        order: 9,
      },
      {
        songId: goldenSong.id,
        content: "It's our moment",
        section: "chorus",
        order: 10,
      },
      {
        songId: goldenSong.id,
        content: "Gonna be, gonna be golden",
        section: "chorus",
        order: 11,
      },
    ],
  });

  // Create lyrics for POWER song
  await prisma.lyric.createMany({
    data: [
      {
        songId: powerSong.id,
        content: "Refrain",
        section: "refrain",
        order: 1,
      },
      {
        songId: powerSong.id,
        content: "I Got that power mahatonga anao lasa saina",
        section: "refrain",
        order: 2,
      },
      {
        songId: powerSong.id,
        content: "Ny olona mora miova iriko ianao mba tsy ho anisany",
        section: "refrain",
        order: 3,
      },
      {
        songId: powerSong.id,
        content: "Couplet 1",
        section: "verse",
        order: 4,
      },
      {
        songId: powerSong.id,
        content: "Izay napitambatra no manasaraka antsika tsy hiray ihany",
        section: "verse",
        order: 5,
      },
    ],
  });

  console.log("📝 Created lyrics");

  // Create annotations
  await prisma.annotation.create({
    data: {
      songId: goldenSong.id,
      content:
        "The opening line establishes the protagonist's past state of isolation and invisibility.",
      startIndex: 0,
      endIndex: 29,
      verified: true,
      upvotes: 15,
      downvotes: 2,
    },
  });

  await prisma.annotation.create({
    data: {
      songId: goldenSong.id,
      content:
        'The repetitive "up, up, up" emphasizes the ascending journey and momentum of growth.',
      startIndex: 0,
      endIndex: 21,
      verified: true,
      upvotes: 23,
      downvotes: 1,
    },
  });

  await prisma.annotation.create({
    data: {
      songId: powerSong.id,
      content:
        "This line showcases the artist's confidence and inner strength.",
      startIndex: 0,
      endIndex: 40,
      verified: false,
      upvotes: 8,
      downvotes: 0,
    },
  });

  console.log("📖 Created annotations");

  // Create playlists
  const playlist1 = await prisma.playlist.create({
    data: {
      name: "My Favorites",
      description: "Collection of my all-time favorite songs",
      isPublic: true,
      userId: user1.id,
    },
  });

  const playlist2 = await prisma.playlist.create({
    data: {
      name: "Rock Classics",
      description: "The best rock songs ever made",
      isPublic: true,
      userId: user2.id,
    },
  });

  console.log("📋 Created playlists");

  // Add songs to playlists
  await prisma.playlistSong.createMany({
    data: [
      {
        playlistId: playlist1.id,
        songId: goldenSong.id,
        order: 1,
      },
      {
        playlistId: playlist1.id,
        songId: powerSong.id,
        order: 2,
      },
      {
        playlistId: playlist1.id,
        songId: billieJean.id,
        order: 3,
      },
      {
        playlistId: playlist2.id,
        songId: bohemianRhapsody.id,
        order: 1,
      },
      {
        playlistId: playlist2.id,
        songId: hotelCalifornia.id,
        order: 2,
      },
      {
        playlistId: playlist2.id,
        songId: imagine.id,
        order: 3,
      },
    ],
  });

  console.log("🎶 Added songs to playlists");

  // Create user favorites
  await prisma.userFavoriteSong.createMany({
    data: [
      {
        userId: user1.id,
        songId: goldenSong.id,
      },
      {
        userId: user1.id,
        songId: bohemianRhapsody.id,
      },
      {
        userId: user2.id,
        songId: powerSong.id,
      },
      {
        userId: user2.id,
        songId: imagine.id,
      },
    ],
  });

  console.log("❤️ Created user favorites");

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
