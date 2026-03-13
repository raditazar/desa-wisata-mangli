"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useBookingStore } from "@/stores/booking-store";
import BookingProgressBar from "./BookingProgressBar";
import StepPackageSelect from "./StepPackageSelect";
import StepPersonalData from "./StepPersonalData";
import StepPaymentSummary from "./StepPaymentSummary";
import BookingConfirmation from "./BookingConfirmation";

export default function BookingWizard() {
  const { currentStep, isConfirmed, direction } = useBookingStore();

  if (isConfirmed) {
    return <BookingConfirmation />;
  }

  return (
    <div>
      <BookingProgressBar currentStep={currentStep} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {currentStep === 1 && <StepPackageSelect />}
          {currentStep === 2 && <StepPersonalData />}
          {currentStep === 3 && <StepPaymentSummary />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
