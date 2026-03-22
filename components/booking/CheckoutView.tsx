"use client";

import { useState, useMemo, useEffect } from "react";
import { useBookingStore } from "@/stores/booking-store";
import { cn } from "@/lib/utils";
import SummarySidebar from "./SummarySidebar";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Search, X } from "lucide-react";
import { COUNTRIES, type CountryData } from "@/lib/countries";
import { AnimatePresence, motion } from "framer-motion";

type FormErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "confirmEmail"
    | "phone"
    | "age"
    | "country",
    string
  >
>;

export default function CheckoutView() {
  const { personalData, setPersonalData, ticketSelections, packageDates } =
    useBookingStore();
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Local state for modals
  const [isLoading, setIsLoading] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  // For phone dial code storage (we can just store the dial code separately or derive from a selected country)
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState<CountryData>(
    COUNTRIES[0],
  );

  // Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!personalData.firstName.trim())
      newErrors.firstName = "First name required";
    if (!personalData.lastName.trim())
      newErrors.lastName = "Last name required";
    if (!personalData.country.trim()) newErrors.country = "Country required";
    if (!personalData.age) newErrors.age = "Age required";
    if (personalData.age && isNaN(Number(personalData.age)))
      newErrors.age = "Must be a number";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!personalData.email.trim() || !emailRegex.test(personalData.email)) {
      newErrors.email = "Valid email required";
    }
    if (personalData.confirmEmail !== personalData.email) {
      newErrors.confirmEmail = "Emails must match";
    }
    if (!personalData.phone.trim()) newErrors.phone = "Phone number required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: keyof typeof personalData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleChange = (field: keyof typeof personalData, value: string) => {
    setPersonalData({ ...personalData, [field]: value });
    if (touched[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handlePayment = async () => {
    setTouched({
      firstName: true,
      lastName: true,
      country: true,
      age: true,
      email: true,
      confirmEmail: true,
      phone: true,
    });

    if (validate()) {
      setIsLoading(true);
      try {
        const { ticketSelections, packageDates } = useBookingStore.getState();

        const items = Object.entries(ticketSelections).map(
          ([ticket_type_id, quantity]) => ({
            ticket_type_id,
            quantity,
          }),
        );

        const activeDate = Object.values(packageDates).find(
          (d) => d?.visitDate || d?.checkIn,
        );
        const visitDateStr =
          (activeDate?.visitDate || activeDate?.checkIn)
            ?.toISOString()
            .split("T")[0] || new Date().toISOString().split("T")[0];

        const payload = {
          full_name: `${personalData.firstName} ${personalData.lastName}`,
          phone_number: `${selectedPhoneCountry.dialCode}${personalData.phone}`,
          email: personalData.email,
          visit_date: visitDateStr,
          payment_method: "midtrans" as const,
          items,
        };

        console.log("Submitting Order Payload:", payload);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        alert(
          "Payload tersusun! Menunggu API Backend Ticket Types untuk testing live.",
        );
      } catch (error: any) {
        console.error("Order error", error);
        alert(error.message || "Gagal membuat pesanan");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const InputLabel = ({ label, error }: { label: string; error?: string }) => (
    <div className="flex justify-between items-baseline mb-1.5 px-1">
      <label className="text-lg font-semibold text-primary">{label}</label>
      {error && (
        <span className="text-sm text-red-500 font-medium">{error}</span>
      )}
    </div>
  );

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full px-5 py-3.5 bg-transparent border-2 rounded-2xl outline-none transition-all text-primary placeholder:text-muted/60 font-medium",
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-surface-dark focus:border-primary",
    );

  const activeCountry =
    COUNTRIES.find((c) => c.name === personalData.country) || COUNTRIES[0];

  return (
    <div className="flex flex-col lg:flex-row gap-20 xl:gap-28">
      {/* ── LEFT: Form ────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 pb-32 lg:pb-0 ">
        {/* Breadcrumb & Headline inline with Form */}
        <div className="mb-10">
          <Link
            href="/get-tickets"
            className="inline-flex items-center gap-2 text-lg font-semibold text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} /> Back to packages
          </Link>
        </div>

        <div className="bg-surface rounded-4xl  p-8">
          <div className="mb-10">
            <h1 className="font-light text-5xl md:text-6xl text-primary leading-tight tracking-tight">
              Book Your <span className="font-bold">Experience</span>
            </h1>
            <p className="text-muted font-medium text-lg">
              Lengkapi data diri di bawah ini untuk melanjutkan pesanan.
            </p>
          </div>
          <div className="space-y-6">
            {/* Row 1: Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <InputLabel
                  label="First Name"
                  error={touched.firstName ? errors.firstName : undefined}
                />
                <input
                  type="text"
                  value={personalData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  onBlur={() => handleBlur("firstName")}
                  className={inputClass(
                    !!(touched.firstName && errors.firstName),
                  )}
                  placeholder="John"
                />
              </div>
              <div>
                <InputLabel
                  label="Last Name"
                  error={touched.lastName ? errors.lastName : undefined}
                />
                <input
                  type="text"
                  value={personalData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  onBlur={() => handleBlur("lastName")}
                  className={inputClass(
                    !!(touched.lastName && errors.lastName),
                  )}
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Row 2: Country */}
            <div>
              <InputLabel
                label="Country"
                error={touched.country ? errors.country : undefined}
              />
              <button
                onClick={() => setShowCountryModal(true)}
                className={cn(
                  "w-full px-5 py-3.5 bg-transparent border-2 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all flex items-center justify-between",
                  touched.country && errors.country
                    ? "border-red-500"
                    : "border-surface-dark hover:border-primary focus:border-primary",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{activeCountry.flag}</span>
                  <span className="font-medium text-primary">
                    {activeCountry.name}
                  </span>
                </div>
                <ChevronDown size={20} className="text-muted" />
              </button>
            </div>

            {/* Row 3: Phone */}
            <div>
              <InputLabel
                label="Phone Number"
                error={touched.phone ? errors.phone : undefined}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPhoneModal(true)}
                  className="shrink-0 w-32 px-4 py-3.5 bg-transparent border-2 border-surface-dark hover:border-primary rounded-2xl flex justify-between items-center transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{selectedPhoneCountry.flag}</span>
                    <span className="font-medium text-primary">
                      {selectedPhoneCountry.dialCode}
                    </span>
                  </div>
                  <ChevronDown size={16} className="text-muted" />
                </button>
                <input
                  type="tel"
                  value={personalData.phone}
                  onChange={(e) =>
                    handleChange("phone", e.target.value.replace(/\D/g, ""))
                  }
                  onBlur={() => handleBlur("phone")}
                  className={cn(
                    inputClass(!!(touched.phone && errors.phone)),
                    "flex-1",
                  )}
                  placeholder="81234567890"
                />
              </div>
            </div>

            {/* Row 4: Age */}
            <div>
              <InputLabel
                label="Age"
                error={touched.age ? errors.age : undefined}
              />
              <input
                type="text"
                value={personalData.age}
                onChange={(e) =>
                  handleChange("age", e.target.value.replace(/\D/g, ""))
                }
                onBlur={() => handleBlur("age")}
                className={inputClass(!!(touched.age && errors.age))}
                placeholder="e.g. 25"
                maxLength={3}
              />
            </div>

            {/* Row 5: Email */}
            <div>
              <InputLabel
                label="Email Address"
                error={touched.email ? errors.email : undefined}
              />
              <input
                type="email"
                value={personalData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={inputClass(!!(touched.email && errors.email))}
                placeholder="john@example.com"
              />
            </div>

            {/* Row 6: Confirm Email */}
            <div>
              <InputLabel
                label="Confirm Email Address"
                error={touched.confirmEmail ? errors.confirmEmail : undefined}
              />
              <input
                type="email"
                value={personalData.confirmEmail}
                onChange={(e) => handleChange("confirmEmail", e.target.value)}
                onBlur={() => handleBlur("confirmEmail")}
                className={inputClass(
                  !!(touched.confirmEmail && errors.confirmEmail),
                )}
                placeholder="john@example.com"
                onPaste={(e) => {
                  e.preventDefault();
                  alert("Please manually type your email confirmation.");
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Sidebar ──────────────────────────────────────────── */}
      <div className="w-full lg:w-80 xl:w-[28rem] shrink-0">
        <SummarySidebar
          buttonAction="payment"
          buttonText={isLoading ? "Memproses..." : "Continue to Payment"}
          onContinueOverride={handlePayment}
          disabled={isLoading}
        />
      </div>

      {/* ── MODALS ─────────────────────────────────────────────────── */}
      <SelectionModal
        title="Select Country"
        open={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        data={COUNTRIES}
        onSelect={(c: CountryData) => {
          handleChange("country", c.name);
          setShowCountryModal(false);
        }}
        renderItem={(c: CountryData) => (
          <>
            <span className="text-2xl w-8 text-center">{c.flag}</span>
            <span className="font-semibold text-primary">{c.name}</span>
          </>
        )}
      />

      <SelectionModal
        title="Select Phone Code"
        open={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        data={COUNTRIES}
        onSelect={(c: CountryData) => {
          setSelectedPhoneCountry(c);
          setShowPhoneModal(false);
        }}
        renderItem={(c: CountryData) => (
          <>
            <span className="text-2xl w-8 text-center">{c.flag}</span>
            <span className="font-semibold text-primary flex-1">{c.name}</span>
            <span className="font-bold text-muted">{c.dialCode}</span>
          </>
        )}
      />
    </div>
  );
}

// Custom internal Modal component for Country/Phone
function SelectionModal({
  open,
  onClose,
  title,
  data,
  onSelect,
  renderItem,
}: any) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const s = search.toLowerCase();
    return data.filter(
      (c: CountryData) =>
        c.name.toLowerCase().includes(s) || c.dialCode.includes(s),
    );
  }, [search, data]);

  // Reset search when opened
  useEffect(() => {
    if (open) setSearch("");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-[101] bg-white w-full sm:max-w-md h-[80vh] sm:h-[65vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-surface-dark flex items-center justify-between bg-white z-10">
              <span className="font-bold text-xl text-primary">{title}</span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface rounded-full text-muted transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 border-b border-surface-dark bg-white z-10">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  size={20}
                />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search countries..."
                  className="w-full bg-surface py-3.5 pl-12 pr-4 rounded-xl outline-none font-medium text-primary placeholder:text-muted/70 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-muted font-medium">
                  No countries found
                </div>
              ) : (
                filtered.map((c: CountryData) => (
                  <button
                    key={c.code}
                    onClick={() => onSelect(c)}
                    className="w-full flex items-center gap-4 p-3.5 hover:bg-surface rounded-2xl text-left transition-colors"
                  >
                    {renderItem(c)}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
