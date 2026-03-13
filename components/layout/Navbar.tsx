"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="section-container flex items-center justify-between h-[74px]">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={cn(
                "font-serif text-xl font-bold transition-colors duration-300",
                isScrolled ? "text-primary" : "text-white"
              )}
            >
              Desa Wisata Mangli
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "text-base font-medium transition-colors duration-300 hover:text-accent",
                    isScrolled ? "text-primary" : "text-white"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button href="/booking" size="sm" variant={isScrolled ? "primary" : "outline"} className={cn(!isScrolled && "border-white text-white hover:bg-white hover:text-primary")}>
              Pesan Sekarang
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "lg:hidden p-2 transition-colors duration-300",
              isScrolled ? "text-primary" : "text-white"
            )}
            aria-label="Buka menu"
          >
            <Menu size={28} />
          </button>
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
