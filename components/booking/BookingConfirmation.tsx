"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useBookingStore } from "@/stores/booking-store";
import { TOUR_PACKAGES } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function BookingConfirmation() {
  const { selectedPackage, dates, tickets, personalData, calculateTotal, reset, bookingRef } =
    useBookingStore();

  const pkg = TOUR_PACKAGES.find((p) => p.id === selectedPackage);
  const total = calculateTotal();

  if (!pkg) return null;

  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        <CheckCircle size={80} className="mx-auto text-green-500" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h2 className="font-serif text-3xl font-bold text-primary mt-6">
          Booking Berhasil!
        </h2>
        <p className="text-muted mt-2">
          Terima kasih, {personalData.fullName}. Booking Anda telah dikonfirmasi.
        </p>

        <div className="mt-8 bg-white rounded-2xl border border-surface-dark p-6 max-w-md mx-auto text-left space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">No. Booking</span>
            <span className="font-bold font-mono text-primary">{bookingRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Paket</span>
            <span className="font-medium">{pkg.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Tanggal</span>
            <span className="font-medium">
              {pkg.dateType === "range" && dates.checkIn
                ? `${formatDate(dates.checkIn)} — ${dates.checkOut ? formatDate(dates.checkOut) : ""}`
                : dates.visitDate
                ? formatDate(dates.visitDate)
                : "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Peserta</span>
            <span className="font-medium">{tickets} orang</span>
          </div>
          <div className="border-t border-surface pt-3 flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-serif font-bold text-primary">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted mt-6 max-w-sm mx-auto">
          Detail booking telah dikirim ke email {personalData.email}.
          Hubungi kami jika ada pertanyaan.
        </p>

        <div className="mt-8">
          <Button href="/" onClick={reset} size="lg">
            Kembali ke Beranda
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
