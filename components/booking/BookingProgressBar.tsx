"use client";

import { cn } from "@/lib/utils";
import type { BookingStep } from "@/lib/types";

interface BookingProgressBarProps {
  currentStep: BookingStep;
}

const steps = [
  { step: 1 as BookingStep, label: "Pilih Paket" },
  { step: 2 as BookingStep, label: "Data Diri" },
  { step: 3 as BookingStep, label: "Pembayaran" },
];

export default function BookingProgressBar({ currentStep }: BookingProgressBarProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-lg mx-auto mb-10">
      {steps.map((s, index) => (
        <div key={s.step} className="flex items-center flex-1 last:flex-none">
          {/* Step circle */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                currentStep >= s.step
                  ? "bg-primary text-white"
                  : "bg-surface text-muted"
              )}
            >
              {s.step}
            </div>
            <span
              className={cn(
                "text-xs font-medium whitespace-nowrap",
                currentStep >= s.step ? "text-primary" : "text-muted"
              )}
            >
              {s.label}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mx-3 transition-all duration-300",
                currentStep > s.step ? "bg-primary" : "bg-surface-dark"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
