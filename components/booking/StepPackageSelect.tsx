"use client";

import { Minus, Plus, Clock } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useBookingStore } from "@/stores/booking-store";
import { TOUR_PACKAGES } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";
import type { PackageType } from "@/lib/types";
import DatePickerField from "./DatePickerField";
import Button from "@/components/ui/Button";

export default function StepPackageSelect() {
  const {
    selectedPackage,
    selectPackage,
    dates,
    setDates,
    tickets,
    setTickets,
    nextStep,
  } = useBookingStore();

  const selectedPkg = TOUR_PACKAGES.find((p) => p.id === selectedPackage);

  const isValid = () => {
    if (!selectedPackage || !selectedPkg?.isAvailable) return false;
    if (selectedPkg.dateType === "range") {
      return !!dates.checkIn && !!dates.checkOut && tickets > 0;
    }
    if (selectedPkg.dateType === "single") {
      return !!dates.visitDate && tickets > 0;
    }
    return false;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-bold text-primary mb-2">
          Pilih Paket Wisata
        </h2>
        <p className="text-muted text-sm">
          Pilih paket, tentukan tanggal, dan jumlah peserta
        </p>
      </div>

      {/* Package Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TOUR_PACKAGES.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => pkg.isAvailable && selectPackage(pkg.id as PackageType)}
            disabled={!pkg.isAvailable}
            className={cn(
              "relative p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer",
              selectedPackage === pkg.id
                ? "border-primary bg-primary/5"
                : pkg.isAvailable
                ? "border-surface-dark hover:border-accent bg-white"
                : "border-surface bg-surface/50 cursor-not-allowed opacity-60"
            )}
          >
            {!pkg.isAvailable && (
              <span className="absolute top-3 right-3 flex items-center gap-1 text-xs text-muted bg-surface px-2 py-1 rounded-full">
                <Clock size={12} />
                Segera Hadir
              </span>
            )}
            <h3 className="font-serif font-bold text-primary text-lg">
              {pkg.name}
            </h3>
            <p className="text-xs text-muted mt-1">{pkg.tagline}</p>
            {pkg.isAvailable && (
              <p className="text-accent font-bold mt-2 text-sm">
                {formatCurrency(pkg.price)}
                <span className="text-muted font-normal"> / {pkg.priceUnit}</span>
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Date Picker */}
      {selectedPkg?.isAvailable && (
        <div>
          {selectedPkg.dateType === "range" && (
            <DatePickerField
              mode="range"
              label="Tanggal Check-in & Check-out"
              selected={
                dates.checkIn && dates.checkOut
                  ? { from: dates.checkIn, to: dates.checkOut }
                  : dates.checkIn
                  ? { from: dates.checkIn, to: undefined }
                  : undefined
              }
              onSelect={(range: DateRange | undefined) => {
                setDates({
                  checkIn: range?.from,
                  checkOut: range?.to,
                });
              }}
            />
          )}

          {selectedPkg.dateType === "single" && (
            <DatePickerField
              mode="single"
              label="Tanggal Kunjungan"
              selected={dates.visitDate}
              onSelect={(date: Date | undefined) => {
                setDates({ visitDate: date });
              }}
            />
          )}
        </div>
      )}

      {/* Ticket Counter */}
      {selectedPkg?.isAvailable && (
        <div>
          <label className="block text-sm font-medium text-primary mb-3">
            Jumlah Peserta
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTickets(tickets - 1)}
              disabled={tickets <= 1}
              className="w-10 h-10 rounded-full border border-surface-dark flex items-center justify-center hover:bg-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus size={16} />
            </button>
            <span className="font-serif text-2xl font-bold text-primary w-12 text-center">
              {tickets}
            </span>
            <button
              onClick={() => setTickets(tickets + 1)}
              disabled={tickets >= selectedPkg.maxTickets}
              className="w-10 h-10 rounded-full border border-surface-dark flex items-center justify-center hover:bg-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>
            <span className="text-sm text-muted">
              Maks. {selectedPkg.maxTickets} orang
            </span>
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="pt-4">
        <Button
          onClick={nextStep}
          disabled={!isValid()}
          size="lg"
          className="w-full sm:w-auto"
        >
          Lanjut ke Data Diri
        </Button>
      </div>
    </div>
  );
}
