import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Six1Five Devs website and products.",
}

export default function TermsPage() {
  return (
    <div className="container-page section">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>Agreement to Terms</h2>
            <p>
              By accessing six1five.dev, you agree to be bound by these Terms of Service.
              If you disagree with any part of these terms, you may not access the website.
            </p>
          </section>

          <section>
            <h2>Intellectual Property</h2>
            <p>
              The content on this website, including text, graphics, logos, and code snippets
              in articles, is owned by Six1Five Devs unless otherwise stated. Code examples
              in tutorials and guides are provided under the MIT License unless specified otherwise.
            </p>
          </section>

          <section>
            <h2>User Responsibilities</h2>
            <p>When using our website, you agree to:</p>
            <ul>
              <li>Not attempt to gain unauthorized access to any part of the site</li>
              <li>Not use the site for any unlawful purpose</li>
              <li>Not reproduce or redistribute content without permission</li>
            </ul>
          </section>

          <section>
            <h2>Products and Services</h2>
            <p>
              Our products (SubSense, AppPilot, etc.) have their own terms of service
              available on their respective websites. This document covers only the
              six1five.dev informational website.
            </p>
          </section>

          <section>
            <h2>Disclaimer</h2>
            <p>
              The information on this website is provided &quot;as is&quot; without warranties of any kind.
              We do not guarantee the accuracy, completeness, or usefulness of any information.
              Code examples are for educational purposes and should be reviewed before use in production.
            </p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              Six1Five Devs shall not be liable for any damages arising from the use or
              inability to use this website or any content provided herein.
            </p>
          </section>

          <section>
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the
              website after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Questions about these terms? Contact us at{" "}
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
