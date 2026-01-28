import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface WelcomeEmailProps {
  email?: string
  firstName?: string
  leadMagnet?: string
  downloadUrl?: string
}

export function WelcomeEmail({
  email = "developer@example.com",
  firstName,
  leadMagnet,
  downloadUrl,
}: WelcomeEmailProps) {
  const previewText = leadMagnet
    ? `Your ${leadMagnet} is ready for download!`
    : "Welcome to Six1Five Devs!"

  const greeting = firstName ? `Hey ${firstName}!` : "Hey there!"

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            {leadMagnet ? "Your Download is Ready!" : "Welcome to Six1Five Devs!"}
          </Heading>

          {leadMagnet && downloadUrl ? (
            <>
              <Text style={text}>
                {greeting} Thanks for subscribing! Here&apos;s your <strong>{leadMagnet}</strong>:
              </Text>
              <Section style={buttonContainer}>
                <Link href={downloadUrl} style={button}>
                  Download Now
                </Link>
              </Section>
              <Text style={textMuted}>
                This link expires in 7 days. If the button doesn&apos;t work, copy and paste this URL:
                <br />
                <Link href={downloadUrl} style={link}>
                  {downloadUrl.length > 60 ? `${downloadUrl.substring(0, 60)}...` : downloadUrl}
                </Link>
              </Text>
              <Hr style={hr} />
            </>
          ) : null}

          <Text style={text}>
            {!leadMagnet && greeting} You&apos;re now subscribed to Six1Five Devs. Here&apos;s what you can expect:
          </Text>

          <Text style={list}>
            <strong>Weekly build logs</strong> - Raw, honest updates on what I&apos;m shipping
            <br />
            <strong>Product launches</strong> - Early access to new tools
            <br />
            <strong>Guides & tutorials</strong> - Deep dives on tech I use daily
          </Text>

          <Text style={text}>
            In the meantime, check out what I&apos;m building:
          </Text>

          <Section style={buttonContainer}>
            <Link href="https://six1five.dev/tools" style={buttonOutline}>
              Explore Tools
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            You received this email because you subscribed at six1five.dev.
            <br />
            <Link href="https://six1five.dev/unsubscribe" style={link}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail

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
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 24px",
}

const text = {
  color: "#e4e4e7",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
}

const textMuted = {
  color: "#71717a",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "16px 0",
}

const list = {
  color: "#a1a1aa",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
  paddingLeft: "16px",
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "24px 0",
}

const button = {
  backgroundColor: "#14b8a6",
  borderRadius: "6px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
}

const buttonOutline = {
  backgroundColor: "transparent",
  border: "1px solid #27272a",
  borderRadius: "6px",
  color: "#14b8a6",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
}

const hr = {
  borderColor: "#27272a",
  margin: "32px 0",
}

const link = {
  color: "#14b8a6",
  textDecoration: "underline",
}

const footer = {
  color: "#52525b",
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center" as const,
}
