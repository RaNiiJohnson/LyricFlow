import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Music,
  Heart,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">
                Lyric<span className="text-primary">Flow</span>
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover the stories behind your favorite songs with interactive
              lyrics and meaningful annotations from music experts and fans.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-md hover:bg-muted/30"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-md hover:bg-muted/30"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-md hover:bg-muted/30"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-md hover:bg-muted/30"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Explore</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
              >
                Home
              </Link>
              <Link
                href="/songs"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
              >
                Songs
              </Link>
              <Link
                href="/artists"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
              >
                Artists
              </Link>
              <Link
                href="/albums"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
              >
                Albums
              </Link>
              <Link
                href="/genres"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
              >
                Genres
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
              >
                Help Center
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
              >
                Contact Us
              </Link>
              <Link
                href="#"
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-200 py-1"
              >
                API Documentation
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Contact & Community */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@lyricflow.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Global Community</span>
              </div>
              <div className="mt-4 p-3 bg-primary/10 rounded-md border border-primary/20">
                <p className="text-xs text-primary font-medium mb-1">
                  Join our community
                </p>
                <p className="text-xs text-muted-foreground">
                  Share your interpretations and discover new meanings in music
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 LyricFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary fill-current" />
            <span>for music lovers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
