import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import {
  getAvailableSlots,
  getSlotsByDate,
  createReservation,
  getReservationsBySlot,
  getAllReservations,
  updateReservationStatus,
  cancelReservation,
  initializeDefaultSlots,
} from "../db-reservations";
import { notifyOwner } from "../_core/notification";
import { sendReservationConfirmationEmail } from "../_core/email";

export const reservationsRouter = router({
  /**
   * Get available slots for a date range
   */
  getAvailableSlots: publicProcedure
    .input(
      z.object({
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      })
    )
    .query(async ({ input }) => {
      return getAvailableSlots(input.startDate, input.endDate);
    }),

  /**
   * Get slots for a specific date
   */
  getSlotsByDate: publicProcedure
    .input(
      z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      })
    )
    .query(async ({ input }) => {
      return getSlotsByDate(input.date);
    }),

  /**
   * Create a new reservation
   */
  createReservation: publicProcedure
    .input(
      z.object({
        slotId: z.number().int().positive(),
        fullName: z.string().min(2).max(255),
        email: z.string().email(),
        phone: z.string().min(5).max(20),
        company: z.string().max(255).optional(),
        serviceType: z.string().min(1).max(100),
        message: z.string().max(1000).optional(),
        language: z.enum(["fr", "ar"]).default("fr"),
      })
    )
    .mutation(async ({ input }) => {
      const reservation = await createReservation({
        slotId: input.slotId,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        company: input.company,
        serviceType: input.serviceType,
        message: input.message,
        language: input.language,
        status: "pending",
      });

      // Notify owner
      const language = input.language === "ar" ? "ar" : "fr";
      const title = language === "ar" ? "حجز استشارة جديد" : "Nouvelle réservation";
      const content =
        language === "ar"
          ? `تم حجز استشارة جديدة من ${input.fullName} (${input.email})`
          : `Nouvelle réservation de consultation de ${input.fullName} (${input.email})`;

      await notifyOwner({ title, content });

      // Send confirmation email to customer
      // Get the slot information to extract date and time
      const slots = await getSlotsByDate(input.slotId.toString());
      const slotInfo = slots.find(s => s.id === input.slotId);
      
      if (slotInfo) {
        const slotDate = slotInfo.date || new Date().toISOString().split('T')[0];
        await sendReservationConfirmationEmail({
          fullName: input.fullName,
          email: input.email,
          date: slotDate,
          time: `${slotInfo.startTime}-${slotInfo.endTime}`,
          serviceType: input.serviceType,
          company: input.company,
          language: input.language,
        });
      }

      return reservation;
    }),

  /**
   * Get reservations for a slot
   */
  getReservationsBySlot: publicProcedure
    .input(z.object({ slotId: z.number().int().positive() }))
    .query(async ({ input }) => {
      return getReservationsBySlot(input.slotId);
    }),

  /**
   * Get all reservations (admin only)
   */
  getAllReservations: publicProcedure.query(async () => {
    return getAllReservations();
  }),

  /**
   * Update reservation status
   */
  updateReservationStatus: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
      })
    )
    .mutation(async ({ input }) => {
      await updateReservationStatus(input.id, input.status);
      return { success: true };
    }),

  /**
   * Cancel a reservation
   */
  cancelReservation: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await cancelReservation(input.id);
      return { success: true };
    }),

  /**
   * Initialize default slots (admin only)
   */
  initializeDefaultSlots: publicProcedure.mutation(async () => {
    const count = await initializeDefaultSlots();
    return { success: true, slotsCreated: count };
  }),
});
