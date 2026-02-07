import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Section,
} from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  message,
}: ContactFormEmailProps) => {
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.title}>New Contact Form Submission</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.section}>
            <Text style={styles.label}>From:</Text>
            <Text style={styles.value}>{name}</Text>
          </Section>

          <Section style={styles.section}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{email}</Text>
          </Section>

          <Section style={styles.section}>
            <Text style={styles.label}>Message:</Text>
            <Text style={styles.message}>{message}</Text>
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              This email was sent from your portfolio contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: 0,
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "40px auto",
    padding: "40px",
    borderRadius: "8px",
    maxWidth: "600px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    marginBottom: "24px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1a1a1a",
    margin: "0 0 8px 0",
  },
  timestamp: {
    fontSize: "14px",
    color: "#666666",
    margin: "0",
  },
  hr: {
    borderColor: "#e5e7eb",
    margin: "24px 0",
  },
  section: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#666666",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    margin: "0 0 4px 0",
  },
  value: {
    fontSize: "16px",
    color: "#1a1a1a",
    margin: "0",
    lineHeight: "1.5",
  },
  message: {
    fontSize: "16px",
    color: "#1a1a1a",
    margin: "0",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap" as const,
    wordWrap: "break-word" as const,
  },
  footer: {
    marginTop: "24px",
  },
  footerText: {
    fontSize: "12px",
    color: "#999999",
    margin: "0",
    textAlign: "center" as const,
  },
};

export default ContactFormEmail;
