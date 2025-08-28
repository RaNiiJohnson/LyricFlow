# Database Setup & Seeding

## Setup

1. Make sure your `.env` file has the correct `DATABASE_URL`
2. Run migrations to create the database schema:
   ```bash
   npx prisma migrate dev
   ```

## Seeding

To populate your database with sample data:

```bash
npx prisma db seed
```

## What the seed creates:

### Users

- 2 sample users (John Doe, Jane Smith)

### Artists

- **KATSEYE** - Global girl group
- **Queen** - British rock legends
- **John Lennon** - Beatles member
- **Eagles** - American rock band
- **Michael Jackson** - King of Pop
- **Kevs** - Rising R&B artist

### Albums

- SIS (Soft Is Strong) - KATSEYE
- A Night at the Opera - Queen
- Imagine - John Lennon
- Hotel California - Eagles
- Thriller - Michael Jackson
- FEAR - Kevs

### Songs

- Golden - KATSEYE
- Bohemian Rhapsody - Queen
- Imagine - John Lennon
- Hotel California - Eagles
- Billie Jean - Michael Jackson
- POWER - Kevs

### Additional Data

- **Lyrics** for songs (structured by sections)
- **Annotations** with community voting
- **Playlists** (My Favorites, Rock Classics)
- **User favorites** and playlist songs

## Reset Database

To completely reset and reseed:

```bash
npx prisma migrate reset
```

This will:

1. Drop the database
2. Recreate it
3. Run all migrations
4. Run the seed automatically

## Generate Prisma Client

After schema changes:

```bash
npx prisma generate
```
