"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useBookingStore } from "@/stores/booking-store";
import type { PackageType } from "@/lib/types";
import BookingWizard from "@/components/booking/BookingWizard";

function BookingContent() {
  const searchParams = useSearchParams();
  const selectPackage = useBookingStore((s) => s.selectPackage);

  useEffect(() => {
    const pkg = searchParams.get("package");
    if (pkg === "live-in" || pkg === "edukasi-berkebun") {
      selectPackage(pkg as PackageType);
    }
  }, [searchParams, selectPackage]);

  return <BookingWizard />;
}

export default function BookingPage() {
  return (
    <div className="min-h-screen pt-[74px]">
      <div className="section-container py-12 lg:py-16">
        <Suspense fallback={<div className="text-center py-20 text-muted">Memuat...</div>}>
          <BookingContent />
        </Suspense>
      </div>
    </div>
  );
}
