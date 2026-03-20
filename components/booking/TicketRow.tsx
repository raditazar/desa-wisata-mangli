"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { useBookingStore } from "@/stores/booking-store";
import { formatCurrency } from "@/lib/utils";
import type { TicketItem } from "@/lib/types";

export default function TicketRow({
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
            <span className="font-semibold text-primary text-xl">{item.label}</span>
          </div>
          <p className="text-lg text-muted mt-0.5">{item.description}</p>
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
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-accent/30 shrink-0 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent block" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT: price + increment */}
        <div className="shrink-0 flex flex-col items-end gap-2">
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
