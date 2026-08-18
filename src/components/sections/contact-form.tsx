"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { sendContactMessage } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { contact, site } from "@/content/site";

const FIELD =
  "rounded-[11px] border-white/[0.11] bg-white/[0.02] px-4 py-3.5 text-[15px] focus-visible:border-white/[0.42] focus-visible:bg-white/[0.05]";

export function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const [fallback, setFallback] = React.useState(false);

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: ContactValues) => {
    const result = await sendContactMessage(values);

    if (result.ok) {
      setSent(true);
      setFallback(false);
      reset();
      toast.success("Message sent — I'll be in touch.");
      return;
    }

    // No mail provider configured: point them at the mailbox instead of
    // swallowing the message.
    setFallback(result.reason === "unconfigured");
    toast.error(result.message);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="panel flex min-w-0 flex-col gap-3.5 rounded-[20px] border border-white/10 p-[clamp(22px,3vw,30px)]"
    >
      <div className="font-mono text-[11px] tracking-[0.08em] text-ink-700">
        SEND A MESSAGE
      </div>

      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor="name" className="text-[13px] text-ink-400">
          Name
        </FieldLabel>
        <Input
          id="name"
          placeholder="Jane Recruiter"
          autoComplete="name"
          aria-invalid={!!errors.name}
          className={FIELD}
          {...register("name")}
        />
        <FieldError errors={[errors.name]} />
      </Field>

      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email" className="text-[13px] text-ink-400">
          Email
        </FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="jane@company.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          className={FIELD}
          {...register("email")}
        />
        <FieldError errors={[errors.email]} />
      </Field>

      <Field data-invalid={!!errors.message}>
        <FieldLabel htmlFor="message" className="text-[13px] text-ink-400">
          Message
        </FieldLabel>
        <Textarea
          id="message"
          rows={4}
          placeholder="The role, the team, the stack…"
          aria-invalid={!!errors.message}
          className={`${FIELD} resize-y`}
          {...register("message")}
        />
        <FieldError errors={[errors.message]} />
      </Field>

      {/* Honeypot. Hidden from people and from assistive tech; bots fill it. */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <Button
        type="submit"
        variant="outline"
        size="cta"
        disabled={isSubmitting}
        className="mt-1 justify-center bg-white/[0.06] text-[15px] font-bold hover:bg-white/[0.13]"
      >
        {isSubmitting ? "Sending…" : sent ? "Message sent ✓" : "Send message"}
      </Button>

      {fallback ? (
        <p className="text-[12.5px] text-ink-400">
          Email isn&apos;t configured on this deploy — reach me at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-foreground underline underline-offset-4"
          >
            {site.email}
          </a>
          .
        </p>
      ) : (
        <p className="text-[12.5px] text-ink-700">{contact.formNote}</p>
      )}
    </form>
  );
}
