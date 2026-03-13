import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import Card from "@/components/ui/Card";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="p-6 lg:p-8 h-full flex flex-col">
      <Quote size={28} className="text-accent/30 mb-4" />

      <p className="text-primary/80 text-sm leading-relaxed flex-1">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      <div className="flex gap-1 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < testimonial.rating
                ? "fill-accent text-accent"
                : "fill-surface text-surface"
            }
          />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-surface flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-accent font-bold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-sm text-primary">
            {testimonial.name}
          </div>
          <div className="text-xs text-muted">{testimonial.role}</div>
        </div>
      </div>
    </Card>
  );
}
