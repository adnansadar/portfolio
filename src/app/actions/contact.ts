"use server";

import {
  contactSchema,
  type ContactResult,
  type ContactValues,
} from "@/lib/contact-schema";
import { site } from "@/content/site";

/**
 * Sends the contact form via Resend's REST API — called directly with fetch so
 * the project doesn't take on an SDK dependency for one request.
 *
 * With no RESEND_API_KEY set the action reports `unconfigured` rather than
 * failing, and the form falls back to offering a mailto link. That keeps the
 * site working out of the box; adding the env var is the whole upgrade.
 */
export async function sendContactMessage(
  values: ContactValues
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return {
      ok: false,
      reason: "invalid",
      message: "Those details didn't validate. Mind checking them?",
    };
  }

  // A filled honeypot means a bot. Report success so it doesn't retry.
  if (parsed.data.company) return { ok: true };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return {
      ok: false,
      reason: "unconfigured",
      message: "Email isn't wired up yet — reach me directly instead.",
    };
  }

  const { name, email, message } = parsed.data;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [site.email],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the message", await response.text());
      return {
        ok: false,
        reason: "failed",
        message: "That didn't go through. Try again, or email me directly.",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("Contact form request failed", error);
    return {
      ok: false,
      reason: "failed",
      message: "That didn't go through. Try again, or email me directly.",
    };
  }
}
