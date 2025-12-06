"use client";

import { useState, ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import {
  AmazonDSPVisual,
  RelayFreightVisual,
  FBAVisual,
  ParcelB2CVisual,
  TransportNetworkVisual,
  WarehouseVisual,
} from "./ServiceVisuals";

interface ServiceItem {
  title: string;
  description: string;
}

interface Service {
  id: string;
  title: string;
  contextBlurb: string;
  items: ServiceItem[];
  Visual: ComponentType;
}

const services: Service[] = [
  {
    id: "01",
    title: "AMAZON DSP LOGISTICS",
    Visual: AmazonDSPVisual,
    contextBlurb:
      "End-to-end operational support for Delivery Service Partners. We bridge the gap between Amazon's rigorous compliance standards and the practical realities of running a profitable fleet.",
    items: [
      {
        title: "Acquisition & Launch Strategy",
        description:
          "Interview coaching, financial vetting, and 'Business-in-a-Box' infrastructure setup.",
      },
      {
        title: "Scorecard & Profitability",
        description:
          "Systems to hit 'Fantastic Plus', reduce DCR defects, and maximize per-route bonuses.",
      },
      {
        title: "Crisis & Asset Management",
        description:
          "Rapid interim staffing, damage tracking protocols, and lease liability reduction.",
      },
    ],
  },
  {
    id: "02",
    title: "AMAZON RELAY & FREIGHT",
    Visual: RelayFreightVisual,
    contextBlurb:
      "Optimization for the Amazon Middle Mile. We help carriers secure consistent freight, protect their safety ratings, and ensure their trucks aren't moving air.",
    items: [
      {
        title: "Relay Onboarding & Load Board",
        description:
          "Authority setup, Amazon compliance, and tender strategies to reduce deadhead miles.",
      },
      {
        title: "Safety & Audit Defense",
        description:
          "DOT audit preparation, ELD monitoring, and BASIC score repair to prevent revocation.",
      },
      {
        title: "Fleet & Lane Strategy",
        description:
          "Asset utilization analysis and dedicated contract negotiation to stabilize revenue.",
      },
    ],
  },
  {
    id: "03",
    title: "AMAZON FBA",
    Visual: FBAVisual,
    contextBlurb:
      "For brands scaling on Amazon. We align your inventory logistics with marketplace demand to protect margins and ensure you never run out of stock during peak.",
    items: [
      {
        title: "Marketplace Growth (PPC)",
        description:
          "Seller Central SEO, listing optimization, and PPC ad strategies to boost rank.",
      },
      {
        title: "Inventory & Inbound Planning",
        description:
          "FBA margin analysis, restock limit forecasting, and peak season prep.",
      },
      {
        title: "Brand & Returns Recovery",
        description:
          "Account health protection and reverse logistics grading to recover capital from returns.",
      },
    ],
  },
  {
    id: "04",
    title: "PARCEL SHIPPING B2C PERFORMANCE",
    Visual: ParcelB2CVisual,
    contextBlurb:
      "Optimizing the direct-to-consumer experience. We audit every invoice, eliminate empty miles, and engineer a network that delivers faster than the competition.",
    items: [
      {
        title: "Strategic Network Design",
        description:
          "Optimizing injections, load utilization, and transit times for B2C/B2B flows at best-in-class carrier rates.",
      },
      {
        title: "Invoice Audit & Verification",
        description:
          "Eliminating the 2-10% average carrier overcharge through automated invoice auditing and error recovery.",
      },
      {
        title: "Round Trip Design",
        description:
          "Zero tolerance for zero-load drive time. We build broker-backed return loops to maximize driver utility.",
      },
    ],
  },
  {
    id: "05",
    title: "TRANSPORTATION NETWORK OPTIMIZATION",
    Visual: TransportNetworkVisual,
    contextBlurb:
      "Designing resilient logistics networks for B2B and B2C flows. We engineer routes that minimize empty miles and maximize asset utility.",
    items: [
      {
        title: "Network Topology Design",
        description:
          "Domestic and cross-border node analysis to shorten transit times and operational costs.",
      },
      {
        title: "Round Trip Design",
        description:
          "Zero tolerance for zero-load drive time. We design broker-backed return loops to maximize driver utility.",
      },
      {
        title: "Route Engineering",
        description:
          "Logic-based path optimization to reduce fuel consumption and driver hours.",
      },
    ],
  },
  {
    id: "06",
    title: "WAREHOUSE INVENTORY & CONTROL",
    Visual: WarehouseVisual,
    contextBlurb:
      "Inside the four walls. We streamline how goods move through your facility, ensuring inventory accuracy and operational throughput.",
    items: [
      {
        title: "Inventory Accuracy & Control",
        description:
          "Cycle count protocols and shrinkage reduction strategies to ensure 99.9% stock fidelity.",
      },
      {
        title: "Supply & Demand Planning",
        description:
          "Algorithmic forecasting to align procurement with market velocity, preventing stockouts and overstock.",
      },
      {
        title: "WMS & Tech Integration",
        description:
          "Selecting and implementing the right Warehouse Management Systems for real-time visibility.",
      },
    ],
  },
];

interface ServicesProps {
  onBookCall?: () => void;
}

export default function Services({ onBookCall }: ServicesProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="bg-white py-24 sm:py-32"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 sm:mb-20"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#DC2626]" aria-hidden="true" />
            <span className="font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-[0.2em] text-[#DC2626]">
              Services
            </span>
          </div>
          <h2
            id="services-heading"
            className="font-[family-name:var(--font-mono)] text-4xl font-bold uppercase leading-[1.1] tracking-tight text-[#0A0A0A] sm:text-5xl lg:text-6xl"
          >
            End-to-end
            <br />
            <span className="text-[#DC2626]">solutions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden border border-zinc-200"
        >
          <div className="hidden items-center justify-between bg-zinc-950 px-4 py-4 sm:flex sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 lg:gap-8">
              <span className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-zinc-500">
                ID
              </span>
              <span className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-zinc-500">
                Service
              </span>
            </div>
            <span className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-zinc-500">
              Expand
            </span>
          </div>

          <div className="divide-y divide-zinc-200">
            {services.map((service) => {
              const isActive = activeId === service.id;
              const { Visual } = service;

              return (
                <article
                  key={service.id}
                  className={`transition-colors duration-300 ${isActive ? "bg-zinc-950" : "bg-white"}`}
                >
                  <button
                    onClick={() => setActiveId(isActive ? null : service.id)}
                    className={`group flex w-full items-center justify-between px-4 py-4 text-left transition-colors sm:px-6 sm:py-6 lg:px-8 lg:py-7 ${
                      isActive ? "bg-zinc-950" : "bg-white hover:bg-zinc-50"
                    }`}
                    aria-expanded={isActive}
                    aria-controls={`service-content-${service.id}`}
                  >
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                      <span
                        className={`hidden font-[family-name:var(--font-mono)] text-base font-normal tabular-nums sm:block sm:text-lg ${
                          isActive ? "text-zinc-500" : "text-zinc-400"
                        }`}
                      >
                        {service.id}
                      </span>
                      <h3
                        className={`font-[family-name:var(--font-mono)] text-base font-bold uppercase tracking-tight sm:text-xl lg:text-2xl ${
                          isActive ? "text-white" : "text-[#0A0A0A]"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center border transition-colors sm:h-12 sm:w-12 ${
                        isActive
                          ? "border-zinc-700 text-white"
                          : "border-[#0A0A0A] text-[#0A0A0A] group-hover:border-[#DC2626] group-hover:text-[#DC2626]"
                      }`}
                    >
                      {isActive ? (
                        <Minus size={18} aria-hidden="true" />
                      ) : (
                        <Plus size={18} aria-hidden="true" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`service-content-${service.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                          opacity: { duration: 0.3, delay: 0.1 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="bg-zinc-950 px-4 pb-10 pt-6 sm:px-6 sm:pb-12 lg:px-8 lg:pb-14">
                          <div className="mb-6 h-px bg-gradient-to-r from-zinc-800 via-zinc-800 to-transparent lg:mb-8" />
                          
                          <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-12">
                            {/* LEFT COLUMN - Context, Services, Button */}
                            <div className="order-2 space-y-8 lg:order-1">
                              {/* CONTEXT */}
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                              >
                                <div className="mb-3 flex items-center gap-3">
                                  <div className="h-[2px] w-8 bg-[#DC2626]" aria-hidden="true" />
                                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                                    Context
                                  </span>
                                </div>
                                <p className="font-[family-name:var(--font-grotesk)] text-sm leading-relaxed text-zinc-400 sm:text-base lg:max-w-md">
                                  {service.contextBlurb}
                                </p>
                              </motion.div>

                              {/* SERVICES */}
                              <div>
                                <div className="mb-4 flex items-center gap-3">
                                  <div className="h-[2px] w-8 bg-zinc-700" aria-hidden="true" />
                                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                                    Services
                                  </span>
                                </div>
                                <div className="space-y-4">
                                  {service.items.map((item, i) => (
                                    <motion.div
                                      key={item.title}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay: 0.3 + i * 0.1,
                                        duration: 0.4,
                                      }}
                                      className="border-l-2 border-zinc-800 py-1 pl-4 transition-colors hover:border-[#DC2626] sm:pl-5"
                                    >
                                      <h4 className="font-[family-name:var(--font-mono)] text-sm font-bold text-white sm:text-base">
                                        {item.title}
                                      </h4>
                                      <p className="mt-1 font-[family-name:var(--font-grotesk)] text-sm text-zinc-500">
                                        {item.description}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>

                                {onBookCall && (
                                  <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.4 }}
                                    onClick={onBookCall}
                                    className="mt-8 inline-flex h-11 items-center gap-2 border border-white bg-white px-5 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all active:bg-zinc-200 sm:h-12 sm:px-6 sm:text-sm sm:hover:bg-transparent sm:hover:text-white"
                                  >
                                    Discuss This Service
                                  </motion.button>
                                )}
                              </div>
                            </div>

                            {/* RIGHT COLUMN - Visual */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.25, duration: 0.4 }}
                              className="order-1 flex w-full items-center lg:order-2 lg:border-l lg:border-zinc-800/50 lg:pl-12"
                            >
                              <div className="w-full">
                                <Visual />
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
