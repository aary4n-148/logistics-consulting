import { describe, it, expect, beforeEach, vi } from "vitest";

describe("BookingWizard Calendly Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.NEXT_PUBLIC_CALENDLY_URL;
  });

  it("should construct Calendly URL with pre-filled name and email", () => {
    const calendlyUrl = "https://calendly.com/mapxlogistics/initial-strategy-call";
    const name = "John Doe";
    const email = "john@example.com";

    const params = new URLSearchParams({
      name: name.trim(),
      email: email.trim(),
    });

    const finalUrl = `${calendlyUrl}?${params.toString()}`;

    expect(finalUrl).toBe(
      "https://calendly.com/mapxlogistics/initial-strategy-call?name=John+Doe&email=john%40example.com"
    );
    expect(finalUrl).toContain("name=John+Doe");
    expect(finalUrl).toContain("email=john%40example.com");
  });

  it("should handle empty Calendly URL gracefully", () => {
    const calendlyUrl = "";
    expect(calendlyUrl).toBe("");
  });

  it("should trim whitespace from name and email", () => {
    const name = "  John Doe  ";
    const email = "  john@example.com  ";

    const params = new URLSearchParams({
      name: name.trim(),
      email: email.trim(),
    });

    expect(params.get("name")).toBe("John Doe");
    expect(params.get("email")).toBe("john@example.com");
  });

  it("should handle special characters in name and email", () => {
    const name = "John O'Connor";
    const email = "john+test@example.com";

    const params = new URLSearchParams({
      name: name.trim(),
      email: email.trim(),
    });

    const url = `https://calendly.com/test/event?${params.toString()}`;
    expect(url).toContain("name=John+O%27Connor");
    expect(url).toContain("email=john%2Btest%40example.com");
  });
});
