import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name."),
  email: z.email("That email address doesn't look right."),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two about the role, please."),
  /** Honeypot — hidden from people, irresistible to bots. */
  company: z.string().max(0).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;

export type ContactResult =
  | { ok: true }
  | {
      ok: false;
      /** `unconfigured` means no mail provider key; the UI falls back to mailto. */
      reason: "invalid" | "unconfigured" | "failed";
      message: string;
    };
