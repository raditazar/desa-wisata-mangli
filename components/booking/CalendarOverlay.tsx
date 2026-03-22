"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { id } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

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
  month: "space-y-4",
  months: "flex flex-col gap-4",
  month_caption: "flex justify-between items-center h-10 mb-2 px-1",
  caption_label: "font-semibold text-xl text-primary",
  nav: "flex items-center gap-2",
  button_previous: cn(
    "inline-flex items-center justify-center w-8 h-8 rounded-full",
    "hover:bg-surface text-primary transition-colors cursor-pointer"
  ),
  button_next: cn(
    "inline-flex items-center justify-center w-8 h-8 rounded-full",
    "hover:bg-surface text-primary transition-colors cursor-pointer"
  ),
  month_grid: "w-full border-collapse",
  weekdays: "flex justify-between mb-4", 
  weekday: "text-primary/80 text-sm font-medium w-10 flex items-center justify-center m-0 p-0",
  weeks: "",
  week: "flex justify-between mt-2",
  day: "w-10 h-10 text-center p-0 m-0 flex items-center justify-center text-sm font-medium text-primary/80",
  day_button: cn(
    "w-10 h-10 rounded-full inline-flex items-center justify-center",
    "hover:bg-surface/80 transition-colors cursor-pointer font-semibold relative"
  ),
  selected: "!bg-[#111811] !text-white rounded-full font-bold shadow-md",
  disabled: "text-surface-dark cursor-not-allowed opacity-40 hover:bg-transparent",
  today: "font-bold text-accent bg-accent/10",
  range_start: "!bg-[#111811] !text-white rounded-l-full font-bold",
  range_end: "!bg-[#111811] !text-white rounded-r-full font-bold",
  range_middle: "!bg-surface-dark/30 !text-primary rounded-none",
  outside: "opacity-30",
};

export default function CalendarOverlay(props: CalendarOverlayProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Temporary state for the modal selection before Apply
  const [tempSingle, setTempSingle] = useState<Date | undefined>(undefined);
  const [tempRange, setTempRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  // When opening, sync temp state
  useEffect(() => {
    if (open) {
      if (props.mode === "single") {
        setTempSingle(props.selected);
      } else {
        setTempRange(props.selected);
      }
    }
  }, [open, props.selected, props.mode]);

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

  const handleApply = () => {
    if (props.mode === "single") {
      props.onSelect(tempSingle);
    } else {
      props.onSelect(tempRange);
    }
    setOpen(false);
  };

  const calendarContent = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          
          {/* Calendar card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            ref={overlayRef}
            className="relative z-101 bg-white rounded-2xl shadow-2xl border border-surface p-7 max-w-[340px] w-full mx-4"
          >
            {/* 
              Custom wrapper classes to color Saturday and Sunday red 
              In Indonesian locale, week starts on Monday, so Sat = 6th child, Sun = 7th child 
              Also make the weekend days themselves red
            */}
            <div className="
              [&_th:nth-last-child(1)]:text-red-500 [&_th:nth-last-child(2)]:text-red-500
              [&_td:nth-last-child(1)_button]:text-red-500 [&_td:nth-last-child(2)_button]:text-red-500
              [&_td:nth-last-child(1)_button.rdp-selected]:text-white [&_td:nth-last-child(2)_button.rdp-selected]:text-white
            ">
              <DayPicker
                mode={props.mode as any}
                selected={props.mode === "single" ? tempSingle : tempRange}
                onSelect={(val: any) => {
                  if (props.mode === "single") setTempSingle(val);
                  else setTempRange(val);
                }}
                locale={id}
                disabled={{ before: tomorrow }}
                classNames={dayPickerClassNames}
                components={{
                  Chevron: (p) => p.orientation === "left" ? <ChevronLeft size={20} className="text-primary"/> : <ChevronRight size={20} className="text-primary"/>
                }}
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-3 px-4 rounded-full border border-surface-dark text-primary font-medium hover:bg-surface transition-colors focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="flex-1 py-3 px-4 rounded-full bg-[#111811] text-white font-medium hover:bg-[#111811]/90 transition-colors focus:outline-none"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div>
      {props.label && (
        <label className="block text-sm font-semibold text-primary mb-1.5 px-1">{props.label}</label>
      )}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-surface",
          "text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 hover:shadow-md",
          open
            ? "ring-2 ring-primary shadow-lg bg-surface-dark/20"
            : ""
        )}
      >
        <div className={cn("p-2 rounded-xl transition-colors", displayValue ? "bg-[#111811] text-white" : "bg-white text-muted")}>
           <CalendarDays size={20} />
        </div>
        <span className={cn("flex-1 text-lg", displayValue ? "text-primary font-bold" : "text-primary/50 font-medium")}>
          {displayValue || props.placeholder || "Pilih tanggal"}
        </span>
      </button>

      {mounted && createPortal(calendarContent, document.body)}
    </div>
  );
}
