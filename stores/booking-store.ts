import { create } from "zustand";
import type { BookingStep, PackageType, BookingDates, PersonalData } from "@/lib/types";
import { TOUR_PACKAGES } from "@/lib/constants";

const initialPersonalData: PersonalData = {
  fullName: "",
  email: "",
  phone: "",
  institution: "",
  specialRequests: "",
  numberOfAdults: 1,
  numberOfChildren: 0,
};

interface BookingStore {
  currentStep: BookingStep;
  selectedPackage: PackageType | null;
  dates: BookingDates;
  tickets: number;
  personalData: PersonalData;
  isConfirmed: boolean;
  bookingRef: string;
  direction: number;

  setStep: (step: BookingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  selectPackage: (pkg: PackageType) => void;
  setDates: (dates: BookingDates) => void;
  setTickets: (count: number) => void;
  setPersonalData: (data: Partial<PersonalData>) => void;
  calculateTotal: () => number;
  confirm: () => void;
  reset: () => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  currentStep: 1,
  selectedPackage: null,
  dates: {},
  tickets: 1,
  personalData: initialPersonalData,
  isConfirmed: false,
  bookingRef: "",
  direction: 1,

  setStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 3) as BookingStep,
      direction: 1,
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1) as BookingStep,
      direction: -1,
    })),

  selectPackage: (pkg) => set({ selectedPackage: pkg, dates: {} }),

  setDates: (dates) => set({ dates }),

  setTickets: (count) => set({ tickets: Math.max(1, count) }),

  setPersonalData: (data) =>
    set((state) => ({
      personalData: { ...state.personalData, ...data },
    })),

  calculateTotal: () => {
    const { selectedPackage, tickets, dates } = get();
    const pkg = TOUR_PACKAGES.find((p) => p.id === selectedPackage);
    if (!pkg) return 0;

    if (pkg.dateType === "range" && dates.checkIn && dates.checkOut) {
      const nights = Math.ceil(
        (dates.checkOut.getTime() - dates.checkIn.getTime()) / (1000 * 60 * 60 * 24)
      );
      return pkg.price * tickets * Math.max(1, nights);
    }

    return pkg.price * tickets;
  },

  confirm: () => set({
    isConfirmed: true,
    bookingRef: `MGL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
  }),

  reset: () =>
    set({
      currentStep: 1,
      selectedPackage: null,
      dates: {},
      tickets: 1,
      personalData: initialPersonalData,
      isConfirmed: false,
      bookingRef: "",
      direction: 1,
    }),
}));
