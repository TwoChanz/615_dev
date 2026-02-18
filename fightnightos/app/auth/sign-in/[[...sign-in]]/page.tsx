/**
 * Sign-In Page
 *
 * The [[...sign-in]] folder name is a Next.js "catch-all" route.
 * It matches /auth/sign-in AND any sub-paths like /auth/sign-in/factor-two.
 * Clerk needs this to handle multi-step auth flows (2FA, password reset, etc.)
 *
 * The <SignIn /> component is provided by Clerk — it renders the entire
 * sign-in form with email, social logins, and password fields.
 */
import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <SignIn
        appearance={{
          elements: {
            // Style Clerk's UI to match our dark fight theme
            rootBox: "mx-auto",
            card: "bg-[var(--card)] border border-[var(--border)]",
          },
        }}
      />
    </div>
  )
}
