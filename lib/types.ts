export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  children?: NavLink[];
}

export type PackageType = "live-in" | "edukasi-berkebun" | "coming-soon";

export interface TicketItem {
  id: string;
  label: string;
  description: string;
  price: number;
  priceUnit: string;
  features: string[];
  minAge?: number;
  maxAge?: number;
  maxQty: number;
}

export interface TicketGroup {
  groupLabel: string;
  items: TicketItem[];
}

export interface TourPackage {
  id: PackageType;
  name: string;
  tagline: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
  features: string[];
  dateType: "range" | "single" | "none";
  isAvailable: boolean;
  maxTickets: number;
  ticketGroups: TicketGroup[];
}

export type BookingStep = 1 | 2 | 3;

export interface BookingDates {
  checkIn?: Date;
  checkOut?: Date;
  visitDate?: Date;
}

export interface PersonalData {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  age: string;
  email: string;
  confirmEmail: string;
}

export interface BookingState {
  currentStep: BookingStep;
  selectedPackage: PackageType | null;
  dates: BookingDates;
  tickets: number;
  ticketSelections: Record<string, number>;
  personalData: PersonalData;
  isConfirmed: boolean;
  direction: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface VisitStep {
  stepNumber: number;
  title: string;
  description: string;
}
