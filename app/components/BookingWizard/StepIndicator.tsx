"use client";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={`h-2 w-2 rounded-full transition-colors ${
            step === currentStep
              ? "bg-[#DC2626]"
              : step < currentStep
                ? "bg-[#0A0A0A]"
                : "bg-zinc-300"
          }`}
          aria-label={`Step ${step} of ${totalSteps}${step === currentStep ? " (current)" : ""}`}
        />
      ))}
    </div>
  );
}
