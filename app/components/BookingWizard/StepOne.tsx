"use client";

import { motion } from "framer-motion";

export const SERVICE_CATEGORIES = [
  { id: "amazon-dsp", label: "Amazon DSP Logistics" },
  { id: "amazon-relay", label: "Amazon Relay & Freight" },
  { id: "amazon-fba", label: "Amazon FBA" },
  { id: "parcel-b2c", label: "Parcel Shipping B2C Performance" },
  { id: "transport-network", label: "Transportation Network Optimization" },
  { id: "warehouse", label: "Warehouse Inventory & Control" },
] as const;

export type ServiceCategoryId = (typeof SERVICE_CATEGORIES)[number]["id"];

export interface StepOneData {
  name: string;
  email: string;
  phone: string;
  serviceCategory: ServiceCategoryId | "";
}

interface StepOneProps {
  data: StepOneData;
  onChange: (data: StepOneData) => void;
  onNext: () => void;
  errors: Partial<Record<keyof StepOneData, string>>;
}

export default function StepOne({
  data,
  onChange,
  onNext,
  errors,
}: StepOneProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-[#525252]"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className={`h-12 w-full border bg-white px-4 font-[family-name:var(--font-grotesk)] text-[#0A0A0A] outline-none transition-colors focus:border-[#DC2626] ${
            errors.name ? "border-[#DC2626]" : "border-[#D4D4D4]"
          }`}
          placeholder="John Smith"
        />
        {errors.name && (
          <p className="mt-1 font-[family-name:var(--font-grotesk)] text-xs text-[#DC2626]">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-[#525252]"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          className={`h-12 w-full border bg-white px-4 font-[family-name:var(--font-grotesk)] text-[#0A0A0A] outline-none transition-colors focus:border-[#DC2626] ${
            errors.email ? "border-[#DC2626]" : "border-[#D4D4D4]"
          }`}
          placeholder="john@company.com"
        />
        {errors.email && (
          <p className="mt-1 font-[family-name:var(--font-grotesk)] text-xs text-[#DC2626]">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-[#525252]"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          className={`h-12 w-full border bg-white px-4 font-[family-name:var(--font-grotesk)] text-[#0A0A0A] outline-none transition-colors focus:border-[#DC2626] ${
            errors.phone ? "border-[#DC2626]" : "border-[#D4D4D4]"
          }`}
          placeholder="(555) 123-4567"
        />
        {errors.phone && (
          <p className="mt-1 font-[family-name:var(--font-grotesk)] text-xs text-[#DC2626]">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="serviceCategory"
          className="mb-2 block font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-[#525252]"
        >
          Service Category
        </label>
        <select
          id="serviceCategory"
          value={data.serviceCategory}
          onChange={(e) =>
            onChange({
              ...data,
              serviceCategory: e.target.value as ServiceCategoryId | "",
            })
          }
          className={`h-12 w-full border bg-white px-4 font-[family-name:var(--font-grotesk)] text-[#0A0A0A] outline-none transition-colors focus:border-[#DC2626] ${
            errors.serviceCategory ? "border-[#DC2626]" : "border-[#D4D4D4]"
          } ${!data.serviceCategory ? "text-zinc-400" : ""}`}
        >
          <option value="" disabled>
            Select a service...
          </option>
          {SERVICE_CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.serviceCategory && (
          <p className="mt-1 font-[family-name:var(--font-grotesk)] text-xs text-[#DC2626]">
            {errors.serviceCategory}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 flex h-12 w-full items-center justify-center border border-[#0A0A0A] bg-[#0A0A0A] font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider text-white transition-colors active:bg-white active:text-[#0A0A0A] sm:hover:bg-white sm:hover:text-[#0A0A0A]"
      >
        Continue
      </button>
    </motion.form>
  );
}
