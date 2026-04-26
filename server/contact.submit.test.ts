import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("contact.submit", () => {
  it("successfully submits a contact form with all fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      phone: "+213 555 123 456",
      company: "Tech Corp",
      subject: "Website Inquiry",
      message: "I would like to discuss your services.",
    });

    expect(result).toEqual({
      success: true,
      message: "Your message has been sent successfully",
    });
  });

  it("successfully submits a contact form with minimal fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Inquiry",
      message: "I have a question.",
    });

    expect(result).toEqual({
      success: true,
      message: "Your message has been sent successfully",
    });
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "John Doe",
        email: "invalid-email",
        subject: "Test",
        message: "Test message",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Invalid email");
    }
  });

  it("rejects submission with empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "",
        email: "test@example.com",
        subject: "Test",
        message: "Test message",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Name is required");
    }
  });

  it("rejects submission with empty subject", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "John Doe",
        email: "test@example.com",
        subject: "",
        message: "Test message",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Subject is required");
    }
  });

  it("rejects submission with empty message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submit({
        name: "John Doe",
        email: "test@example.com",
        subject: "Test",
        message: "",
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Message is required");
    }
  });
});
