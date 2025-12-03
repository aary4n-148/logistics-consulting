"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    id: "01",
    value: "50+",
    label: "Fleets Optimized",
    description: "DSP and delivery networks",
  },
  {
    id: "02",
    value: "$12M+",
    label: "Spend Managed",
    description: "In annual logistics costs",
  },
  {
    id: "03",
    value: "98%",
    label: "Client Retention",
    description: "Long-term partnerships",
  },
  {
    id: "04",
    value: "15%",
    label: "Avg. Cost Reduction",
    description: "Within first 90 days",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function SocialProof() {
  return (
    <section id="about" className="bg-[#0A0A0A] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#DC2626]" />
            <span className="font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-[0.2em] text-[#DC2626]">
              About
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-mono)] text-4xl font-bold uppercase leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Proven
            <br />
            <span className="text-[#DC2626]">performance</span>
          </h2>
          <p className="mt-6 max-w-xl font-[family-name:var(--font-grotesk)] text-lg text-[#737373] sm:text-xl">
            We deliver measurable impact for every client we partner with.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid border-t border-[#262626] sm:grid-cols-2 lg:grid-cols-4"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              className={`group border-b border-[#262626] p-8 transition-colors hover:bg-[#1A1A1A] ${
                index < 3 ? "lg:border-r" : ""
              } ${index < 2 ? "sm:border-r" : ""} ${index === 2 ? "sm:border-r-0 lg:border-r" : ""}`}
            >
              <span className="mb-6 block font-[family-name:var(--font-mono)] text-xs text-[#525252]">
                {metric.id}
              </span>
              <span className="mb-2 block font-[family-name:var(--font-mono)] text-4xl font-bold tabular-nums text-white sm:text-5xl">
                {metric.value}
              </span>
              <span className="mb-1 block font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider text-[#DC2626]">
                {metric.label}
              </span>
              <span className="block font-[family-name:var(--font-grotesk)] text-sm text-[#525252]">
                {metric.description}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
