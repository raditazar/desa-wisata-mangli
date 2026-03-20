import { create } from "zustand";
import type { BookingStep, PackageType, BookingDates, PersonalData } from "@/lib/types";
import { TOUR_PACKAGES } from "@/lib/constants";

const initialPersonalData: PersonalData = {
  firstName: "",
  lastName: "",
  country: "ID",
  phone: "",
  age: "",
  email: "",
  confirmEmail: "",
};

interface BookingStore {
  currentStep: BookingStep;
  /** Legacy single-package field – kept for backward compat with later steps */
  selectedPackage: PackageType | null;
  /** Per-package date state */
  packageDates: Partial<Record<PackageType, BookingDates>>;
  /** Legacy single booking dates (still used by later steps) */
  dates: BookingDates;
  tickets: number;
  ticketSelections: Record<string, number>;
  personalData: PersonalData;
  isConfirmed: boolean;
  bookingRef: string;
  direction: number;

  setStep: (step: BookingStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  selectPackage: (pkg: PackageType) => void;
  setDates: (dates: BookingDates) => void;
  setPackageDates: (pkg: PackageType, dates: BookingDates) => void;
  setTickets: (count: number) => void;
  setTicketQty: (ticketId: string, qty: number) => void;
  totalTickets: () => number;
  setPersonalData: (data: Partial<PersonalData>) => void;
  calculateTotal: () => number;
  confirm: () => void;
  reset: () => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  currentStep: 1,
  selectedPackage: null,
  packageDates: {},
  dates: {},
  tickets: 1,
  ticketSelections: {},
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

  selectPackage: (pkg) => set({ selectedPackage: pkg }),

  setDates: (dates) => set({ dates }),

  setPackageDates: (pkg, dates) =>
    set((state) => ({
      packageDates: { ...state.packageDates, [pkg]: dates },
    })),

  setTickets: (count) => set({ tickets: Math.max(1, count) }),

  setTicketQty: (ticketId, qty) =>
    set((state) => {
      const updated = { ...state.ticketSelections };
      if (qty <= 0) {
        delete updated[ticketId];
      } else {
        updated[ticketId] = qty;
      }
      return { ticketSelections: updated };
    }),

  totalTickets: () => {
    const { ticketSelections } = get();
    return Object.values(ticketSelections).reduce((sum, qty) => sum + qty, 0);
  },

  setPersonalData: (data) =>
    set((state) => ({
      personalData: { ...state.personalData, ...data },
    })),

  calculateTotal: () => {
    const { ticketSelections, packageDates } = get();
    let total = 0;

    for (const pkg of TOUR_PACKAGES) {
      if (!pkg.isAvailable) continue;
      const pkgDates = packageDates[pkg.id] ?? {};

      let nights = 1;
      if (pkg.dateType === "range" && pkgDates.checkIn && pkgDates.checkOut) {
        nights = Math.max(
          1,
          Math.ceil(
            (pkgDates.checkOut.getTime() - pkgDates.checkIn.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        );
      }

      for (const group of pkg.ticketGroups) {
        for (const item of group.items) {
          const qty = ticketSelections[item.id] ?? 0;
          const unitCost = pkg.dateType === "range" ? item.price * nights : item.price;
          total += qty * unitCost;
        }
      }
    }

    return total;
  },

  confirm: () =>
    set({
      isConfirmed: true,
      bookingRef: `MGL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    }),

  reset: () =>
    set({
      currentStep: 1,
      selectedPackage: null,
      packageDates: {},
      dates: {},
      tickets: 1,
      ticketSelections: {},
      personalData: initialPersonalData,
      isConfirmed: false,
      bookingRef: "",
      direction: 1,
    }),
}));
