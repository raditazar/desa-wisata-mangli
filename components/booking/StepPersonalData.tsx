"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarCheck } from "lucide-react";
import { useBookingStore } from "@/stores/booking-store";
import { TOUR_PACKAGES } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

/* ─── Shared sticky summary (read-only) ─────────────────────────────── */
function SummarySidebar() {
  const { selectedPackage, ticketSelections, dates, calculateTotal } = useBookingStore();

  const pkg = TOUR_PACKAGES.find((p) => p.id === selectedPackage);
  const total = calculateTotal();

  const nights =
    pkg?.dateType === "range" && dates.checkIn && dates.checkOut
      ? Math.max(
          1,
          Math.ceil(
            (dates.checkOut.getTime() - dates.checkIn.getTime()) / (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const lineItems: { label: string; qty: number; unitPrice: number; nights: number }[] = [];
  if (pkg) {
    for (const group of pkg.ticketGroups) {
      for (const item of group.items) {
        const qty = ticketSelections[item.id] ?? 0;
        if (qty > 0) lineItems.push({ label: item.label, qty, unitPrice: item.price, nights });
      }
    }
  }

  return (
    <div className="sticky top-24 self-start">
      <div className="bg-white rounded-2xl border border-surface-dark shadow-sm overflow-hidden">
        <div className="bg-primary px-5 py-4">
          <h3 className="font-bold text-white text-lg">Your Selected Tickets</h3>
          {pkg && <p className="text-accent/80 text-sm mt-0.5">{pkg.name}</p>}
        </div>

        <div className="p-5 space-y-4">
          {/* Date */}
          {pkg && (
            <div className="p-3 rounded-xl bg-surface text-sm text-primary">
              <div className="flex items-start gap-2">
                <CalendarCheck size={15} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  {pkg.dateType === "range" && dates.checkIn && dates.checkOut && (
                    <>
                      <div>{format(dates.checkIn, "dd MMM", { locale: id })} — {format(dates.checkOut, "dd MMM yyyy", { locale: id })}</div>
                      <div className="font-semibold">{nights} malam</div>
                    </>
                  )}
                  {pkg.dateType === "single" && dates.visitDate && (
                    <div>{format(dates.visitDate, "dd MMMM yyyy", { locale: id })}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Line items */}
          <div className="space-y-2">
            {lineItems.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <div className="text-muted">
                  <span className="text-primary font-medium">{item.label}</span>
                  <span className="ml-1.5">× {item.qty}</span>
                  {item.nights > 1 && <span className="ml-1 text-muted/70">× {item.nights} mlm</span>}
                </div>
                <div className="font-semibold text-primary">
                  {formatCurrency(item.unitPrice * item.qty * item.nights)}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-surface-dark pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-muted">Total</span>
              <span className="text-xl font-bold text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────── */
export default function StepPersonalData() {
  const { personalData, setPersonalData, nextStep, prevStep } = useBookingStore();
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!personalData.fullName.trim()) newErrors.fullName = "Nama lengkap wajib diisi";
    if (!personalData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!personalData.phone.trim()) {
      newErrors.phone = "Nomor telepon wajib diisi";
    } else if (!/^[\d+\-\s()]{8,15}$/.test(personalData.phone)) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validate();
  };

  const handleNext = () => {
    setTouched({ fullName: true, email: true, phone: true });
    if (validate()) nextStep();
  };

  const inputClass = (field: keyof FormErrors) =>
    cn(
      "w-full px-4 py-2.5 rounded-xl border bg-white text-primary placeholder:text-muted/50 transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-base",
      touched[field] && errors[field] ? "border-red-400" : "border-surface-dark"
    );

  return (
    <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
      {/* ── LEFT: Form ────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-6">
        <div>
          <h1 className="font-bold text-3xl md:text-4xl text-primary">Data Diri</h1>
          <p className="text-muted text-base mt-1">Lengkapi data diri untuk proses booking</p>
        </div>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={personalData.fullName}
              onChange={(e) => setPersonalData({ fullName: e.target.value })}
              onBlur={() => handleBlur("fullName")}
              placeholder="Masukkan nama lengkap"
              className={inputClass("fullName")}
            />
            {touched.fullName && errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={personalData.email}
              onChange={(e) => setPersonalData({ email: e.target.value })}
              onBlur={() => handleBlur("email")}
              placeholder="contoh@email.com"
              className={inputClass("email")}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={personalData.phone}
              onChange={(e) => setPersonalData({ phone: e.target.value })}
              onBlur={() => handleBlur("phone")}
              placeholder="0812-3456-7890"
              className={inputClass("phone")}
            />
            {touched.phone && errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Institution */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Instansi / Komunitas
            </label>
            <input
              type="text"
              value={personalData.institution}
              onChange={(e) => setPersonalData({ institution: e.target.value })}
              placeholder="Opsional"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-dark bg-white text-primary placeholder:text-muted/50 transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-base"
            />
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Permintaan Khusus
            </label>
            <textarea
              value={personalData.specialRequests}
              onChange={(e) => setPersonalData({ specialRequests: e.target.value })}
              placeholder="Alergi makanan, kebutuhan khusus, dll. (opsional)"
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-dark bg-white text-primary placeholder:text-muted/50 transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none text-base"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          <Button onClick={prevStep} variant="outline" size="md">
            Kembali
          </Button>
          <Button onClick={handleNext} size="md">
            Lanjut ke Pembayaran
          </Button>
        </div>
      </div>

      {/* ── RIGHT: Sticky Summary ────────────────────────────────── */}
      <div className="w-full lg:w-80 xl:w-88 flex-shrink-0">
        <SummarySidebar />
      </div>
    </div>
  );
}
