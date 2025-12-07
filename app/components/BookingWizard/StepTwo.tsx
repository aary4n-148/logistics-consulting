"use client";

import { motion } from "framer-motion";
import { ServiceCategoryId } from "./StepOne";

interface Question {
  id: string;
  label: string;
  type: "text" | "select";
  placeholder?: string;
  options?: string[];
}

const SERVICE_QUESTIONS: Record<ServiceCategoryId, Question[]> = {
  "amazon-dsp": [
    {
      id: "fleet_size",
      label: "Current Fleet Size",
      type: "select",
      options: [
        "Applying for a contract (New Owner)",
        "1 – 20 Vans",
        "20 – 40 Vans",
        "40+ Vans",
      ],
    },
    {
      id: "primary_challenge",
      label: "Primary Challenge",
      type: "select",
      options: [
        "Launch Strategy: Interview prep & financial setup",
        "Scorecards: Hitting \"Fantastic Plus\" & bonuses",
        "Fleet Health: Managing damages & maintenance costs",
        "Staffing: Driver acquisition & retention",
      ],
    },
    {
      id: "station_code",
      label: "Your Station Code (e.g., DLA4 or 'New')",
      type: "text",
      placeholder: "DLA4",
    },
  ],
  "amazon-relay": [
    {
      id: "authority_status",
      label: "Fleet Authority Status",
      type: "select",
      options: [
        "No Authority yet (Aspiring)",
        "Owner Operator (1 Truck)",
        "Small Fleet (2 – 10 Trucks)",
        "Mid-Large Fleet (10+ Trucks)",
      ],
    },
    {
      id: "primary_objective",
      label: "Primary Objective",
      type: "select",
      options: [
        "Relay Access: Getting accepted & load board setup",
        "Safety Defense: Fixing safety scores or DOT audits",
        "Lane Strategy: Reducing empty miles & finding dedicated runs",
        "Expansion: Scaling fleet size & revenue",
      ],
    },
    {
      id: "dot_number",
      label: "DOT Number (for safety analysis)",
      type: "text",
      placeholder: "1234567",
    },
  ],
  "amazon-fba": [
    {
      id: "monthly_revenue",
      label: "Monthly Revenue",
      type: "select",
      options: [
        "Launching / Pre-Revenue",
        "$1k – $20k / mo",
        "$20k – $100k / mo",
        "$100k+ / mo",
      ],
    },
    {
      id: "growth_barrier",
      label: "Biggest Growth Barrier",
      type: "select",
      options: [
        "Marketplace Growth: Ranking, PPC & Ad profitability",
        "Operations: Inventory limits & inbound planning",
        "Account Health: Suspension appeals or listing fixes",
        "Recovery: Reimbursements & returns management",
      ],
    },
    {
      id: "store_link",
      label: "Link to your main product or storefront",
      type: "text",
      placeholder: "https://amazon.com/dp/...",
    },
  ],
  "parcel-b2c": [
    {
      id: "shipment_volume",
      label: "Monthly Shipment Volume",
      type: "select",
      options: [
        "< 1,000 packages/mo",
        "1,000 – 10,000 packages/mo",
        "10,000 – 50,000 packages/mo",
        "50,000+ packages/mo",
      ],
    },
    {
      id: "main_priority",
      label: "Main Priority",
      type: "select",
      options: [
        "Cost Reduction: Negotiating better carrier rates",
        "Auditing: Recovering refunds from invoice errors",
        "Speed: Optimizing network for faster delivery",
        "Efficiency: Streamlining the shipping process",
      ],
    },
    {
      id: "company_website",
      label: "Company Website URL",
      type: "text",
      placeholder: "https://yourcompany.com",
    },
  ],
  "transport-network": [
    {
      id: "freight_spend",
      label: "Annual Freight Spend",
      type: "select",
      options: [
        "Under $1M",
        "$1M – $10M",
        "$10M – $50M",
        "$50M+",
      ],
    },
    {
      id: "optimization_goal",
      label: "Optimization Goal",
      type: "select",
      options: [
        "Network Topology: Redesigning shipping nodes/lanes",
        "Route Engineering: Finding the most direct/cheapest paths",
        "Asset Utilization: Reducing deadhead (empty miles)",
        "Cost Control: General supply chain expense reduction",
      ],
    },
    {
      id: "hq_location",
      label: "Company HQ Location (City, State)",
      type: "text",
      placeholder: "Los Angeles, CA",
    },
  ],
  warehouse: [
    {
      id: "facility_size",
      label: "Facility Size",
      type: "select",
      options: [
        "Under 10,000 sq ft",
        "10,000 – 50,000 sq ft",
        "50,000 – 100,000 sq ft",
        "100,000+ sq ft",
      ],
    },
    {
      id: "operational_bottleneck",
      label: "Operational Bottleneck",
      type: "select",
      options: [
        "Accuracy: Discrepancies, theft, or counting errors",
        "Tech Stack: WMS selection & integration",
        "Planning: Forecasting demand to prevent stock-outs",
        "Throughput: Speeding up pick, pack, and ship",
      ],
    },
    {
      id: "current_software",
      label: "Current WMS/ERP (e.g. NetSuite, SAP, Excel)",
      type: "text",
      placeholder: "NetSuite",
    },
  ],
};

export interface StepTwoData {
  answers: Record<string, string>;
}

interface StepTwoProps {
  serviceCategory: ServiceCategoryId;
  data: StepTwoData;
  onChange: (data: StepTwoData) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function StepTwo({
  serviceCategory,
  data,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
}: StepTwoProps) {
  const questions = SERVICE_QUESTIONS[serviceCategory] || [];

  const handleChange = (questionId: string, value: string) => {
    onChange({
      answers: {
        ...data.answers,
        [questionId]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
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
      {questions.map((question) => (
        <div key={question.id}>
          <label
            htmlFor={question.id}
            className="mb-2 block font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-[#525252]"
          >
            {question.label}
          </label>

          {question.type === "select" && question.options && (
            <select
              id={question.id}
              value={data.answers[question.id] || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
              className={`h-12 w-full border border-[#D4D4D4] bg-white px-4 font-[family-name:var(--font-grotesk)] text-[#0A0A0A] outline-none transition-colors focus:border-[#DC2626] ${
                !data.answers[question.id] ? "text-zinc-400" : ""
              }`}
            >
              <option value="" disabled>
                Select an option...
              </option>
              {question.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {question.type === "text" && (
            <input
              type="text"
              id={question.id}
              value={data.answers[question.id] || ""}
              onChange={(e) => handleChange(question.id, e.target.value)}
              className="h-12 w-full border border-[#D4D4D4] bg-white px-4 font-[family-name:var(--font-grotesk)] text-[#0A0A0A] outline-none transition-colors focus:border-[#DC2626]"
              placeholder={question.placeholder}
            />
          )}
        </div>
      ))}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex h-12 flex-1 items-center justify-center border border-[#D4D4D4] bg-white font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider text-[#0A0A0A] transition-colors active:bg-zinc-100 disabled:opacity-50 sm:hover:bg-zinc-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 flex-1 items-center justify-center border border-[#0A0A0A] bg-[#0A0A0A] font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider text-white transition-colors disabled:opacity-50 sm:hover:bg-[#DC2626] sm:hover:border-[#DC2626]"
        >
          {isSubmitting ? "Submitting..." : "Book Strategy Call"}
        </button>
      </div>
    </motion.form>
  );
}
