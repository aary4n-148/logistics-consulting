"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#0A0A0A]/90"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 mx-4 w-full max-w-3xl overflow-hidden border border-[#1A1A1A] bg-white"
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendly-modal-title"
          >
            <div className="flex items-center justify-between border-b border-[#1A1A1A] px-6 py-4">
              <div>
                <span className="block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#525252]">
                  Booking
                </span>
                <h2
                  id="calendly-modal-title"
                  className="font-[family-name:var(--font-mono)] text-lg font-bold uppercase text-[#0A0A0A]"
                >
                  Strategy Call
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center border border-[#1A1A1A] text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-white"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="h-[600px] w-full">
              <iframe
                src="https://calendly.com/mapxlogistics/strategy"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a strategy call with MapxLogistics"
                className="bg-white"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
