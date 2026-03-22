"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CalendarOverlay from "./CalendarOverlay";
import SummarySidebar from "./SummarySidebar";
import TicketRow from "./TicketRow";
import { useBookingStore } from "@/stores/booking-store";
import { mapApiToTourPackages } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function LiveInBookingView({ initialApiPackages }: { initialApiPackages?: any[] }) {
  const { packageDates, setPackageDates, ticketSelections, tourPackages, setTourPackages } = useBookingStore();
  const [showTickets, setShowTickets] = useState(false);

  useEffect(() => {
    if (initialApiPackages && initialApiPackages.length > 0) {
      setTourPackages(mapApiToTourPackages(initialApiPackages));
    }
  }, [initialApiPackages, setTourPackages]);

  // Focus on Live-In for booking page
  const pkgId = "live-in";
  const pkg = tourPackages.find((p) => p.id === pkgId)!;
  const promoPkg = tourPackages.find((p) => p.id === "edukasi-berkebun")!;

  const pkgDates = packageDates[pkgId] ?? {};
  const hasValidDate = !!pkgDates.checkIn && !!pkgDates.checkOut;

  const hasAnyTicket = pkg.ticketGroups.some((g) =>
    g.items.some((item) => (ticketSelections[item.id] ?? 0) > 0),
  );

  function nightsCount(checkIn?: Date, checkOut?: Date): number {
    if (!checkIn || !checkOut) return 0;
    return Math.max(
      1,
      Math.ceil(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
      ),
    );
  }

  const nights = nightsCount(pkgDates.checkIn, pkgDates.checkOut);
  const ticketsVisible = showTickets || hasAnyTicket;

  return (
    <div className="flex flex-col lg:flex-row gap-20 xl:gap-24">
      {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Date Selection Section */}
        <div className="bg-surface rounded-4xl px-8 py-7 border-4 border-white">
          <h2 className="font-light text-5xl md:text-6xl text-primary leading-tight mb-8">
            Choose your <span className="font-bold">stay dates</span>
          </h2>

          <div className="grid grid-cols-1  sm:grid-cols-2 gap-4 ">
            <div className="border border-surface-dark/90 rounded-full">
              <CalendarOverlay
                mode="single"
                label=""
                placeholder="Pilih tanggal masuk"
                selected={pkgDates.checkIn}
                onSelect={(date) =>
                  setPackageDates(pkgId, { checkIn: date, checkOut: undefined })
                }
              />
            </div>
            <div className="border border-surface-dark/90 rounded-full">
              <CalendarOverlay
                mode="single"
                label=""
                placeholder="Pilih tanggal keluar"
                selected={pkgDates.checkOut}
                onSelect={(date) =>
                  setPackageDates(pkgId, { ...pkgDates, checkOut: date })
                }
              />
            </div>
          </div>

          {pkgDates.checkIn && pkgDates.checkOut && (
            <p className="text-sm text-accent font-semibold mt-3">
              Total menginap: {nights} malam
            </p>
          )}

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowTickets(true)}
              disabled={!hasValidDate}
              className={cn(
                "w-full px-10 py-6 rounded-full font-medium text-xl transition-all duration-200",
                hasValidDate
                  ? "bg-primary/50 text-white hover:bg-primary/60 shadow-sm"
                  : "bg-surface-dark text-muted cursor-not-allowed",
              )}
            >
              Check Tickets
            </button>
            {!hasValidDate && (
              <p className="text-sm text-muted mt-2">
                Pilih tanggal check-in dan check-out
              </p>
            )}
          </div>
        </div>

        {/* Grab Your Ticket Section */}
        {ticketsVisible && (
          <div className="bg-surface border-4 border-white rounded-4xl px-8 py-7 shadow-sm space-y-6">
            <h2 className="font-light text-6xl text-primary leading-tight">
              Grab Your <span className="font-bold">Ticket</span>
            </h2>

            {/* Live-In Ticket Group */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="bg-surface m-3 rounded-full py-3 px-5 flex items-center justify-center">
                <h3 className="font-normal text-primary text-2xl">
                  {pkg.name}
                </h3>
              </div>
              <div className="px-6 py-2">
                {pkg.ticketGroups.map((group) => (
                  <div key={group.groupLabel}>
                    {group.items.map((item) => (
                      <TicketRow key={item.id} item={item} nights={nights} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {!hasValidDate && (
              <p className="text-xs text-muted mt-2">
                Pilih tanggal untuk melihat harga per malam yang akurat
              </p>
            )}
          </div>
        )}

        {/* Promo Edukasi Berkebun */}
        <div className="bg-surface rounded-4xl overflow-hidden shadow-sm flex flex-col md:flex-row">
          <div className="relative w-full md:w-2/5 h-48 md:h-auto">
            <Image
              src={promoPkg.image}
              alt={promoPkg.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 flex-1 flex flex-col justify-center">
            <h2 className="font-bold text-3xl text-primary mb-2">
              Edukasi Berkebun
            </h2>
            <p className="text-muted text-sm mb-6 line-clamp-3">
              {promoPkg.description}
            </p>
            <div>
              <Link
                href="/get-tickets"
                className="inline-flex px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Day Pass Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN (STICKY SUMMARY) ────────────────────────────── */}
      <div className="w-full lg:w-80 xl:w-xl shrink-0">
        <SummarySidebar buttonAction="checkout" buttonText="Continue" />
      </div>
    </div>
  );
}
