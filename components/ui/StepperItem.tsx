import { cn } from "@/lib/utils";

interface StepperItemProps {
  stepNumber: number;
  title: string;
  description: string;
  isLast: boolean;
}

export default function StepperItem({
  stepNumber,
  title,
  description,
  isLast,
}: StepperItemProps) {
  return (
    <div className="flex gap-4 lg:flex-col lg:items-center lg:text-center">
      {/* Step indicator + line */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-serif text-lg font-bold shrink-0">
          {stepNumber}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-surface-dark lg:hidden mt-2" />
        )}
      </div>

      {/* Connector line for desktop */}
      {!isLast && (
        <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-surface-dark" />
      )}

      {/* Content */}
      <div className={cn("pb-8 lg:pb-0 lg:mt-4", isLast && "pb-0")}>
        <h3 className="font-serif text-lg font-bold text-primary">{title}</h3>
        <p className="text-sm text-muted mt-2 leading-relaxed max-w-xs">
          {description}
        </p>
      </div>
    </div>
  );
}
