"use client";

import { useState } from "react";
import { Clock, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useBookingStore } from "@/stores/booking-store";
import { TOUR_PACKAGES } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";
import type { PackageType, TicketItem } from "@/lib/types";
import CalendarOverlay from "./CalendarOverlay";

/* ─── helpers ─────────────────────────────────────────────────────────── */
function nightsCount(checkIn?: Date, checkOut?: Date): number {
  if (!checkIn || !checkOut) return 0;
  return Math.max(
    1,
    Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  );
}

function nightsLabel(checkIn?: Date, checkOut?: Date): string {
  const n = nightsCount(checkIn, checkOut);
  return n > 0 ? `${n} malam` : "";
}

/* ─── Ticket Row ─────────────────────────────────────────────────────── */
function TicketRow({
  item,
  nights,
}: {
  item: TicketItem;
  nights: number;
}) {
  const { ticketSelections, setTicketQty } = useBookingStore();
  const qty = ticketSelections[item.id] ?? 0;
  const [expanded, setExpanded] = useState(false);

  const unitPrice = item.price;
  const totalUnit = unitPrice * Math.max(1, nights);

  return (
    <div className="py-3.5 border-b border-surface last:border-0">
      <div className="flex items-start gap-4">
        {/* LEFT: label + description + see details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-primary text-base">{item.label}</span>
            {(item.minAge || item.maxAge) && (
              <span className="text-xs text-muted bg-surface px-2 py-0.5 rounded-full">
                {item.minAge && item.maxAge
                  ? `${item.minAge}–${item.maxAge} thn`
                  : item.minAge
                  ? `≥ ${item.minAge} thn`
                  : `≤ ${item.maxAge} thn`}
              </span>
            )}
          </div>
          <p className="text-sm text-muted mt-0.5">{item.description}</p>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-accent hover:text-primary transition-colors"
          >
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {expanded ? "Sembunyikan" : "Lihat Detail"}
          </button>

          {expanded && (
            <ul className="mt-2 space-y-1 pl-1">
              {item.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-accent/30 flex-shrink-0 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent block" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT: price + increment */}
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="font-bold text-primary text-base leading-tight">
              {formatCurrency(totalUnit)}
            </div>
            <div className="text-xs text-muted">
              / {item.priceUnit}
              {nights > 1 ? ` × ${nights} mlm` : ""}
            </div>
          </div>
          {/* Increment */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTicketQty(item.id, qty - 1)}
              disabled={qty <= 0}
              className="w-8 h-8 rounded-full border border-surface-dark flex items-center justify-center hover:bg-surface transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus size={13} />
            </button>
            <span className="w-6 text-center font-bold text-primary text-base tabular-nums">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setTicketQty(item.id, Math.min(qty + 1, item.maxQty))}
              disabled={qty >= item.maxQty}
              className="w-8 h-8 rounded-full border border-surface-dark flex items-center justify-center hover:bg-surface transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Package Section ─────────────────────────────────────────────────── */
function PackageSection({ pkgId }: { pkgId: PackageType }) {
  const pkg = TOUR_PACKAGES.find((p) => p.id === pkgId)!;
  const { packageDates, setPackageDates, ticketSelections } = useBookingStore();
  const [showTickets, setShowTickets] = useState(false);

  const pkgDates = packageDates[pkgId] ?? {};
  const hasAnyTicket = pkg.ticketGroups.some((g) =>
    g.items.some((item) => (ticketSelections[item.id] ?? 0) > 0)
  );

  // Date validation
  let hasValidDate = false;
  if (pkg.dateType === "range") {
    hasValidDate = !!pkgDates.checkIn && !!pkgDates.checkOut;
  } else if (pkg.dateType === "single") {
    hasValidDate = !!pkgDates.visitDate;
  }

  const nights =
    pkg.dateType === "range"
      ? nightsCount(pkgDates.checkIn, pkgDates.checkOut)
      : 1;

  // Auto show tickets if already has selections
  const ticketsVisible = showTickets || hasAnyTicket;

  return (
    <div className="bg-surface rounded-2xl overflow-hidden">
      {/* Package headline */}
      <div className="px-8 pt-7 pb-5">
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <h2 className="font-bold text-2xl text-primary leading-tight">{pkg.name}</h2>
            <p className="text-sm text-muted mt-0.5">{pkg.tagline}</p>
          </div>
          <p className="text-accent font-bold text-base flex-shrink-0">
            ab {formatCurrency(pkg.price)}
            <span className="text-muted font-normal text-xs"> / {pkg.priceUnit}</span>
          </p>
        </div>
      </div>

      <div className="px-8 pb-7 space-y-5">
        {/* ── Date Picker ─── */}
        <div>
          {pkg.dateType === "range" && (
            <>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Tanggal Menginap
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <CalendarOverlay
                  mode="single"
                  label="Check-in"
                  placeholder="Pilih tanggal masuk"
                  selected={pkgDates.checkIn}
                  onSelect={(date) =>
                    setPackageDates(pkgId, { checkIn: date, checkOut: undefined })
                  }
                />
                <CalendarOverlay
                  mode="single"
                  label="Check-out"
                  placeholder="Pilih tanggal keluar"
                  selected={pkgDates.checkOut}
                  onSelect={(date) =>
                    setPackageDates(pkgId, { ...pkgDates, checkOut: date })
                  }
                />
              </div>
              {pkgDates.checkIn && pkgDates.checkOut && (
                <p className="text-sm text-accent font-semibold mt-2">
                  {nightsLabel(pkgDates.checkIn, pkgDates.checkOut)}
                </p>
              )}
            </>
          )}

          {pkg.dateType === "single" && (
            <>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Tanggal Kunjungan
              </p>
              <CalendarOverlay
                mode="single"
                label="Tanggal Kunjungan"
                placeholder="Pilih tanggal kunjungan"
                selected={pkgDates.visitDate}
                onSelect={(date) => setPackageDates(pkgId, { visitDate: date })}
              />
            </>
          )}
        </div>

        {/* ── Check Tickets Button / Ticket List ─── */}
        {!ticketsVisible ? (
          <div>
            <button
              type="button"
              onClick={() => setShowTickets(true)}
              disabled={!hasValidDate}
              className={cn(
                "px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200",
                hasValidDate
                  ? "bg-primary text-white hover:bg-primary/90 shadow-sm"
                  : "bg-surface-dark text-muted cursor-not-allowed"
              )}
            >
              Lihat Tiket
            </button>
            {!hasValidDate && (
              <p className="text-xs text-muted mt-1.5">Pilih tanggal terlebih dahulu</p>
            )}
          </div>
        ) : (
          <div>
            {/* Ticket groups */}
            <div className="space-y-4">
              {pkg.ticketGroups.map((group) => (
                <div
                  key={group.groupLabel}
                  className="bg-white rounded-xl border border-surface-dark overflow-hidden"
                >
                  <div className="px-5 py-2.5 border-b border-surface bg-surface/40">
                    <h3 className="font-semibold text-primary text-sm">{group.groupLabel}</h3>
                  </div>
                  <div className="px-5">
                    {group.items.map((item) => (
                      <TicketRow key={item.id} item={item} nights={nights} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {!hasValidDate && (
              <p className="text-xs text-muted mt-2">
                Pilih tanggal untuk melihat harga per malam yang akurat
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Summary Sidebar ─────────────────────────────────────────────────── */
function SummarySidebar({ onContinue }: { onContinue: () => void }) {
  const { ticketSelections, packageDates, calculateTotal, nextStep } = useBookingStore();

  const total = calculateTotal();

  // Build per-package line items
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

  // validate all selected packages have dates
  const allDatesValid = lineGroups.every((g) => g.dateLabel !== "");
  const canContinue = hasSelection && allDatesValid;

  return (
    <div className="sticky top-24 self-start">
      <div className="bg-white rounded-2xl border border-surface-dark shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-5 py-4">
          <h3 className="font-bold text-white text-base">Ringkasan Pesanan</h3>
          {hasSelection && (
            <p className="text-accent/80 text-xs mt-0.5">
              {lineGroups.length} paket dipilih
            </p>
          )}
        </div>

        <div className="p-5">
          {hasSelection ? (
            <div className="space-y-4 mb-4">
              {lineGroups.map((group, gi) => (
                <div key={gi}>
                  {/* Package name */}
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-semibold text-sm text-primary">{group.pkgName}</span>
                    <span className="font-semibold text-sm text-primary">
                      {formatCurrency(group.pkgTotal)}
                    </span>
                  </div>
                  {/* Date */}
                  {group.dateLabel && (
                    <p className="text-xs text-muted mb-2">{group.dateLabel}</p>
                  )}
                  {/* Ticket items */}
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
                        <span className="text-primary font-medium">
                          {formatCurrency(item.unitPrice * item.qty * item.nights)}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Missing date warning */}
                  {!group.dateLabel && (
                    <p className="text-xs text-orange-500 mt-1.5">
                      Pilih tanggal untuk paket ini
                    </p>
                  )}
                  {/* Divider between groups */}
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

          {/* Total */}
          {hasSelection && (
            <div className="border-t border-surface-dark pt-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-muted">Total</span>
                <span className="text-xl font-bold text-primary">{formatCurrency(total)}</span>
              </div>
            </div>
          )}

          {/* Continue button */}
          <button
            type="button"
            onClick={() => {
              if (canContinue) nextStep();
            }}
            disabled={!canContinue}
            className={cn(
              "w-full py-3 rounded-xl font-bold text-sm transition-all duration-200",
              canContinue
                ? "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md"
                : "bg-surface text-muted cursor-not-allowed"
            )}
          >
            Lanjut — Isi Data Diri
          </button>
          {!canContinue && (
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

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function StepPackageSelect() {
  const { nextStep } = useBookingStore();

  const availablePackages = TOUR_PACKAGES.filter((p) => p.isAvailable);
  const unavailablePackages = TOUR_PACKAGES.filter((p) => !p.isAvailable);

  return (
    <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">

      {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-6">
        <div>
          <h1 className="font-light text-5xl text-primary mb-1">
            Pilih <span className="font-bold">Paket Wisata</span>
          </h1>
          <p className="text-muted text-sm">
            Pilih satu atau beberapa paket sesuai keinginan Anda.
          </p>
        </div>

        {/* Available packages */}
        {availablePackages.map((pkg) => (
          <PackageSection key={pkg.id} pkgId={pkg.id as PackageType} />
        ))}

        {/* Unavailable packages */}
        {unavailablePackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-surface rounded-2xl px-8 py-6 opacity-55"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-bold text-2xl text-primary leading-tight">{pkg.name}</h2>
                <p className="text-sm text-muted mt-0.5">{pkg.tagline}</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-muted bg-surface-dark px-3 py-1 rounded-full flex-shrink-0">
                <Clock size={11} />
                Segera Hadir
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── RIGHT COLUMN (STICKY SUMMARY) ────────────────────────────── */}
      <div className="w-full lg:w-80 xl:w-88 flex-shrink-0">
        <SummarySidebar onContinue={nextStep} />
      </div>
    </div>
  );
}
