"use client";

import { useEffect } from "react";
import { initPostHog } from "@/app/lib/posthog";

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initPostHog();
  }, []);

  return <>{children}</>;
}
