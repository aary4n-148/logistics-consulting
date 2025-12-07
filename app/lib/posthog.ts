import posthog from "posthog-js";

let initialized = false;

export function initPostHog() {
  if (typeof window === "undefined") return;
  if (initialized) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (key) {
    posthog.init(key, {
      api_host: host || "https://us.i.posthog.com",
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          posthog.debug();
        }
      },
    });
    initialized = true;
  }
}

export function trackLeadSubmitted(properties: {
  name: string;
  email: string;
  service_category: string;
}) {
  if (typeof window === "undefined") return;
  
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) {
    console.log("[PostHog] Skipping event - no API key configured");
    return;
  }

  posthog.capture("lead_submitted", properties);
}

export { posthog };
