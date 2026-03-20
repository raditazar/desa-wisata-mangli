"use client";

import { useState } from "react";
import { useBookingStore } from "@/stores/booking-store";
import { cn } from "@/lib/utils";
import SummarySidebar from "./SummarySidebar";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  country?: string;
  phone?: string;
  age?: string;
  email?: string;
  confirmEmail?: string;
}

const COUNTRY_CODES = [
  { code: "+62", label: "Indonesia (+62)" },
  { code: "+60", label: "Malaysia (+60)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+1", label: "USA/Canada (+1)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+44", label: "UK (+44)" },
];

export default function CheckoutView() {
  const { personalData, setPersonalData } = useBookingStore();
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [phoneCode, setPhoneCode] = useState("+62");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!personalData.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!personalData.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!personalData.country?.trim()) newErrors.country = "Country is required";
    if (!personalData.age?.trim()) newErrors.age = "Age is required";
    
    if (!personalData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!personalData.confirmEmail?.trim()) {
      newErrors.confirmEmail = "Please confirm your email";
    } else if (personalData.confirmEmail !== personalData.email) {
      newErrors.confirmEmail = "Emails do not match";
    }

    if (!personalData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d+\-\s()]{8,15}$/.test(personalData.phone)) {
      newErrors.phone = "Invalid phone format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validate();
  };

  const handlePaymentMock = () => {
    // Touch all fields
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
      alert("Redirecting to Midtrans gateway...");
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    cn(
      "w-full px-4 py-3 rounded-xl border bg-white text-primary placeholder:text-muted/50 transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-base",
      touched[field] && errors[field] ? "border-red-400" : "border-surface-dark"
    );

  return (
    <div className="flex flex-col lg:flex-row gap-8 xl:gap-14 items-start">
      {/* ── LEFT: Form ────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-8">
        <div>
          <h1 className="font-bold text-4xl mt-3 text-primary">Personal Data</h1>
          <p className="text-muted text-base mt-2">Please fill in your details to complete your booking.</p>
        </div>

        <div className="space-y-5 bg-surface rounded-3xl p-6 sm:p-8">
          
          {/* Name Row */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-primary mb-1.5">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={personalData.firstName || ""}
                onChange={(e) => setPersonalData({ firstName: e.target.value })}
                onBlur={() => handleBlur("firstName")}
                placeholder="John"
                className={inputClass("firstName")}
              />
              {touched.firstName && errors.firstName && (
                <p className="text-red-500 text-xs mt-1.5">{errors.firstName}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-primary mb-1.5">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={personalData.lastName || ""}
                onChange={(e) => setPersonalData({ lastName: e.target.value })}
                onBlur={() => handleBlur("lastName")}
                placeholder="Doe"
                className={inputClass("lastName")}
              />
              {touched.lastName && errors.lastName && (
                <p className="text-red-500 text-xs mt-1.5">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Country & Age Row */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-2">
              <label className="block text-sm font-semibold text-primary mb-1.5">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={personalData.country || ""}
                onChange={(e) => setPersonalData({ country: e.target.value })}
                onBlur={() => handleBlur("country")}
                placeholder="Indonesia"
                className={inputClass("country")}
              />
              {touched.country && errors.country && (
                <p className="text-red-500 text-xs mt-1.5">{errors.country}</p>
              )}
            </div>
            <div className="flex-1">
             <label className="block text-sm font-semibold text-primary mb-1.5">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={personalData.age || ""}
                onChange={(e) => setPersonalData({ age: e.target.value })}
                onBlur={() => handleBlur("age")}
                placeholder="25"
                className={inputClass("age")}
              />
              {touched.age && errors.age && (
                <p className="text-red-500 text-xs mt-1.5">{errors.age}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                className="w-28 px-3 py-3 rounded-xl border border-surface-dark bg-white text-primary focus:outline-none focus:border-primary text-sm font-medium"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
              <div className="flex-1">
                <input
                  type="tel"
                  value={personalData.phone || ""}
                  onChange={(e) => setPersonalData({ phone: e.target.value })}
                  onBlur={() => handleBlur("phone")}
                  placeholder="812-3456-7890"
                  className={inputClass("phone")}
                />
              </div>
            </div>
            {touched.phone && errors.phone && (
              <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>
            )}
          </div>

          {/* Email Row */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-primary mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={personalData.email || ""}
                onChange={(e) => setPersonalData({ email: e.target.value })}
                onBlur={() => handleBlur("email")}
                placeholder="john@example.com"
                className={inputClass("email")}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-primary mb-1.5">
                Confirm Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={personalData.confirmEmail || ""}
                onChange={(e) => setPersonalData({ confirmEmail: e.target.value })}
                onBlur={() => handleBlur("confirmEmail")}
                placeholder="john@example.com"
                className={inputClass("confirmEmail")}
              />
              {touched.confirmEmail && errors.confirmEmail && (
                <p className="text-red-500 text-xs mt-1.5">{errors.confirmEmail}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Sticky Summary ────────────────────────────────── */}
      <div className="w-full lg:w-80 xl:w-xl shrink-0">
        <SummarySidebar 
          buttonAction="payment" 
          buttonText="Continue to Payment" 
          onContinueOverride={handlePaymentMock}
        />
      </div>
    </div>
  );
}
