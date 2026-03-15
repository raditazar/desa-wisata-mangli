import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const titillium = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Desa Wisata Mangli - Jelajahi Keindahan Alam dan Budaya Desa",
  description:
    "Nikmati pengalaman wisata autentik di Desa Mangli. Tinggal bersama warga, belajar berkebun, dan rasakan kehidupan desa yang sesungguhnya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${titillium.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
