import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 lg:mb-16", centered && "text-center")}>
      <h2
        className={cn(
          "font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
          light ? "text-white" : "text-primary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base lg:text-lg max-w-2xl",
            centered && "mx-auto",
            light ? "text-white/80" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-1 w-16 rounded-full",
          centered && "mx-auto",
          light ? "bg-white/40" : "bg-accent"
        )}
      />
    </div>
  );
}
