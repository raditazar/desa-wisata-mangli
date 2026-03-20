import { Check, Clock } from "lucide-react";
import type { TourPackage } from "@/lib/types";
import { formatCurrency, cn } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface PackageCardProps {
  pkg: TourPackage;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Card hover className="flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-linear-to-br from-surface to-surface-dark">
        <div className="absolute inset-0 flex items-center justify-center text-muted">
          {!pkg.isAvailable && (
            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
              <span className="bg-white/90 text-primary font-semibold px-6 py-2 rounded-full text-sm flex items-center gap-2">
                <Clock size={16} />
                Segera Hadir
              </span>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 lg:p-8">
        <h3 className="font-serif text-xl lg:text-2xl font-bold text-primary">
          {pkg.name}
        </h3>
        <p className="text-sm text-accent font-medium mt-1">{pkg.tagline}</p>
        <p className="text-muted text-sm mt-3 leading-relaxed flex-1">
          {pkg.description}
        </p>

        {/* Features */}
        {pkg.features.length > 0 && (
          <ul className="mt-4 space-y-2">
            {pkg.features.slice(0, 4).map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-primary/80"
              >
                <Check size={16} className="text-accent shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Price & CTA */}
        <div className="mt-6 pt-6 border-t border-surface">
          {pkg.isAvailable ? (
            <>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-2xl lg:text-3xl font-bold text-primary">
                  {formatCurrency(pkg.price)}
                </span>
                <span className="text-muted text-sm">/ {pkg.priceUnit}</span>
              </div>
              <Button
                href={pkg.id === 'live-in' ? '/booking' : '/get-tickets'}
                className="w-full mt-4"
                size="md"
              >
                Pesan Sekarang
              </Button>
            </>
          ) : (
            <div className={cn("text-center py-2")}>
              <span className="text-muted text-sm italic">
                Harga akan diumumkan
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
