"use client";

import Link from "next/link";

import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { ResumeButton } from "@/components/resume-button";
import { contact, site } from "@/content/site";

export function Contact() {
  return (
    <Reveal
      as="section"
      id="contact"
      variant="wipeUp"
      amount={0.1}
      className="relative overflow-hidden border-t border-white/[0.07]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[280px] left-1/2 h-[520px] w-[min(900px,140vw)] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,.08), transparent 62%)",
        }}
      />

      <div className="shell relative grid items-start gap-[clamp(36px,5vw,64px)] pt-[clamp(72px,11vh,120px)] pb-[clamp(40px,6vh,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
        <div className="min-w-0">
          <h2 className="max-w-[20ch] text-[clamp(30px,4.6vw,64px)] leading-none font-black tracking-[-0.035em] text-balance">
            {contact.heading}
          </h2>
          <p className="mt-5 max-w-[46ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-ink-400">
            {contact.blurb}
          </p>

          <div className="mt-[30px]">
            <ResumeButton size="2xl" meta="↓ PDF" />
          </div>

          <div className="mt-[30px] flex flex-wrap gap-[22px] text-[15px]">
            {site.socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-ink-400 transition-colors hover:text-white"
              >
                {social.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="text-ink-400 transition-colors hover:text-white"
            >
              {site.email}
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </Reveal>
  );
}
