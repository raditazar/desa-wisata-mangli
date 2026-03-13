"use client";

import { DayPicker, type DateRange } from "react-day-picker";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface DatePickerSingleProps {
  mode: "single";
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  label: string;
}

interface DatePickerRangeProps {
  mode: "range";
  selected?: DateRange;
  onSelect: (range: DateRange | undefined) => void;
  label: string;
}

type DatePickerFieldProps = DatePickerSingleProps | DatePickerRangeProps;

export default function DatePickerField(props: DatePickerFieldProps) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return (
    <div>
      <label className="block text-sm font-medium text-primary mb-2">
        {props.label}
      </label>
      <div className="bg-white rounded-2xl border border-surface-dark p-4 inline-block">
        {props.mode === "single" ? (
          <DayPicker
            mode="single"
            selected={props.selected}
            onSelect={props.onSelect}
            locale={id}
            disabled={{ before: tomorrow }}
            classNames={{
              root: "text-sm",
              months: "flex flex-col",
              month_caption: "flex justify-center items-center h-10 font-serif font-bold text-primary",
              nav: "absolute top-4 flex w-full justify-between px-2",
              button_previous: cn(
                "inline-flex items-center justify-center w-8 h-8 rounded-full",
                "hover:bg-surface text-primary transition-colors"
              ),
              button_next: cn(
                "inline-flex items-center justify-center w-8 h-8 rounded-full",
                "hover:bg-surface text-primary transition-colors"
              ),
              weekday: "text-muted text-xs font-medium w-10 h-10",
              day: "w-10 h-10 text-center",
              day_button: cn(
                "w-10 h-10 rounded-full inline-flex items-center justify-center",
                "hover:bg-surface transition-colors cursor-pointer text-sm"
              ),
              selected: "!bg-primary !text-white rounded-full",
              disabled: "text-surface-dark cursor-not-allowed opacity-40",
              today: "font-bold text-accent",
              range_start: "!bg-primary !text-white rounded-full",
              range_end: "!bg-primary !text-white rounded-full",
              range_middle: "!bg-surface",
            }}
          />
        ) : (
          <DayPicker
            mode="range"
            selected={props.selected}
            onSelect={props.onSelect}
            locale={id}
            disabled={{ before: tomorrow }}
            min={1}
            classNames={{
              root: "text-sm",
              months: "flex flex-col",
              month_caption: "flex justify-center items-center h-10 font-serif font-bold text-primary",
              nav: "absolute top-4 flex w-full justify-between px-2",
              button_previous: cn(
                "inline-flex items-center justify-center w-8 h-8 rounded-full",
                "hover:bg-surface text-primary transition-colors"
              ),
              button_next: cn(
                "inline-flex items-center justify-center w-8 h-8 rounded-full",
                "hover:bg-surface text-primary transition-colors"
              ),
              weekday: "text-muted text-xs font-medium w-10 h-10",
              day: "w-10 h-10 text-center",
              day_button: cn(
                "w-10 h-10 rounded-full inline-flex items-center justify-center",
                "hover:bg-surface transition-colors cursor-pointer text-sm"
              ),
              selected: "!bg-primary !text-white rounded-full",
              disabled: "text-surface-dark cursor-not-allowed opacity-40",
              today: "font-bold text-accent",
              range_start: "!bg-primary !text-white rounded-full",
              range_end: "!bg-primary !text-white rounded-full",
              range_middle: "!bg-surface",
            }}
          />
        )}
      </div>
    </div>
  );
}
