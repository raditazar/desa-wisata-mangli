import type {
  NavLink,
  TourPackage,
  Testimonial,
  FaqItem,
  GalleryItem,
  VisitStep,
} from "./types";

export const SITE_CONFIG = {
  name: "Desa Wisata Mangli",
  tagline: "Jelajahi Keindahan Alam dan Budaya Desa",
  description:
    "Nikmati pengalaman wisata autentik di Desa Mangli. Tinggal bersama warga, belajar berkebun, dan rasakan kehidupan desa yang sesungguhnya.",
  address: "Desa Mangli, Kecamatan Mangli, Kabupaten Magelang, Jawa Tengah",
  phone: "+62 812-3456-7890",
  email: "info@desawisatamangli.id",
  instagram: "https://instagram.com/desawisatamangli",
  youtube: "https://youtube.com/@desawisatamangli",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "#hero" },
  {
    label: "Paket Wisata",
    href: "#packages",
    hasDropdown: true,
    children: [
      { label: "Live-In", href: "/booking?package=live-in" },
      { label: "Edukasi Berkebun", href: "/booking?package=edukasi-berkebun" },
    ],
  },
  { label: "Galeri", href: "#gallery" },
  { label: "Visit", href: "#visit" },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "live-in",
    name: "Live-In",
    tagline: "Tinggal & Rasakan Kehidupan Desa",
    description:
      "Menginap di rumah warga dan merasakan kehidupan desa yang autentik. Ikut serta dalam kegiatan harian, masak bersama, dan nikmati keramahan warga desa.",
    price: 250000,
    priceUnit: "per malam / orang",
    image: "/images/packages/live-in.jpg",
    features: [
      "Menginap di rumah warga",
      "Makan 3x sehari masakan lokal",
      "Kegiatan budaya & tradisional",
      "Tur desa berpemandu",
      "Perlengkapan tidur lengkap",
    ],
    dateType: "range",
    isAvailable: true,
    maxTickets: 20,
  },
  {
    id: "edukasi-berkebun",
    name: "Edukasi Berkebun",
    tagline: "Belajar Langsung dari Petani",
    description:
      "Program edukasi interaktif langsung di kebun warga. Pelajari teknik bercocok tanam organik, panen hasil kebun, dan bawa pulang hasil panenmu.",
    price: 75000,
    priceUnit: "per orang",
    image: "/images/packages/edukasi-berkebun.jpg",
    features: [
      "Praktik menanam & merawat tanaman",
      "Panen sayur & buah segar",
      "Belajar kompos & pupuk organik",
      "Snack & minuman tradisional",
      "Sertifikat partisipasi",
    ],
    dateType: "single",
    isAvailable: true,
    maxTickets: 50,
  },
  {
    id: "coming-soon",
    name: "Paket Spesial",
    tagline: "Segera Hadir",
    description:
      "Kami sedang menyiapkan paket wisata baru yang lebih seru. Nantikan pengalaman wisata desa yang belum pernah ada sebelumnya!",
    price: 0,
    priceUnit: "",
    image: "/images/packages/coming-soon.svg",
    features: [],
    dateType: "none",
    isAvailable: false,
    maxTickets: 0,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Rina Wulandari",
    role: "Guru SD Negeri 3 Semarang",
    content:
      "Pengalaman yang luar biasa untuk murid-murid kami. Mereka belajar banyak tentang alam dan kehidupan desa. Program edukasi berkebunnya sangat interaktif!",
    avatar: "/images/testimoni/person-1.svg",
    rating: 5,
  },
  {
    id: "2",
    name: "Budi Santoso",
    role: "Traveler & Content Creator",
    content:
      "Live-in di Desa Mangli adalah pengalaman yang tidak akan saya lupakan. Warganya ramah, makanannya enak, dan pemandangannya indah sekali.",
    avatar: "/images/testimoni/person-2.svg",
    rating: 5,
  },
  {
    id: "3",
    name: "Ayu Pertiwi",
    role: "Mahasiswa Universitas Gadjah Mada",
    content:
      "Cocok banget untuk refreshing dari rutinitas kampus. Belajar berkebun sambil menikmati udara segar pegunungan. Pasti akan kembali lagi!",
    avatar: "/images/testimoni/person-3.svg",
    rating: 5,
  },
  {
    id: "4",
    name: "Hendra Wijaya",
    role: "Fotografer Profesional",
    content:
      "Spot foto di Desa Mangli sangat memukau. Sawah terasering, kebun, dan rumah-rumah tradisional jadi objek foto yang sempurna. Sangat direkomendasikan!",
    avatar: "/images/testimoni/person-4.svg",
    rating: 4,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    question: "Bagaimana cara melakukan reservasi?",
    answer:
      "Anda dapat melakukan reservasi langsung melalui website kami dengan memilih paket wisata, tanggal kunjungan, dan mengisi data diri. Pembayaran dapat dilakukan secara online melalui berbagai metode pembayaran.",
  },
  {
    id: "2",
    question: "Apakah bisa membatalkan atau mengubah jadwal reservasi?",
    answer:
      "Pembatalan atau perubahan jadwal dapat dilakukan maksimal 3 hari sebelum tanggal kunjungan. Silakan hubungi kami melalui WhatsApp atau email untuk proses pembatalan.",
  },
  {
    id: "3",
    question: "Apa yang perlu dibawa saat berkunjung?",
    answer:
      "Untuk paket Live-In, bawa pakaian ganti secukupnya, perlengkapan mandi pribadi, dan obat-obatan pribadi jika diperlukan. Untuk Edukasi Berkebun, gunakan pakaian yang nyaman dan sepatu tertutup. Kami menyediakan peralatan berkebun.",
  },
  {
    id: "4",
    question: "Apakah tersedia fasilitas untuk rombongan?",
    answer:
      "Ya, kami menerima kunjungan rombongan dari sekolah, komunitas, maupun perusahaan. Untuk rombongan lebih dari 20 orang, silakan hubungi kami untuk penawaran khusus dan penyesuaian program.",
  },
  {
    id: "5",
    question: "Bagaimana akses menuju Desa Mangli?",
    answer:
      "Desa Mangli dapat diakses dengan kendaraan pribadi maupun transportasi umum. Dari pusat Kota Magelang, perjalanan memakan waktu sekitar 30 menit. Kami juga menyediakan layanan penjemputan dari titik kumpul tertentu untuk rombongan.",
  },
  {
    id: "6",
    question: "Apakah aman untuk anak-anak?",
    answer:
      "Sangat aman. Seluruh kegiatan dirancang dengan memperhatikan keselamatan, termasuk untuk anak-anak. Tim pemandu kami berpengalaman mendampingi wisatawan dari berbagai usia. Anak di bawah 5 tahun gratis untuk semua paket.",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "1", src: "/images/gallery/gallery-1.jpg", alt: "Pemandangan sawah terasering", caption: "Sawah Terasering" },
  { id: "2", src: "/images/gallery/gallery-2.jpg", alt: "Kegiatan berkebun bersama", caption: "Edukasi Berkebun" },
  { id: "3", src: "/images/gallery/gallery-3.jpg", alt: "Rumah tradisional desa", caption: "Rumah Tradisional" },
  { id: "4", src: "/images/gallery/gallery-4.jpg", alt: "Anak-anak bermain di desa", caption: "Aktivitas Anak" },
  { id: "5", src: "/images/gallery/gallery-5.jpg", alt: "Masak bersama warga", caption: "Kuliner Lokal" },
  { id: "8", src: "/images/gallery/gallery-8.svg", alt: "Jalan setapak di kebun teh", caption: "Kebun Teh" },
];

export const VISIT_STEPS: VisitStep[] = [
  {
    stepNumber: 1,
    title: "Pilih Paket",
    description: "Jelajahi pilihan paket wisata kami dan pilih yang paling sesuai dengan keinginan Anda.",
  },
  {
    stepNumber: 2,
    title: "Isi Data & Booking",
    description: "Lengkapi data diri dan tentukan tanggal kunjungan. Proses booking mudah dan cepat.",
  },
  {
    stepNumber: 3,
    title: "Konfirmasi Pembayaran",
    description: "Lakukan pembayaran melalui metode yang tersedia. Anda akan mendapat konfirmasi via email.",
  },
  {
    stepNumber: 4,
    title: "Datang & Nikmati",
    description: "Datang ke Desa Mangli di tanggal yang dipilih dan nikmati pengalaman wisata yang tak terlupakan!",
  },
];
