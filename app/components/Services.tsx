"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

interface ServiceItem {
  name: string;
  description: string;
}

interface Service {
  id: string;
  title: string;
  heroMetric: string;
  heroLabel: string;
  items: ServiceItem[];
  visualization: "route" | "network" | "bars";
}

const services: Service[] = [
  {
    id: "01",
    title: "Amazon DSP Operations",
    heroMetric: "98.2%",
    heroLabel: "Scorecard Rating",
    items: [
      { 
        name: "DSP Acquisition & Launch", 
        description: "DSP interview coaching, financial vetting, and 'Business-in-a-Box' infrastructure setup for new DSP contract holders." 
      },
      { 
        name: "DSP Scorecard & Profitability", 
        description: "Systems to consistently hit 'Fantastic Plus', reduce DCR/RTS defects, and maximize DSP per-route bonuses." 
      },
      { 
        name: "DSP Crisis & Asset Control", 
        description: "Rapid DSP interim management staffing, damage tracking protocols, and end-of-lease liability reduction." 
      },
    ],
    visualization: "route",
  },
  {
    id: "02",
    title: "Amazon Relay & Freight",
    heroMetric: "500+",
    heroLabel: "Carrier Network",
    items: [
      { 
        name: "Amazon Relay & Load Board", 
        description: "Authority setup, Relay onboarding compliance, and load board strategies to reduce deadhead miles." 
      },
      { 
        name: "Safety & Audit Defense", 
        description: "DOT audit preparation, ELD monitoring, and BASIC score repair to prevent authority revocation." 
      },
      { 
        name: "Fleet & Lane Strategy", 
        description: "Dedicated contract negotiation, fuel optimization programs, and carrier network scaling." 
      },
    ],
    visualization: "network",
  },
  {
    id: "03",
    title: "Amazon FBA Growth",
    heroMetric: "99.7%",
    heroLabel: "Inventory Accuracy",
    items: [
      { 
        name: "Marketplace Growth (PPC)", 
        description: "Seller Central SEO, listing optimization, and PPC advertising management to boost rank and ROAS." 
      },
      { 
        name: "Inventory & Logistics Logic", 
        description: "FBA vs. FBM margin analysis, restock limit forecasting, and 3PL warehousing setup." 
      },
      { 
        name: "Brand & Returns Recovery", 
        description: "Account health protection, IP defense, and reverse logistics grading to recover capital from returns." 
      },
    ],
    visualization: "bars",
  },
];

function RouteEfficiencyChart({ isActive }: { isActive: boolean }) {
  return (
    <svg viewBox="0 0 400 180" className="h-full w-full">
      <line x1="50" y1="150" x2="370" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="50" y1="20" x2="50" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {[50, 130, 210, 290, 370].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="150" x2={x} y2="155" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <text x={x} y="168" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">
            {i * 2}h
          </text>
        </g>
      ))}

      {[150, 110, 70, 30].map((y, i) => (
        <g key={y}>
          <line x1="45" y1={y} x2="50" y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <text x="40" y={y + 3} textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">
            {i * 50}
          </text>
        </g>
      ))}

      <text x="210" y="182" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">
        TIME ON ROAD
      </text>
      <text x="20" y="85" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" transform="rotate(-90, 20, 85)">
        PACKAGES
      </text>

      <motion.path
        d="M 50 130 Q 90 120 130 100 T 210 70 T 290 50 T 370 35"
        fill="none"
        stroke="#DC2626"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {[
        { x: 50, y: 130 },
        { x: 130, y: 100 },
        { x: 210, y: 70 },
        { x: 290, y: 50 },
        { x: 370, y: 35 },
      ].map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="3"
          fill="#DC2626"
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.2, delay: 0.3 * i }}
        />
      ))}

      <motion.circle
        r="5"
        fill="#09090b"
        stroke="#DC2626"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={
          isActive
            ? {
                opacity: 1,
                cx: [50, 130, 210, 290, 370],
                cy: [130, 100, 70, 50, 35],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
      />
    </svg>
  );
}

