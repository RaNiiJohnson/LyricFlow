"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, Music } from "lucide-react";
import { Button } from "../src/components/ui/button";
import { Input } from "../src/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../src/components/ui/sheet";
import { mockSongs } from "../data/mockSongs";
import { Song } from "../src/lib/types/song";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = mockSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase()) ||
          song.album?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/artists", label: "Artists" },
    { href: "/albums", label: "Albums" },
    { href: "/genres", label: "Genres" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border ${className}`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <Music className="h-8 w-8 text-accent-gold" />
          <span className="text-xl font-bold text-foreground">
            Genius<span className="text-accent-gold">Clone</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex relative flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="pl-10 bg-muted/50 border-border focus:border-accent-gold transition-colors"
            />
          </div>

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
              {searchResults.slice(0, 5).map((song) => (
                <Link
                  key={song.id}
                  href={`/songs/${song.id}`}
                  className="block px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                  onClick={() => {
                    setShowResults(false);
                    setSearchQuery("");
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                      <Music className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {song.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {song.artist}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              {searchResults.length > 5 && (
                <div className="px-4 py-2 text-sm text-muted-foreground text-center border-t border-border">
                  +{searchResults.length - 5} more results
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <Music className="h-6 w-6 text-accent-gold" />
                  <span>
                    Genius<span className="text-accent-gold">Clone</span>
                  </span>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Search */}
              <div className="mt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search songs, artists..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 bg-muted/50 border-border focus:border-accent-gold transition-colors"
                  />
                </div>

                {/* Mobile Search Results */}
                {showResults && searchResults.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {searchResults.slice(0, 3).map((song) => (
                      <Link
                        key={song.id}
                        href={`/songs/${song.id}`}
                        className="block p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          setShowResults(false);
                          setSearchQuery("");
                        }}
                      >
                        <p className="font-medium text-foreground">
                          {song.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {song.artist}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Navigation */}
              <nav className="mt-8 space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
