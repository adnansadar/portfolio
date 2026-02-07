"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";
import {
  typographyStyles,
  layoutStyles,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "@/design-system";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const contactLinks = [
  {
    name: "Email",
    href: "mailto:adnansadar11@gmail.com",
    icon: faEnvelope,
    label: "adnansadar11@gmail.com",
  },
  {
    name: "GitHub",
    href: "https://github.com/adnansadar",
    icon: faGithub,
    label: "@adnansadar",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/adnansadar/",
    icon: faLinkedin,
    label: "/in/adnansadar",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.location.href = `mailto:adnansadar11@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}`;
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={cn(layoutStyles.section, "bg-muted/30")}>
      <div className={layoutStyles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <h2 className={cn(typographyStyles.h2, "mb-12 text-center")}>
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left: Contact Info */}
            <motion.div variants={fadeInLeft} className="space-y-8">
              <div>
                <h3 className={cn(typographyStyles.h5, "mb-4")}>
                  Let&apos;s Connect
                </h3>
                <p
                  className={cn(typographyStyles.body, "text-muted-foreground")}
                >
                  I&apos;m always open to discussing new projects, creative
                  ideas, or opportunities to be part of your vision. Feel free
                  to reach out through the form or via any of the links below.
                </p>
              </div>

              <div className="space-y-4">
                {contactLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:bg-muted/50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <FontAwesomeIcon
                        icon={link.icon}
                        className="h-5 w-5 text-foreground"
                      />
                    </div>
                    <div>
                      <div
                        className={cn(
                          typographyStyles.bodySmall,
                          "font-semibold"
                        )}
                      >
                        {link.name}
                      </div>
                      <div
                        className={cn(
                          typographyStyles.bodySmall,
                          "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div variants={fadeInRight}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-red-500" : ""}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={errors.message ? "border-red-500" : ""}
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-border bg-secondary p-4"
                  >
                    <p className={typographyStyles.body}>
                      Message sent successfully! I&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-border bg-secondary p-4"
                  >
                    <p className={typographyStyles.body}>
                      Something went wrong. Please try again or email me
                      directly.
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
