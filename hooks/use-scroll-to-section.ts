"use client";

import { useCallback } from "react";

export function useScrollToSection() {
  const scrollTo = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 74;
      const top =
        element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return { scrollTo };
}
