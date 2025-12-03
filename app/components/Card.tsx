"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "group relative overflow-hidden rounded-none border border-[#1A1A1A] bg-[#FAFAFA] transition-all duration-200 hover:bg-[#0A0A0A] hover:text-white",
  {
    variants: {
      size: {
        medium: "p-6 sm:p-8",
        large: "p-6 sm:p-8 md:col-span-2 md:row-span-1",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export interface CardProps
  extends Omit<HTMLMotionProps<"div">, "size">,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ size }), className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export { Card, cardVariants };
