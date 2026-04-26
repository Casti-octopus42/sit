import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import { reservationsRouter } from "./routers/reservations";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().optional(),
        company: z.string().optional(),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(1, "Message is required"),
      }))
      .mutation(async ({ input }) => {
        // Send notification to owner
        await notifyOwner({
          title: `Nouveau message de contact: ${input.subject}`,
          content: `De: ${input.name} (${input.email})\nEntreprise: ${input.company || 'N/A'}\nTéléphone: ${input.phone || 'N/A'}\n\nMessage:\n${input.message}`,
        });

        return {
          success: true,
          message: "Your message has been sent successfully",
        };
      }),
  }),

  reservations: reservationsRouter,
});

export type AppRouter = typeof appRouter;
