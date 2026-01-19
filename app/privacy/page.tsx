import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Six1Five Devs - how we collect, use, and protect your data.",
}

export default function PrivacyPage() {
  return (
    <div className="container-page section">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>Overview</h2>
            <p>
              Six1Five Devs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates six1five.dev.
              This page informs you of our policies regarding the collection, use, and disclosure of
              personal information when you use our website.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <h3>Analytics Data</h3>
            <p>
              We use Vercel Analytics to collect anonymous usage data including page views,
              referrer information, and general geographic location. This data cannot be used
              to identify individual users.
            </p>
            <h3>Newsletter Subscription</h3>
            <p>
              If you subscribe to our newsletter, we collect your email address. We use this
              solely to send you updates about our content and products. You can unsubscribe
              at any time.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              We use essential cookies for theme preferences (light/dark mode). We do not use
              tracking cookies or sell your data to third parties.
            </p>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Vercel</strong> - Hosting and analytics</li>
              <li><strong>GitHub</strong> - Code hosting (if you interact with our repositories)</li>
            </ul>
          </section>

          <section>
            <h2>Affiliate Links</h2>
            <p>
              Some links on our site are affiliate links. When you click these links and make a
              purchase, we may earn a commission at no extra cost to you. These are clearly
              disclosed on our <a href="/resources" className="text-primary hover:underline">Resources</a> page.
            </p>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information.
              Contact us at the email below for any privacy-related requests.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For privacy questions, contact us at{" "}
              <a href="mailto:hello@six1five.dev" className="text-primary hover:underline">
                hello@six1five.dev
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
