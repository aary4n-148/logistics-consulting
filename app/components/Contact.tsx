"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

interface ContactProps {
  onBookCall: () => void;
}

export default function Contact({ onBookCall }: ContactProps) {
  return (
    <section
      id="contact"
      className="bg-[#FAFAFA] py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-[#DC2626]" aria-hidden="true" />
              <span className="font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-[0.2em] text-[#DC2626]">
                Contact
              </span>
            </div>
            <h2
              id="contact-heading"
              className="mb-8 font-[family-name:var(--font-mono)] text-4xl font-bold uppercase leading-[1.1] tracking-tight text-[#0A0A0A] sm:text-5xl lg:text-6xl"
            >
              Ready to
              <br />
              <span className="text-[#DC2626]">optimize?</span>
            </h2>
            <p className="mb-12 max-w-lg font-[family-name:var(--font-grotesk)] text-xl text-[#525252] sm:text-2xl">
              Book a free 30-minute strategy call. We&apos;ll analyze your
              current operations and identify opportunities for immediate
              improvement.
            </p>

            <address className="not-italic">
              <div className="flex items-center gap-6">
                <div
                  className="flex h-14 w-14 items-center justify-center border-2 border-[#1A1A1A] bg-white"
                  aria-hidden="true"
                >
                  <Mail size={24} className="text-[#0A0A0A]" />
                </div>
                <div>
                  <span className="block font-[family-name:var(--font-grotesk)] text-base text-[#525252]">
                    Email us
                  </span>
                  <a
                    href="mailto:info@mapxlogistics.com"
                    className="font-[family-name:var(--font-mono)] text-lg font-bold text-[#0A0A0A] underline decoration-[#DC2626] decoration-2 underline-offset-4 transition-colors active:text-[#DC2626] sm:no-underline sm:hover:text-[#DC2626]"
                    aria-label="Send email to info@mapxlogistics.com"
                  >
                    info@mapxlogistics.com
                  </a>
                </div>
              </div>
            </address>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="border-2 border-[#1A1A1A] bg-white p-10 sm:p-12 lg:p-14">
              <span className="mb-3 block font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-[0.2em] text-[#525252]">
                Booking
              </span>
              <h3 className="mb-6 font-[family-name:var(--font-mono)] text-2xl font-bold uppercase text-[#0A0A0A] sm:text-3xl">
                Schedule a call
              </h3>
              <p className="mb-8 font-[family-name:var(--font-grotesk)] text-lg text-[#525252]">
                Select a time that works for you. We&apos;ll discuss your
                logistics challenges and how we can help.
              </p>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onBookCall}
                className="group inline-flex h-14 w-full items-center justify-center gap-3 bg-[#0A0A0A] px-8 font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider text-white transition-colors active:bg-[#DC2626] sm:text-base sm:hover:bg-[#1A1A1A]"
                aria-label="Book a free strategy call with MapxLogistics"
              >
                Book Strategy Call
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.button>

              <p className="mt-6 text-center font-[family-name:var(--font-grotesk)] text-sm text-[#737373]">
                Free consultation · No obligation
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
