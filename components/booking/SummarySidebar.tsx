"use client";

import { useState } from "react";
import { useBookingStore } from "@/stores/booking-store";
import { TOUR_PACKAGES } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { PackageType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ChevronUp } from "lucide-react";

export default function SummarySidebar({ 
  disabled = false, 
  buttonAction = "checkout",
  buttonText = "Continue",
  onContinueOverride,
}: { 
  disabled?: boolean;
  buttonAction?: "checkout" | "payment";
  buttonText?: string;
  onContinueOverride?: () => void;
}) {
  const { ticketSelections, packageDates, calculateTotal } = useBookingStore();
  const router = useRouter();
  const total = calculateTotal();
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const totalItems = Object.values(ticketSelections).reduce((a, b) => a + (b || 0), 0);

  function nightsCount(checkIn?: Date, checkOut?: Date): number {
    if (!checkIn || !checkOut) return 0;
    return Math.max(
      1,
      Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    );
  }

  type LineGroup = {
    pkgName: string;
    dateLabel: string;
    items: { label: string; qty: number; unitPrice: number; nights: number }[];
    pkgTotal: number;
  };

  const lineGroups: LineGroup[] = [];

  for (const pkg of TOUR_PACKAGES) {
    if (!pkg.isAvailable) continue;

    const pkgDates = packageDates[pkg.id as PackageType] ?? {};
    const nights =
      pkg.dateType === "range" && pkgDates.checkIn && pkgDates.checkOut
        ? nightsCount(pkgDates.checkIn, pkgDates.checkOut)
        : 1;

    const items: LineGroup["items"] = [];
    for (const group of pkg.ticketGroups) {
      for (const item of group.items) {
        const qty = ticketSelections[item.id] ?? 0;
        if (qty > 0) {
          items.push({ label: item.label, qty, unitPrice: item.price, nights });
        }
      }
    }

    if (items.length === 0) continue;

    let dateLabel = "";
    if (pkg.dateType === "range" && pkgDates.checkIn && pkgDates.checkOut) {
      dateLabel = `${format(pkgDates.checkIn, "dd MMM", { locale: id })} – ${format(
        pkgDates.checkOut,
        "dd MMM yyyy",
        { locale: id }
      )} (${nights} mlm)`;
    } else if (pkg.dateType === "single" && pkgDates.visitDate) {
      dateLabel = format(pkgDates.visitDate, "dd MMMM yyyy", { locale: id });
    }

    const pkgTotal = items.reduce(
      (s, it) => s + it.unitPrice * it.qty * it.nights,
      0
    );

    lineGroups.push({ pkgName: pkg.name, dateLabel, items, pkgTotal });
  }

  const hasSelection = lineGroups.length > 0;
  const allDatesValid = lineGroups.every((g) => g.dateLabel !== "");
  const canContinue = hasSelection && allDatesValid && !disabled;

  const handleContinue = () => {
    if (onContinueOverride) {
      onContinueOverride();
      return;
    }
    if (buttonAction === "checkout") {
      router.push("/checkout");
    } else {
      alert("Redirecting to Midtrans (Mock)");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white border-t rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] lg:sticky lg:top-24 lg:self-start lg:bg-transparent lg:shadow-none lg:p-0 lg:border-none lg:rounded-none lg:w-full">
      <div className="bg-surface rounded-t-3xl lg:rounded-2xl shadow-sm lg:overflow-hidden relative flex flex-col">
        
        {/* Mobile Toggle & Total Header */}
        <div 
          className="flex lg:hidden items-center justify-between p-5 pb-3 cursor-pointer"
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        >
          <div className="flex flex-col">
            <span className="text-sm text-primary font-bold mb-0.5">
              Total ({totalItems} item)
            </span>
            <span className="text-2xl font-bold text-primary leading-none">
              {formatCurrency(total)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-primary">
            <span className="text-xs font-semibold">{isMobileExpanded ? "Tutup" : "Detail"}</span>
            <ChevronUp 
              size={20} 
              className={cn("transition-transform duration-300", isMobileExpanded ? "rotate-180" : "")} 
            />
          </div>
        </div>

        {/* Collapsible Details Content */}
        <div className={cn(
          "w-full overflow-hidden transition-all duration-300 ease-in-out lg:opacity-100 lg:max-h-none",
          isMobileExpanded ? "max-h-[50vh] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="overflow-y-auto max-h-[50vh] lg:max-h-none">
            {/* Desktop header Ringkasan Pesanan */}
            <div className="hidden lg:block px-5 py-4">
              <h3 className="font-bold text-primary text-2xl">Ringkasan Pesanan</h3>
              {hasSelection && (
                <p className="text-accent/80 text-xs mt-0.5">
                  {lineGroups.length} paket dipilih
                </p>
              )}
            </div>

            <div className="p-5 lg:pt-0 pt-0">
              {hasSelection ? (
                <div className="space-y-4 mb-3">
                  <div className="block lg:hidden border-t-2 border-surface-dark mb-4"></div>
                  {lineGroups.map((group, gi) => (
                    <div key={gi}>
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="font-semibold text-xl text-primary">{group.pkgName}</span>
                        <span className="font-semibold text-lg text-primary">
                          {formatCurrency(group.pkgTotal)}
                        </span>
                      </div>
                      {group.dateLabel && (
                        <p className="text-sm font-medium text-primary mb-2">{group.dateLabel}</p>
                      )}
                      <div className="space-y-1.5 pl-2 border-l-2 border-surface-dark">
                        {group.items.map((item, ii) => (
                          <div key={ii} className="flex justify-between text-xs">
                            <span className="text-muted font-medium">
                              {item.label}
                              <span className="ml-1 text-primary">× {item.qty}</span>
                              {item.nights > 1 && (
                                <span className="ml-1 text-muted/70">× {item.nights} mlm</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                      {!group.dateLabel && (
                        <p className="text-xs text-orange-500 mt-1.5 font-medium">
                          Pilih tanggal untuk paket ini
                        </p>
                      )}
                      {gi < lineGroups.length - 1 && (
                        <div className="mt-4 border-t border-surface" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm text-muted font-medium">Belum ada tiket yang dipilih</p>
                  <p className="text-xs text-muted/70 mt-1">
                    Pilih tiket dari paket di sebelah kiri
                  </p>
                </div>
              )}

              {/* Desktop Total Box */}
              {hasSelection && (
                <div className="hidden lg:flex border-t border-surface-dark pt-3 mb-4 justify-between items-center">
                  <span className="text-xl font-semibold text-muted">Total</span>
                  <span className="text-xl font-bold text-primary">{formatCurrency(total)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Always Visible Footer Button */}
        <div className="p-5 pt-3 lg:pt-0">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className={cn(
              "w-full py-4 rounded-full font-bold text-xl transition-all duration-300",
              canContinue
                ? "bg-primary text-white hover:bg-primary/90 shadow-[0_8px_20px_rgba(26,37,23,0.15)] hover:-translate-y-0.5"
                : "bg-surface text-muted cursor-not-allowed border-2 border-dashed border-surface-dark"
            )}
          >
            {buttonText}
          </button>
          {!canContinue && buttonAction === "checkout" && (
            <p className="text-center text-xs text-muted mt-2 font-medium">
              {!hasSelection
                ? "Pilih minimal 1 tiket"
                : "Lengkapi tanggal yang belum dipilih"}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
