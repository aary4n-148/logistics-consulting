"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroBackground from "./HeroBackground";

interface HeroProps {
  onBookCall: () => void;
}

export default function Hero({ onBookCall }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-[#FAFAFA]"
      aria-labelledby="hero-heading"
    >
      <HeroBackground />

      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-24 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl"
        >
          <span className="mb-3 inline-block border border-[#1A1A1A] bg-white px-4 py-1.5 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-[0.15em] text-[#0A0A0A]">
            Supply Chain & DSP Consulting
          </span>

          <h1
            id="hero-heading"
            className="mb-6 font-[family-name:var(--font-mono)] text-4xl font-bold uppercase leading-[0.95] tracking-tight text-[#0A0A0A] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Precision logistics
            <br />
            <span className="text-[#DC2626]">Maximum efficiency.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl font-[family-name:var(--font-grotesk)] text-lg text-[#525252] sm:text-xl">
            We help DSPs and supply chain operators optimize their fleets,
            reduce costs, and scale operations with data-driven strategies.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onBookCall}
              className="group inline-flex h-14 w-full items-center justify-center gap-2 bg-[#0A0A0A] px-6 font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider text-white transition-colors active:bg-[#DC2626] sm:h-12 sm:w-auto sm:hover:bg-[#1A1A1A]"
              aria-label="Book a free strategy call with our logistics consultants"
            >
              Book Strategy Call
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </motion.button>

            <a
              href="#services"
              className="inline-flex h-14 w-full items-center justify-center border-2 border-[#1A1A1A] bg-white px-6 font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider text-[#0A0A0A] transition-colors active:bg-[#0A0A0A] active:text-white sm:h-12 sm:w-auto sm:border sm:hover:bg-[#0A0A0A] sm:hover:text-white"
              aria-label="Explore our logistics consulting services"
            >
              Explore Services
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[#737373]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-8 w-[1px] bg-[#1A1A1A]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
