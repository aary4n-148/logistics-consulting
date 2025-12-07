"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import StepIndicator from "./StepIndicator";
import StepOne, { StepOneData, SERVICE_CATEGORIES } from "./StepOne";
import StepTwo, { StepTwoData } from "./StepTwo";
import { supabase } from "@/app/lib/supabase";
import { trackLeadSubmitted } from "@/app/lib/posthog";

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const CALENDLY_URL = "https://calendly.com/mapxlogistics/strategy";

export default function BookingWizard({ isOpen, onClose }: BookingWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepOneData, setStepOneData] = useState<StepOneData>({
    name: "",
    email: "",
    phone: "",
    serviceCategory: "",
  });
  const [stepTwoData, setStepTwoData] = useState<StepTwoData>({
    answers: {},
  });
  const [errors, setErrors] = useState<Partial<Record<keyof StepOneData, string>>>({});

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

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setStepOneData({ name: "", email: "", phone: "", serviceCategory: "" });
      setStepTwoData({ answers: {} });
      setErrors({});
    }
  }, [isOpen]);

  const validateStepOne = (): boolean => {
    const newErrors: Partial<Record<keyof StepOneData, string>> = {};

    if (!stepOneData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!stepOneData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepOneData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!stepOneData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!stepOneData.serviceCategory) {
      newErrors.serviceCategory = "Please select a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepOneNext = () => {
    if (validateStepOne()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const serviceLabel =
        SERVICE_CATEGORIES.find((c) => c.id === stepOneData.serviceCategory)?.label ||
        stepOneData.serviceCategory;

      const { error } = await supabase.from("leads").insert({
        name: stepOneData.name.trim(),
        email: stepOneData.email.trim(),
        phone: stepOneData.phone.trim(),
        service_category: serviceLabel,
        follow_up_answers: stepTwoData.answers,
      });

      if (error) {
        console.error("Failed to insert lead:", error);
        alert("Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      trackLeadSubmitted({
        name: stepOneData.name,
        email: stepOneData.email,
        service_category: serviceLabel,
      });

      const params = new URLSearchParams({
        name: stepOneData.name,
        email: stepOneData.email,
      });

      window.location.href = `${CALENDLY_URL}?${params.toString()}`;
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

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
            className="relative z-10 mx-4 w-full max-w-lg overflow-hidden border border-[#1A1A1A] bg-white"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wizard-modal-title"
          >
            <div className="flex items-center justify-between border-b border-[#1A1A1A] px-6 py-4">
              <div>
                <span className="block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#525252]">
                  Step {step} of 2
                </span>
                <h2
                  id="wizard-modal-title"
                  className="font-[family-name:var(--font-mono)] text-lg font-bold uppercase text-[#0A0A0A]"
                >
                  {step === 1 ? "Your Information" : "Tell Us More"}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <StepIndicator currentStep={step} totalSteps={2} />
                <button
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center border border-[#1A1A1A] text-[#0A0A0A] transition-colors active:bg-[#0A0A0A] active:text-white sm:hover:bg-[#0A0A0A] sm:hover:text-white"
                  aria-label="Close modal"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <StepOne
                    key="step-one"
                    data={stepOneData}
                    onChange={setStepOneData}
                    onNext={handleStepOneNext}
                    errors={errors}
                  />
                )}
                {step === 2 && stepOneData.serviceCategory && (
                  <StepTwo
                    key="step-two"
                    serviceCategory={stepOneData.serviceCategory}
                    data={stepTwoData}
                    onChange={setStepTwoData}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
