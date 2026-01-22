import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface ContactNotificationProps {
  name: string
  email: string
  subject?: string
  message: string
  submittedAt?: string
}

export function ContactNotification({
  name = "John Doe",
  email = "john@example.com",
  subject = "General Inquiry",
  message = "Hello, I wanted to reach out about...",
  submittedAt = new Date().toISOString(),
}: ContactNotificationProps) {
  const previewText = `New contact from ${name}: ${subject || "No subject"}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Contact Form Submission</Heading>

          <Section style={section}>
            <Text style={label}>From</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
          </Section>

          {subject && (
            <Section style={section}>
              <Text style={label}>Subject</Text>
              <Text style={value}>{subject}</Text>
            </Section>
          )}

          <Section style={section}>
            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Submitted at {new Date(submittedAt).toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default ContactNotification

// Styles
const main = {
  backgroundColor: "#0a0a0f",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
}

const container = {
  backgroundColor: "#111118",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
  borderRadius: "8px",
}

const heading = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 24px",
}

const section = {
  margin: "16px 0",
}

const label = {
  color: "#71717a",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 4px",
}

const value = {
  color: "#e4e4e7",
  fontSize: "16px",
  margin: "0",
}

const messageText = {
  color: "#e4e4e7",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
  backgroundColor: "#18181b",
  padding: "16px",
  borderRadius: "6px",
  whiteSpace: "pre-wrap" as const,
}

const hr = {
  borderColor: "#27272a",
  margin: "24px 0",
}

const footer = {
  color: "#52525b",
  fontSize: "12px",
}
