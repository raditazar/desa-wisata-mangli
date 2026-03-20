"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { DayPicker, type DateRange } from "react-day-picker";
import { id } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarDays, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarOverlaySingleProps {
  mode: "single";
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  label: string;
  placeholder?: string;
}

interface CalendarOverlayRangeProps {
  mode: "range";
  selected?: DateRange;
  onSelect: (range: DateRange | undefined) => void;
  label: string;
  placeholder?: string;
}

type CalendarOverlayProps = CalendarOverlaySingleProps | CalendarOverlayRangeProps;

function formatDisplayValue(mode: "single" | "range", selected: Date | DateRange | undefined): string {
  if (!selected) return "";
  if (mode === "single") {
    return format(selected as Date, "dd MMM yyyy", { locale: id });
  }
  const range = selected as DateRange;
  if (range.from && range.to) {
    return `${format(range.from, "dd MMM yyyy", { locale: id })} — ${format(range.to, "dd MMM yyyy", { locale: id })}`;
  }
  if (range.from) {
    return format(range.from, "dd MMM yyyy", { locale: id });
  }
  return "";
}

const dayPickerClassNames = {
  root: "text-sm select-none",
  months: "flex flex-col",
  month_caption: "flex justify-center items-center h-10 font-bold text-primary text-base",
  nav: "absolute top-3 flex w-full justify-between px-1",
  button_previous: cn(
    "inline-flex items-center justify-center w-8 h-8 rounded-full",
    "hover:bg-surface text-primary transition-colors"
  ),
  button_next: cn(
    "inline-flex items-center justify-center w-8 h-8 rounded-full",
    "hover:bg-surface text-primary transition-colors"
  ),
  weekday: "text-muted text-xs font-semibold w-10 h-8 flex items-center justify-center",
  weeks: "mt-1",
  week: "flex",
  day: "w-10 h-10 text-center flex items-center justify-center",
  day_button: cn(
    "w-9 h-9 rounded-full inline-flex items-center justify-center",
    "hover:bg-surface transition-colors cursor-pointer text-sm font-medium"
  ),
  selected: "!bg-primary !text-white rounded-full font-bold",
  disabled: "text-surface-dark cursor-not-allowed opacity-40",
  today: "font-bold text-accent",
  range_start: "!bg-primary !text-white rounded-l-full font-bold",
  range_end: "!bg-primary !text-white rounded-r-full font-bold",
  range_middle: "!bg-accent/20 rounded-none",
  outside: "opacity-30",
};

export default function CalendarOverlay(props: CalendarOverlayProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const displayValue = formatDisplayValue(props.mode, props.selected);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const calendarContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
        onClick={() => setOpen(false)}
      />
      {/* Calendar card */}
      <div
        ref={overlayRef}
        className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-surface-dark p-5"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-primary">{props.label}</span>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 rounded-full hover:bg-surface flex items-center justify-center text-muted transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {props.mode === "single" ? (
          <DayPicker
            mode="single"
            selected={props.selected}
            onSelect={(date) => {
              props.onSelect(date);
              if (date) setOpen(false);
            }}
            locale={id}
            disabled={{ before: tomorrow }}
            classNames={dayPickerClassNames}
          />
        ) : (
          <DayPicker
            mode="range"
            selected={props.selected}
            onSelect={(range) => {
              props.onSelect(range);
              if (range?.from && range?.to) setOpen(false);
            }}
            locale={id}
            disabled={{ before: tomorrow }}
            min={1}
            classNames={dayPickerClassNames}
          />
        )}
      </div>
    </>
  );

  return (
    <div>
      <label className="block text-sm font-semibold text-primary mb-1.5">{props.label}</label>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-white",
          "text-left transition-all duration-150 focus:outline-none",
          open
            ? "border-primary ring-1 ring-primary"
            : "border-surface-dark hover:border-primary/50"
        )}
      >
        <CalendarDays size={17} className={displayValue ? "text-accent" : "text-muted"} />
        <span className={cn("flex-1 text-sm", displayValue ? "text-primary font-medium" : "text-muted/60")}>
          {displayValue || props.placeholder || "Pilih tanggal"}
        </span>
      </button>

      {mounted && open && createPortal(calendarContent, document.body)}
    </div>
  );
}
