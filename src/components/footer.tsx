import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
              RapGasy Hub
            </h3>
            <p className="text-muted-foreground text-sm">
              La plateforme centrale de la scène rap malgache. Découvrez,
              écoutez et vivez la culture rap de Madagascar.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold">Navigation</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/events"
                className="block text-muted-foreground hover:text-primary transition"
              >
                Événements
              </Link>
              <Link
                href="/music"
                className="block text-muted-foreground hover:text-primary transition"
              >
                Bibliothèque Musicale
              </Link>
              <Link
                href="/artists"
                className="block text-muted-foreground hover:text-primary transition"
              >
                Artistes
              </Link>
              <Link
                href="/community"
                className="block text-muted-foreground hover:text-primary transition"
              >
                Communauté
              </Link>
              <Link
                href="/store"
                className="block text-muted-foreground hover:text-primary transition"
              >
                Boutique
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary transition"
              >
                Centre d'aide
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary transition"
              >
                Conditions d'utilisation
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary transition"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Antananarivo, Madagascar</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@rapgasyhub.mg</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+261 34 12 345 67</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 RapGasy Hub. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground">
            Fait avec ❤️ pour la scène rap malgache
          </p>
        </div>
      </div>
    </footer>
  );
}
