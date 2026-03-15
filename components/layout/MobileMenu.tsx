"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);

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
          <div className="flex items-center justify-between h-20 px-4">
            <span className="text-xl font-bold text-[#1a2517] lowercase tracking-tight">
              mangli
            </span>
            <button
              onClick={onClose}
              className="p-2 text-[#1a2517]"
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
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setExpandedDropdown(
                            expandedDropdown === link.href ? null : link.href
                          )
                        }
                        className="flex items-center gap-2 text-2xl font-medium text-[#1a2517] transition-colors cursor-pointer"
                      >
                        {link.label}
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ${
                            expandedDropdown === link.href ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedDropdown === link.href && link.children && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden ml-4 mt-3 space-y-3"
                          >
                            {link.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="text-lg text-[#1a2517]/60 hover:text-[#1a2517] transition-colors"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      onClick={onClose}
                      className="text-2xl font-medium text-[#1a2517] hover:text-[#acc8a2] transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="px-6 pb-8">
            <Link
              href="/booking"
              onClick={onClose}
              className="flex items-center justify-center w-full h-14 rounded-full bg-[#1a2517] text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg"
            >
              Beli Tiket
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
