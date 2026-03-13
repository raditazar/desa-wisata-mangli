"use client";

import { useState } from "react";
import { useBookingStore } from "@/stores/booking-store";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

export default function StepPersonalData() {
  const { personalData, setPersonalData, nextStep, prevStep } =
    useBookingStore();
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!personalData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi";
    }

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
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-bold text-primary mb-2">
          Data Diri
        </h2>
        <p className="text-muted text-sm">
          Lengkapi data diri untuk proses booking
        </p>
      </div>

      <div className="space-y-5 max-w-lg">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={personalData.fullName}
            onChange={(e) => setPersonalData({ fullName: e.target.value })}
            onBlur={() => handleBlur("fullName")}
            placeholder="Masukkan nama lengkap"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white text-primary placeholder:text-muted/50 transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
              touched.fullName && errors.fullName
                ? "border-red-400"
                : "border-surface-dark"
            )}
          />
          {touched.fullName && errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={personalData.email}
            onChange={(e) => setPersonalData({ email: e.target.value })}
            onBlur={() => handleBlur("email")}
            placeholder="contoh@email.com"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white text-primary placeholder:text-muted/50 transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
              touched.email && errors.email
                ? "border-red-400"
                : "border-surface-dark"
            )}
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={personalData.phone}
            onChange={(e) => setPersonalData({ phone: e.target.value })}
            onBlur={() => handleBlur("phone")}
            placeholder="0812-3456-7890"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-white text-primary placeholder:text-muted/50 transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
              touched.phone && errors.phone
                ? "border-red-400"
                : "border-surface-dark"
            )}
          />
          {touched.phone && errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Institution */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Instansi / Komunitas
          </label>
          <input
            type="text"
            value={personalData.institution}
            onChange={(e) => setPersonalData({ institution: e.target.value })}
            placeholder="Opsional"
            className="w-full px-4 py-3 rounded-xl border border-surface-dark bg-white text-primary placeholder:text-muted/50 transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">
            Permintaan Khusus
          </label>
          <textarea
            value={personalData.specialRequests}
            onChange={(e) =>
              setPersonalData({ specialRequests: e.target.value })
            }
            placeholder="Alergi makanan, kebutuhan khusus, dll. (opsional)"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-surface-dark bg-white text-primary placeholder:text-muted/50 transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-4">
        <Button onClick={prevStep} variant="outline" size="md">
          Kembali
        </Button>
        <Button onClick={handleNext} size="md">
          Lanjut ke Pembayaran
        </Button>
      </div>
    </div>
  );
}
