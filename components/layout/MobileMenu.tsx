"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[60] bg-white flex flex-col"
        >
          <div className="flex items-center justify-between h-[74px] px-6">
            <span className="font-serif text-xl font-bold text-primary">
              Desa Wisata Mangli
            </span>
            <button
              onClick={onClose}
              className="p-2 text-primary"
              aria-label="Tutup menu"
            >
              <X size={28} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-6">
            <ul className="space-y-6">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="text-2xl font-medium text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="px-6 pb-8">
            <Button href="/booking" size="lg" className="w-full" onClick={onClose}>
              Pesan Sekarang
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
