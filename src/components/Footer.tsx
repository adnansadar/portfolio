"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { cn } from "@/lib/utils";
import { typographyStyles, layoutStyles } from "@/design-system";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/adnansadar",
    icon: faGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/adnansadar/",
    icon: faLinkedin,
  },
  {
    name: "Email",
    href: "mailto:adnansadar11@gmail.com",
    icon: faEnvelope,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className={cn(layoutStyles.container, "py-8")}>
        <div className={layoutStyles.flexBetween}>
          <span className={typographyStyles.bodySmall}>
            © {currentYear} Adnan Sadar
          </span>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`Connect with me on ${link.name}`}
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
