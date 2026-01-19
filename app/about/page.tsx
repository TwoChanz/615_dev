import type { Metadata } from "next"
import Link from "next/link"
import { Terminal, ArrowRight, Github, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NewsletterForm } from "@/components/newsletter-form"

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Six1Five Devs. Building in public, shipping real tools, and documenting the entire journey.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <Terminal className="size-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            About Six1Five Devs
          </h1>
        </div>

        {/* Main Content */}
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Six1Five Devs is my corner of the internet where I build things, 
            break things, and document everything along the way. It&apos;s a 
            developer brand built on transparency and shipping.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">The Philosophy</h2>
          <p className="text-muted-foreground leading-relaxed">
            I believe the best way to learn is by doing, and the best way to 
            grow is by sharing. Every tool I build, every experiment I run, 
            and every lesson I learn gets documented here. No gatekeeping, no 
            fluff&mdash;just real insights from real builds.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">What I&apos;m Building</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
              <span>
                <strong className="text-foreground">SubSense</strong> &mdash; An 
                AI-powered subscription tracker helping people manage recurring 
                payments and cut unwanted subscriptions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
              <span>
                <strong className="text-foreground">AppPilot</strong> &mdash; A 
                SaaS boilerplate that helps developers launch faster with 
                pre-built auth, billing, and dashboard components.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
              <span>
                <strong className="text-foreground">This Site</strong> &mdash; A 
                content hub for guides, build logs, and resources for other 
                indie hackers and developers.
              </span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">The Stack</h2>
          <p className="text-muted-foreground leading-relaxed">
            Everything I build runs on a modern TypeScript stack. Next.js for 
            the frontend, Vercel for hosting, Supabase or Neon for databases, 
            and Stripe for payments. I&apos;m a big believer in using boring, 
            proven technology and focusing energy on solving actual problems.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Building in Public</h2>
          <p className="text-muted-foreground leading-relaxed">
            I share revenue numbers, user metrics, and honest post-mortems on 
            what works and what doesn&apos;t. Following along means you get to 
            see behind the curtain&mdash;the wins, the failures, and everything 
            in between.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Connect</h2>
          <p className="text-muted-foreground leading-relaxed">
            I&apos;m always happy to chat about building products, indie 
            hacking, or tech in general. Find me on the platforms below or 
            subscribe to the newsletter for weekly updates.
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <a
              href="https://github.com/six1five"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 size-4" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://twitter.com/six1five"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="mr-2 size-4" />
              Twitter
            </a>
          </Button>
          <Button asChild>
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        {/* Newsletter */}
        <div className="mt-16">
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}
