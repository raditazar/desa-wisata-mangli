"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import type { NavLink } from "@/lib/types";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Scroll-based active section detection — default to #hero when no section visible
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));
    let latestActive = "#hero";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            latestActive = `#${entry.target.id}`;
            setActiveSection(latestActive);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    const hasSections = sectionIds.some((id) => {
      const el = document.getElementById(id);
      if (el) { observer.observe(el); return true; }
      return false;
    });

    // If no sections found on this page (e.g. /booking), keep default active
    if (!hasSections) setActiveSection("#hero");

    return () => observer.disconnect();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (link: NavLink) => {
    if (link.hasDropdown && link.children) {
      return link.children.some((child) => activeSection === child.href) || activeSection === link.href;
    }
    return activeSection === link.href;
  };

  return (
    <>
      <header className="relative z-50 bg-background">
        <nav className="section-container flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-[#1a2517] lowercase">
              mangli
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li
                key={link.href}
                ref={link.hasDropdown ? dropdownRef : undefined}
                className="relative"
              >
                {link.hasDropdown ? (
                  /* Dropdown trigger */
                  <>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`group relative flex items-center gap-1 text-base font-medium transition-all duration-300 py-2 cursor-pointer ${
                        isActive(link)
                          ? "text-[#1a2517]"
                          : "text-[#1a2517]/40 hover:text-[#1a2517]/70"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                      {/* Active dot indicator */}
                      {isActive(link) && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#acc8a2]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Dropdown menu */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#acc8a2]/20 overflow-hidden"
                        >
                          {link.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setDropdownOpen(false)}
                              className="block px-5 py-3.5 text-sm font-medium text-[#1a2517]/60 hover:bg-[#acc8a2]/10 hover:text-[#1a2517] transition-all duration-200"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  /* Regular nav link */
                  <a
                    href={link.href}
                    className={`group relative text-base font-medium transition-all duration-300 py-2 ${
                      isActive(link)
                        ? "text-[#1a2517]"
                        : "text-[#1a2517]/40 hover:text-[#1a2517]/70"
                    }`}
                  >
                    {link.label}
                    {/* Active dot indicator */}
                    {isActive(link) && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#acc8a2]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA — Beli Tiket */}
          <div className="hidden lg:block">
            <Link
              href="/booking"
              className="group relative inline-flex items-center justify-center h-12 px-9 text-base font-semibold rounded-full bg-[#1a2517] text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_28px_rgba(172,200,162,0.55)] hover:scale-105"
            >
              <span className="relative z-10">Beli Tiket</span>
              {/* Hover glow background */}
              <span className="absolute inset-0 bg-[#acc8a2]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#1a2517]"
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
