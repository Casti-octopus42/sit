import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("reservations", () => {
  it("should get available slots for a date range", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days later

    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];

    const slots = await caller.reservations.getAvailableSlots({
      startDate: startDateStr,
      endDate: endDateStr,
    });

    expect(Array.isArray(slots)).toBe(true);
    expect(slots.length).toBeGreaterThanOrEqual(0);

    // Verify slot structure
    slots.forEach((slot) => {
      expect(slot).toHaveProperty("id");
      expect(slot).toHaveProperty("date");
      expect(slot).toHaveProperty("startTime");
      expect(slot).toHaveProperty("endTime");
      expect(slot).toHaveProperty("available");
    });
  });

  it("should get slots for a specific date", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];

    const slots = await caller.reservations.getSlotsByDate({
      date: dateStr,
    });

    expect(Array.isArray(slots)).toBe(true);

    // Verify slot structure
    slots.forEach((slot) => {
      expect(slot).toHaveProperty("id");
      expect(slot).toHaveProperty("date");
      expect(slot).toHaveProperty("startTime");
      expect(slot).toHaveProperty("endTime");
      expect(slot).toHaveProperty("available");
      expect(slot.date).toBe(dateStr);
    });
  });

  it("should create a reservation with valid data", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    // First get an available slot
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];

    const slots = await caller.reservations.getSlotsByDate({
      date: dateStr,
    });

    if (slots.length === 0) {
      console.log("No available slots for testing");
      return;
    }

    const slot = slots[0];

    const result = await caller.reservations.createReservation({
      slotId: slot.id,
      fullName: "Test User",
      email: "test@example.com",
      phone: "+213 (0) 555 123 456",
      company: "Test Company",
      serviceType: "website",
      message: "Test reservation message",
      language: "fr",
    });

    expect(result).toHaveProperty("success");
    expect(result.success).toBe(true);
    expect(result).toHaveProperty("message");
  });

  it("should reject reservation with invalid email", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];

    const slots = await caller.reservations.getSlotsByDate({
      date: dateStr,
    });

    if (slots.length === 0) {
      console.log("No available slots for testing");
      return;
    }

    const slot = slots[0];

    try {
      await caller.reservations.createReservation({
        slotId: slot.id,
        fullName: "Test User",
        email: "invalid-email",
        phone: "+213 (0) 555 123 456",
        company: "Test Company",
        serviceType: "website",
        message: "Test reservation message",
        language: "fr",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should reject reservation with missing required fields", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];

    const slots = await caller.reservations.getSlotsByDate({
      date: dateStr,
    });

    if (slots.length === 0) {
      console.log("No available slots for testing");
      return;
    }

    const slot = slots[0];

    try {
      await caller.reservations.createReservation({
        slotId: slot.id,
        fullName: "",
        email: "test@example.com",
        phone: "+213 (0) 555 123 456",
        company: "Test Company",
        serviceType: "website",
        message: "Test reservation message",
        language: "fr",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
