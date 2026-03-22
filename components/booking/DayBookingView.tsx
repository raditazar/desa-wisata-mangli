"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import CalendarOverlay from "./CalendarOverlay";
import SummarySidebar from "./SummarySidebar";
import TicketRow from "./TicketRow";
import { useBookingStore } from "@/stores/booking-store";
import { TOUR_PACKAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function DayBookingView() {
  const { packageDates, setPackageDates, ticketSelections } = useBookingStore();
  const [showTickets, setShowTickets] = useState(false);

  // Focus on Edukasi Berkebun for get-tickets page
  const pkgId = "edukasi-berkebun";
  const pkg = TOUR_PACKAGES.find((p) => p.id === pkgId)!;
  const comingSoonPkg = TOUR_PACKAGES.find((p) => p.id === "coming-soon")!;
  const liveInPkg = TOUR_PACKAGES.find((p) => p.id === "live-in")!;

  const pkgDates = packageDates[pkgId] ?? {};
  const hasValidDate = !!pkgDates.visitDate;

  const hasAnyTicket = pkg.ticketGroups.some((g) =>
    g.items.some((item) => (ticketSelections[item.id] ?? 0) > 0)
  );

  const ticketsVisible = showTickets || hasAnyTicket;

  return (
    <div className="flex flex-col lg:flex-row gap-20 xl:gap-24">
      {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-6">
        
        {/* Date Selection Section */}
        <div className="bg-surface rounded-4xl px-8 py-7 border-4 border-white">
          <h2 className="font-light text-5xl md:text-6xl text-primary leading-tight mb-8">
            Choose your <span className="font-bold">visit date</span>
          </h2>
          
          <div className="border border-surface-dark/90 rounded-full">
            <CalendarOverlay
              mode="single"
              label=""
              placeholder="Pilih tanggal kunjungan"
              selected={pkgDates.visitDate}
              onSelect={(date) => setPackageDates(pkgId, { visitDate: date })}
            />
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowTickets(true)}
              disabled={!hasValidDate}
              className={cn(
                "w-full px-10 py-6 rounded-full font-medium text-xl transition-all duration-200",
                hasValidDate
                  ? "bg-primary/50 text-white hover:bg-primary/60 shadow-sm"
                  : "bg-surface-dark text-muted cursor-not-allowed"
              )}
            >
              Check Tickets
            </button>
            {!hasValidDate && (
              <p className="text-sm text-muted mt-2">Pilih tanggal terlebih dahulu</p>
            )}
          </div>
        </div>

        {/* Grab Your Ticket Section */}
        {ticketsVisible && (
          <div className="bg-surface border-4 border-white rounded-4xl px-8 py-7 shadow-sm space-y-6">
            <h1 className="font-light text-6xl text-primary leading-tight">
              Grab Your <span className="font-bold">Ticket</span>
            </h1>

            {/* Edukasi Berkebun Ticket Group */}
            <div className="bg-white rounded-4xl overflow-hidden shadow-sm">
              <div className="bg-surface m-3 rounded-full py-3 px-5 flex items-center justify-center">
                <h3 className="font-normal text-primary text-2xl">
                  {pkg.name}
                </h3>
              </div>
              <div className="px-6 py-2">
                {pkg.ticketGroups.map((group) => (
                  <div key={group.groupLabel}>
                    {group.items.map((item) => (
                      <TicketRow key={item.id} item={item} nights={1} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Special / Coming Soon Section */}
            {comingSoonPkg && (
              <div className="bg-white rounded-xl overflow-hidden shadow-sm opacity-60">
                <div className="bg-surface py-3 px-5 flex items-center justify-center">
                  <h3 className="font-semibold text-primary text-lg">
                    {comingSoonPkg.name}
                  </h3>
                </div>
                <div className="px-6 py-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted">{comingSoonPkg.description}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-muted font-medium bg-surface-dark px-3 py-1.5 rounded-full shrink-0">
                    <Clock size={12} />
                    Coming Soon
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Live-In at Mangli Promotion */}
        <div className="bg-surface rounded-4xl overflow-hidden shadow-sm flex flex-col md:flex-row">
          <div className="relative w-full md:w-2/5 h-48 md:h-auto">
             <Image
              src={liveInPkg.image}
              alt={liveInPkg.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 flex-1 flex flex-col justify-center">
            <h2 className="font-bold text-3xl text-primary mb-2">Live-In at Mangli</h2>
            <p className="text-muted text-sm mb-6 line-clamp-3">
              {liveInPkg.description}
            </p>
            <div>
              <Link
                href="/booking"
                className="inline-flex px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Buy Tickets
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
