import { describe, it, expect, beforeEach, vi } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";

describe("POST /api/send-email", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.CONTACT_EMAIL = "info@mapxlogistics.com";
    delete process.env.SMTP_HOST;
  });

  it("should return 400 if required fields are missing", async () => {
    const request = new NextRequest("http://localhost/api/send-email", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing required fields");
  });

  it("should return success when SMTP is not configured (development mode)", async () => {
    const request = new NextRequest("http://localhost/api/send-email", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        phone: "123-456-7890",
        serviceCategory: "Amazon DSP",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain("Email configuration not set");
  });

  it("should use CONTACT_EMAIL environment variable", async () => {
    process.env.CONTACT_EMAIL = "custom@example.com";

    const request = new NextRequest("http://localhost/api/send-email", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        phone: "123-456-7890",
        serviceCategory: "Amazon DSP",
        followUpAnswers: {
          question1: "answer1",
        },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.debug.recipientEmail).toBe("custom@example.com");
    expect(data.debug.emailBody).toContain("Test User");
    expect(data.debug.emailBody).toContain("test@example.com");
    expect(data.debug.emailBody).toContain("123-456-7890");
    expect(data.debug.emailBody).toContain("Amazon DSP");
    expect(data.debug.emailBody).toContain("question1: answer1");
  });

  it("should default to info@mapxlogistics.com if CONTACT_EMAIL is not set", async () => {
    delete process.env.CONTACT_EMAIL;

    const request = new NextRequest("http://localhost/api/send-email", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        phone: "123-456-7890",
        serviceCategory: "Amazon DSP",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.debug.recipientEmail).toBe("info@mapxlogistics.com");
  });
});
