import { eq, and, gte, lte, desc } from "drizzle-orm";
import { consultationSlots, reservations, ConsultationSlot, Reservation, InsertReservation } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Get available consultation slots for a given date range
 */
export async function getAvailableSlots(startDate: string, endDate: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const slots = await db
    .select()
    .from(consultationSlots)
    .where(
      and(
        gte(consultationSlots.date, startDate),
        lte(consultationSlots.date, endDate),
        eq(consultationSlots.isAvailable, 1)
      )
    )
    .orderBy(consultationSlots.date, consultationSlots.startTime);

  return slots.map(slot => ({
    ...slot,
    available: slot.capacity - slot.booked
  }));
}

/**
 * Get all slots for a specific date
 */
export async function getSlotsByDate(date: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const slots = await db
    .select()
    .from(consultationSlots)
    .where(
      and(
        eq(consultationSlots.date, date),
        eq(consultationSlots.isAvailable, 1)
      )
    )
    .orderBy(consultationSlots.startTime);

  return slots.map(slot => ({
    ...slot,
    available: slot.capacity - slot.booked
  }));
}

/**
 * Create a new reservation
 */
export async function createReservation(data: InsertReservation): Promise<Reservation> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Start transaction
  const result = await db.transaction(async (tx) => {
    // Check if slot exists and has availability
    const slot = await tx
      .select()
      .from(consultationSlots)
      .where(eq(consultationSlots.id, data.slotId))
      .limit(1);

    if (!slot || slot.length === 0) {
      throw new Error("Slot not found");
    }

    const currentSlot = slot[0];
    if (currentSlot.booked >= currentSlot.capacity) {
      throw new Error("Slot is full");
    }

    if (!currentSlot.isAvailable) {
      throw new Error("Slot is not available");
    }

    // Create reservation
    const insertResult = await tx.insert(reservations).values(data);

    // Update slot booking count
    await tx
      .update(consultationSlots)
      .set({ booked: currentSlot.booked + 1 })
      .where(eq(consultationSlots.id, data.slotId));

    // Get the last inserted ID
    const allReservations = await tx
      .select()
      .from(reservations)
      .orderBy(desc(reservations.id))
      .limit(1);

    return allReservations[0];
  });

  return result;
}

/**
 * Get reservations for a specific slot
 */
export async function getReservationsBySlot(slotId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db
    .select()
    .from(reservations)
    .where(eq(reservations.slotId, slotId))
    .orderBy(desc(reservations.createdAt));
}

/**
 * Get all reservations
 */
export async function getAllReservations() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db
    .select()
    .from(reservations)
    .orderBy(desc(reservations.createdAt));
}

/**
 * Update reservation status
 */
export async function updateReservationStatus(id: number, status: "pending" | "confirmed" | "cancelled" | "completed") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(reservations)
    .set({ status })
    .where(eq(reservations.id, id));
}

/**
 * Cancel a reservation and free up the slot
 */
export async function cancelReservation(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.transaction(async (tx) => {
    // Get the reservation
    const reservation = await tx
      .select()
      .from(reservations)
      .where(eq(reservations.id, id))
      .limit(1);

    if (!reservation || reservation.length === 0) {
      throw new Error("Reservation not found");
    }

    const res = reservation[0];

    // Update reservation status
    await tx
      .update(reservations)
      .set({ status: "cancelled" })
      .where(eq(reservations.id, id));

    // Decrease slot booking count
    const slot = await tx
      .select()
      .from(consultationSlots)
      .where(eq(consultationSlots.id, res.slotId))
      .limit(1);

    if (slot && slot.length > 0) {
      await tx
        .update(consultationSlots)
        .set({ booked: Math.max(0, slot[0].booked - 1) })
        .where(eq(consultationSlots.id, res.slotId));
    }
  });
}

/**
 * Initialize default consultation slots (for admin)
 */
export async function initializeDefaultSlots() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Generate slots for the next 30 days
  const today = new Date();
  const slots = [];

  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    // Morning slots: 09:00, 10:00, 11:00
    for (let hour = 9; hour < 12; hour++) {
      slots.push({
        date: dateStr,
        startTime: `${hour.toString().padStart(2, '0')}:00`,
        endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
        capacity: 2,
        booked: 0,
        isAvailable: 1,
      });
    }

    // Afternoon slots: 14:00, 15:00, 16:00
    for (let hour = 14; hour < 17; hour++) {
      slots.push({
        date: dateStr,
        startTime: `${hour.toString().padStart(2, '0')}:00`,
        endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
        capacity: 2,
        booked: 0,
        isAvailable: 1,
      });
    }
  }

  // Insert slots
  if (slots.length > 0) {
    await db.insert(consultationSlots).values(slots);
  }

  return slots.length;
}