function NetworkNodeMap({ isActive }: { isActive: boolean }) {
  const nodes = [
    { x: 80, y: 90, label: "HUB A" },
    { x: 200, y: 40, label: "DC" },
    { x: 320, y: 90, label: "HUB B" },
    { x: 140, y: 140, label: "SPOKE" },
    { x: 260, y: 140, label: "SPOKE" },
  ];

  const connections = [
    [0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [3, 4],
  ];

  return (
    <svg viewBox="0 0 400 180" className="h-full w-full">
      {connections.map(([from, to], i) => (
        <motion.line
          key={`${from}-${to}`}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeDasharray="4 2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        />
      ))}

      {nodes.map((node, i) => (
        <g key={i}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={i === 1 ? 12 : 8}
            fill={i === 1 ? "#DC2626" : "#09090b"}
            stroke={i === 1 ? "#DC2626" : "rgba(255,255,255,0.4)"}
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
          />
          <motion.text
            x={node.x}
            y={node.y + 24}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="8"
            fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
          >
            {node.label}
          </motion.text>
        </g>
      ))}

      {isActive && (
        <motion.circle
          r="4"
          fill="#DC2626"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            cx: [nodes[0].x, nodes[1].x, nodes[1].x, nodes[2].x, nodes[2].x],
            cy: [nodes[0].y, nodes[1].y, nodes[1].y, nodes[2].y, nodes[2].y],
          }}
          transition={{
            duration: 3,
            delay: 1,
            repeat: Infinity,
            repeatDelay: 0.5,
            times: [0, 0.3, 0.5, 0.8, 1],
          }}
        />
      )}

      <motion.text
        x="350"
        y="170"
        textAnchor="end"
        fill="rgba(255,255,255,0.4)"
        fontSize="8"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2 }}
      >
        LIVE TRACKING
      </motion.text>
    </svg>
  );
}

function InventoryBarChart({ isActive }: { isActive: boolean }) {
  const bars = [
    { height: 70, label: "SKU A", optimal: true },
    { height: 95, label: "SKU B", optimal: true },
    { height: 45, label: "SKU C", optimal: false },
    { height: 85, label: "SKU D", optimal: true },
    { height: 110, label: "SKU E", optimal: false },
  ];

  const breakEvenY = 60;

  return (
    <svg viewBox="0 0 400 180" className="h-full w-full">
      <line x1="40" y1="150" x2="380" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="40" y1="20" x2="40" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {[150, 110, 70, 30].map((y, i) => (
        <g key={y}>
          <line x1="35" y1={y} x2="40" y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <text x="30" y={y + 3} textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">
            {i * 250}
          </text>
        </g>
      ))}

      <text x="15" y="85" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" transform="rotate(-90, 15, 85)">
        UNITS
      </text>

      {bars.map((bar, i) => {
        const x = 60 + i * 65;
        const barHeight = bar.height;
        return (
          <g key={i}>
            <motion.rect
              x={x}
              y={150 - barHeight}
              width="45"
              height={barHeight}
              fill={bar.optimal ? "rgba(255,255,255,0.15)" : "#DC2626"}
              initial={{ scaleY: 0 }}
              animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              style={{ originY: 1, transformBox: "fill-box" }}
            />
            <motion.text
              x={x + 22.5}
              y="165"
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="8"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
            >
              {bar.label}
            </motion.text>
          </g>
        );
      })}

      <motion.line
        x1="55"
        y1={150 - breakEvenY}
        x2="375"
        y2={150 - breakEvenY}
        stroke="#DC2626"
        strokeWidth="1"
        strokeDasharray="8 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      />

      <motion.g
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2 }}
      >
        <text x="58" y={150 - breakEvenY - 6} textAnchor="start" fill="#DC2626" fontSize="8" fontFamily="monospace" fontWeight="bold">
          BREAK-EVEN
        </text>
      </motion.g>
    </svg>
  );
}

function ServiceVisualization({ type, isActive }: { type: "route" | "network" | "bars"; isActive: boolean }) {
  switch (type) {
    case "route":
      return <RouteEfficiencyChart isActive={isActive} />;
    case "network":
      return <NetworkNodeMap isActive={isActive} />;
    case "bars":
      return <InventoryBarChart isActive={isActive} />;
  }
}

interface ServicesProps {
  onBookCall?: () => void;
}

