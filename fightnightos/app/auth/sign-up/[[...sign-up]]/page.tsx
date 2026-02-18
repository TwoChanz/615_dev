/**
 * Sign-Up Page
 *
 * Same pattern as sign-in. The [[...sign-up]] catch-all route lets Clerk
 * handle all sign-up steps (email verification, profile setup, etc.)
 */
import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-[var(--card)] border border-[var(--border)]",
          },
        }}
      />
    </div>
  )
}
