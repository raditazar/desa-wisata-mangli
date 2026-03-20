"use client";

import { useBookingStore } from "@/stores/booking-store";
import { TOUR_PACKAGES } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { PackageType } from "@/lib/types";
import { useRouter } from "next/navigation";

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
    <div className="sticky top-24 self-start">
      <div className="bg-surface rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4">
          <h3 className="font-bold text-primary text-2xl">Ringkasan Pesanan</h3>
          {hasSelection && (
            <p className="text-accent/80 text-xs mt-0.5">
              {lineGroups.length} paket dipilih
            </p>
          )}
        </div>

        <div className="p-5">
          {hasSelection ? (
            <div className="space-y-4 mb-3">
              {lineGroups.map((group, gi) => (
                <div key={gi}>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-semibold text-xl text-primary">{group.pkgName}</span>
                    <span className="font-semibold text-xl text-primary">
                      {formatCurrency(group.pkgTotal)}
                    </span>
                  </div>
                  {group.dateLabel && (
                    <p className="text-md text-primary mb-2">{group.dateLabel}</p>
                  )}
                  <div className="space-y-1.5 pl-2 border-l-2 border-surface-dark">
                    {group.items.map((item, ii) => (
                      <div key={ii} className="flex justify-between text-xs">
                        <span className="text-muted">
                          {item.label}
                          <span className="ml-1">× {item.qty}</span>
                          {item.nights > 1 && (
                            <span className="ml-1 text-muted/70">× {item.nights} mlm</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                  {!group.dateLabel && (
                    <p className="text-xs text-orange-500 mt-1.5">
                      Pilih tanggal untuk paket ini
                    </p>
                  )}
                  {gi < lineGroups.length - 1 && (
                    <div className="mt-3 border-t border-surface" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-muted">Belum ada tiket yang dipilih</p>
              <p className="text-xs text-muted/70 mt-1">
                Pilih tiket dari paket di sebelah kiri
              </p>
            </div>
          )}

          {hasSelection && (
            <div className="border-t border-surface-dark pt-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-muted">Total</span>
                <span className="text-xl font-bold text-primary">{formatCurrency(total)}</span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className={cn(
              "w-full py-4 rounded-full font-normal text-xl transition-all duration-200",
              canContinue
                ? "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md"
                : "bg-surface text-muted cursor-not-allowed"
            )}
          >
            {buttonText}
          </button>
          {!canContinue && buttonAction === "checkout" && (
            <p className="text-center text-xs text-muted mt-2">
              {!hasSelection
                ? "Pilih minimal 1 tiket"
                : "Lengkapi tanggal untuk semua paket"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
