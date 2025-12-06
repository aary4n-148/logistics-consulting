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
      "Complete support for Delivery Service Partners. We handle Amazon's strict rules so you can run a profitable, stress-free fleet.",
    items: [
      {
        title: "Acquisition & Launch Strategy",
        description:
          "Interview coaching, financial checks, and a complete 'Business-in-a-Box' setup for new owners.",
      },
      {
        title: "Scorecard & Profitability",
        description:
          "Systems to hit 'Fantastic Plus' scores, stop returned packages, and maximize your cash bonuses.",
      },
      {
        title: "Crisis & Asset Management",
        description:
          "Emergency staffing, daily van damage tracking, and lowering repair bills when leases end.",
      },
    ],
  },
  {
    id: "02",
    title: "AMAZON RELAY & FREIGHT",
    Visual: RelayFreightVisual,
    contextBlurb:
      "We help trucking carriers get steady work with Amazon, protect their safety ratings, and stop trucks from driving empty.",
    items: [
      {
        title: "Relay Onboarding & Load Board",
        description:
          "Get your business set up on Amazon Relay and find the best loads so you don't drive empty.",
      },
      {
        title: "Safety & Audit Defense",
        description:
          "Prepare for DOT audits and fix your safety scores so the government doesn't shut you down.",
      },
      {
        title: "Fleet & Lane Strategy",
        description:
          "Secure dedicated contracts to keep your fleet moving and your income steady.",
      },
    ],
  },
  {
    id: "03",
    title: "AMAZON FBA",
    Visual: FBAVisual,
    contextBlurb:
      "For brands selling on Amazon. We help you rank higher, sell more, and manage inventory so you don't waste money on fees.",
    items: [
      {
        title: "Marketplace Growth (PPC)",
        description:
          "Get your products to page one. We fix your listings and run ads that actually make a profit.",
      },
      {
        title: "Inventory & Inbound Planning",
        description:
          "Stop running out of stock. We forecast exactly what you need to send in so you are ready for peak season.",
      },
      {
        title: "Brand & Returns Recovery",
        description:
          "Protect your account from suspension and turn customer returns back into cash.",
      },
    ],
  },
  {
    id: "04",
    title: "PARCEL SHIPPING B2C PERFORMANCE",
    Visual: ParcelB2CVisual,
    contextBlurb:
      "We help you ship faster and cheaper. We negotiate better rates, check every bill for errors, and make sure your trucks never drive empty.",
    items: [
      {
        title: "Strategic Network Design",
        description:
          "Plan the best routes to speed up delivery and cut your shipping costs.",
      },
      {
        title: "Invoice Audit & Verification",
        description:
          "Carriers often overcharge by mistake. We check every single invoice to get your money back.",
      },
      {
        title: "Round Trip Design",
        description:
          "Stop driving empty trucks. We find paid loads for the return trip so you make money both ways.",
      },
    ],
  },
  {
    id: "05",
    title: "TRANSPORTATION NETWORK OPTIMIZATION",
    Visual: TransportNetworkVisual,
    contextBlurb:
      "We build smarter shipping networks for your business. We plan routes that cut down mileage and make sure your trucks are always making money.",
    items: [
      {
        title: "Network Topology Design",
        description:
          "Analyze your shipping map to find faster routes and lower your delivery costs.",
      },
      {
        title: "Round Trip Design",
        description:
          "Never drive an empty truck. We find paid loads for the return trip so you earn profit both ways.",
      },
      {
        title: "Route Engineering",
        description:
          "Plan the most direct path for every shipment to save on fuel and driver wages.",
      },
    ],
  },
  {
    id: "06",
    title: "WAREHOUSE INVENTORY & CONTROL",
    Visual: WarehouseVisual,
    contextBlurb:
      "We fix what happens inside your warehouse. We organize your layout to speed up shipping and stop inventory mistakes.",
    items: [
      {
        title: "Inventory Accuracy & Control",
        description:
          "Stop losing inventory. We set up strict counting rules to prevent theft and make sure your numbers are always right.",
      },
      {
        title: "Supply & Demand Planning",
        description:
          "Order exactly what you need. We use sales data to predict demand so you never run out of best-sellers or get stuck with unsold goods.",
      },
      {
        title: "WMS & Tech Integration",
        description:
          "Upgrade your technology. We help you pick and set up the right software to track every single item in real-time.",
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
