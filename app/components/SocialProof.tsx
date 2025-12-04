"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    id: "01",
    value: "FANTASTIC +",
    label: "SCORECARD CONSISTENCY",
    description: "Cost optimization & bonus capture focus.",
  },
  {
    id: "02",
    value: "$20M+",
    label: "ROUTE REVENUE MANAGED",
    description: "High-volume logistics execution.",
  },
  {
    id: "03",
    value: "0%",
    label: "FBA INBOUND DENIAL RATE",
    description: "Flawless inventory acceptance record.",
  },
  {
    id: "04",
    value: "10%+",
    label: "AVG. RATE REDUCTION",
    description: "Simultaneous speed & cost improvement.",
  },
  {
    id: "05",
    value: "8-12x",
    label: "INVENTORY TURNOVER (ITA)",
    description: "Dead stock identification & liquidation.",
  },
  {
    id: "06",
    value: "100%",
    label: "OPTIMIZATION GUARANTEE",
    description: "Network structure resilience.",
  },
];


export default function SocialProof() {
  return (
    <section
      id="about"
      className="bg-[#0A0A0A] py-24 sm:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 lg:mb-20"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#DC2626]" aria-hidden="true" />
            <span className="font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-[0.2em] text-[#DC2626]">
              About
            </span>
          </div>
          <h2
            id="about-heading"
            className="font-[family-name:var(--font-mono)] text-4xl font-bold uppercase leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Proven
            <br />
            <span className="text-[#DC2626]">performance</span>
          </h2>
          <p className="mt-6 max-w-2xl font-[family-name:var(--font-grotesk)] text-lg leading-relaxed text-[#A3A3A3] sm:text-xl">
            We combine large-scale project management with deep regulatory expertise. 
            Every engagement is tailored to enhance efficiency, protect quality, and 
            accelerate sustainable growth across your supply chain.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 border-t border-[#262626] sm:grid-cols-2 lg:grid-cols-3"
        >
          {metrics.map((metric, index) => {
            const isLastInRowLg = (index + 1) % 3 === 0;
            const isLastInRowSm = (index + 1) % 2 === 0;
            const isBottomRow = index >= 3;
            
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className={`
                  group relative border-b border-[#262626] p-6 transition-all duration-300
                  hover:bg-[#111111]
                  sm:p-8
                  ${!isLastInRowSm ? "sm:border-r" : ""}
                  lg:border-r-0
                  ${!isLastInRowLg ? "lg:border-r lg:border-[#262626]" : ""}
                  ${isBottomRow ? "lg:border-b-0" : ""}
                `}
              >
                <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#DC2626] transition-transform duration-300 group-hover:scale-y-100" />
                
                <span className="mb-4 block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] text-[#525252]">
                  {metric.id}
                </span>
                
                <span className="mb-3 block font-[family-name:var(--font-mono)] text-3xl font-bold tabular-nums tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {metric.value}
                </span>
                
                <span className="mb-2 block font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.15em] text-[#DC2626] sm:text-sm">
                  {metric.label}
                </span>
                
                <span className="block font-[family-name:var(--font-grotesk)] text-sm leading-relaxed text-[#737373]">
                  {metric.description}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