export default function Services({ onBookCall }: ServicesProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="services" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 sm:mb-20"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#DC2626]" />
            <span className="font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-[0.2em] text-[#DC2626]">
              Services
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-mono)] text-4xl font-bold uppercase leading-[1.1] tracking-tight text-[#0A0A0A] sm:text-5xl lg:text-6xl">
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
          className="border-2 border-[#0A0A0A]"
        >
          <div className="grid grid-cols-[auto_1fr_auto_auto] items-center bg-zinc-950 px-6 py-4 sm:px-8">
            <span className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-zinc-500">
              ID
            </span>
            <span className="pl-6 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-zinc-500 sm:pl-8">
              Service
            </span>
            <span className="pr-6 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-zinc-500 sm:pr-10">
              Metric
            </span>
            <span className="w-12" />
          </div>

          {services.map((service) => {
            const isActive = activeId === service.id;

            return (
              <article key={service.id} className={`border-b-2 last:border-b-0 ${isActive ? "border-zinc-800" : "border-[#E5E5E5]"}`}>
                <button
                  onClick={() => toggleService(service.id)}
                  className={`grid w-full grid-cols-[auto_1fr_auto_auto] items-center px-6 py-8 text-left transition-all sm:px-8 sm:py-10 ${
                    isActive ? "bg-zinc-950" : "bg-white hover:bg-[#FAFAFA]"
                  }`}
                >
                  <span className={`font-[family-name:var(--font-mono)] text-xl font-bold sm:text-2xl ${isActive ? "text-[#DC2626]" : "text-[#0A0A0A]"}`}>
                    {service.id}
                  </span>
                  <div className="pl-6 sm:pl-8">
                    <span className={`font-[family-name:var(--font-mono)] text-lg font-bold uppercase tracking-tight sm:text-xl lg:text-2xl ${
                      isActive ? "text-white" : "text-[#0A0A0A]"
                    }`}>
                      {service.title}
                    </span>
                  </div>
                  <div className="pr-6 text-right sm:pr-10">
                    <span className={`block font-[family-name:var(--font-mono)] text-2xl font-bold tabular-nums sm:text-3xl lg:text-4xl ${
                      isActive ? "text-white" : "text-[#0A0A0A]"
                    }`}>
                      {service.heroMetric}
                    </span>
                    <span className={`block font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider sm:text-sm ${
                      isActive ? "text-zinc-500" : "text-[#737373]"
                    }`}>
                      {service.heroLabel}
                    </span>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center border-2 ${
                    isActive ? "border-zinc-700 text-white" : "border-[#0A0A0A] text-[#0A0A0A]"
                  }`}>
                    {isActive ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="bg-zinc-950 px-6 pb-12 pt-4 sm:px-8 sm:pb-16">
                        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                          <div className="space-y-8">
                            <span className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
                              // Services Manifest
                            </span>
                            <div className="space-y-6">
                              {service.items.map((item, i) => (
                                <motion.div
                                  key={item.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 + i * 0.1 }}
                                  className="border-l-2 border-[#DC2626] pl-6"
                                >
                                  <span className="block font-[family-name:var(--font-mono)] text-base text-white sm:text-lg">
                                    <span className="text-[#DC2626]">{`>`}</span> {item.name}
                                  </span>
                                  <span className="mt-1 block font-[family-name:var(--font-grotesk)] text-base text-zinc-400 sm:text-lg">
                                    {item.description}
                                  </span>
                                </motion.div>
                              ))}
                            </div>

                            {onBookCall && (
                              <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                onClick={onBookCall}
                                className="mt-8 inline-flex h-12 items-center gap-3 bg-white px-6 font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider text-zinc-950 transition-colors hover:bg-zinc-200"
                              >
                                Book Strategy Call
                                <ArrowRight size={18} />
                              </motion.button>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <span className="mb-6 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
                              // {service.visualization === "route" && "Route Efficiency"}
                              {service.visualization === "network" && "Carrier Network"}
                              {service.visualization === "bars" && "Inventory Levels"}
                            </span>
                            <div className="flex-1 min-h-[240px] sm:min-h-[280px]">
                              <ServiceVisualization type={service.visualization} isActive={isActive} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
