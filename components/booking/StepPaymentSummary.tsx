"use client";

import { useBookingStore } from "@/stores/booking-store";
import { TOUR_PACKAGES } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Calendar, User, Mail, Phone, Building, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";

export default function StepPaymentSummary() {
  const {
    selectedPackage,
    dates,
    tickets,
    personalData,
    calculateTotal,
    prevStep,
    confirm,
  } = useBookingStore();

  const pkg = TOUR_PACKAGES.find((p) => p.id === selectedPackage);
  const total = calculateTotal();

  if (!pkg) return null;

  const nights =
    pkg.dateType === "range" && dates.checkIn && dates.checkOut
      ? Math.ceil(
          (dates.checkOut.getTime() - dates.checkIn.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-bold text-primary mb-2">
          Ringkasan Booking
        </h2>
        <p className="text-muted text-sm">
          Periksa kembali detail booking Anda sebelum melakukan pembayaran
        </p>
      </div>

      <div className="max-w-lg space-y-6">
        {/* Package Info */}
        <div className="bg-white rounded-2xl border border-surface-dark p-6">
          <h3 className="font-serif text-lg font-bold text-primary">
            {pkg.name}
          </h3>
          <p className="text-sm text-muted mt-1">{pkg.tagline}</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={16} className="text-accent" />
              {pkg.dateType === "range" && dates.checkIn && dates.checkOut ? (
                <span>
                  {formatDate(dates.checkIn)} — {formatDate(dates.checkOut)}{" "}
                  <span className="text-muted">({nights} malam)</span>
                </span>
              ) : dates.visitDate ? (
                <span>{formatDate(dates.visitDate)}</span>
              ) : null}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User size={16} className="text-accent" />
              <span>{tickets} peserta</span>
            </div>
          </div>
        </div>

        {/* Personal Data */}
        <div className="bg-white rounded-2xl border border-surface-dark p-6">
          <h3 className="font-semibold text-primary mb-4">Data Pemesan</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <User size={16} className="text-accent" />
              <span>{personalData.fullName}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-accent" />
              <span>{personalData.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-accent" />
              <span>{personalData.phone}</span>
            </div>
            {personalData.institution && (
              <div className="flex items-center gap-3">
                <Building size={16} className="text-accent" />
                <span>{personalData.institution}</span>
              </div>
            )}
            {personalData.specialRequests && (
              <div className="flex items-start gap-3">
                <MessageSquare size={16} className="text-accent mt-0.5" />
                <span>{personalData.specialRequests}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl border border-surface-dark p-6">
          <h3 className="font-semibold text-primary mb-4">Rincian Harga</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">
                {formatCurrency(pkg.price)} x {tickets} peserta
                {nights > 0 && ` x ${nights} malam`}
              </span>
              <span className="font-medium">{formatCurrency(total)}</span>
            </div>
            <div className="border-t border-surface pt-3 mt-3 flex justify-between">
              <span className="font-bold text-primary text-base">Total</span>
              <span className="font-serif font-bold text-primary text-xl">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Note */}
        <div className="bg-accent/5 border border-accent/20 rounded-2xl p-4 text-sm text-accent">
          Pembayaran akan diproses melalui Midtrans (segera hadir). Untuk saat
          ini, klik tombol di bawah untuk menyelesaikan booking.
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-4">
        <Button onClick={prevStep} variant="outline" size="md">
          Kembali
        </Button>
        <Button onClick={confirm} size="lg">
          Bayar Sekarang — {formatCurrency(total)}
        </Button>
      </div>
    </div>
  );
}
