import Link from "next/link"
import { Github, Twitter, Rss, Mail } from "lucide-react"
import { BrandLogo } from "@/components/icons/brand-logo"
import { FooterNewsletter } from "@/components/footer-newsletter"

const navigation = {
  explore: [
    { name: "Tools", href: "/tools" },
    { name: "Labs", href: "/labs" },
    { name: "Guides", href: "/guides" },
    { name: "Resources", href: "/resources" },
    { name: "Blog", href: "/blog" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "RSS Feed", href: "/feed.xml" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/six1five",
      icon: Github,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/six1five",
      icon: Twitter,
    },
    {
      name: "RSS",
      href: "/feed.xml",
      icon: Rss,
    },
    {
      name: "Email",
      href: "mailto:hello@six1five.dev",
      icon: Mail,
    },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-muted/40 to-muted/20">
      <div className="container-page py-14 lg:py-20">
        {/* Main footer content */}
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <BrandLogo size="sm" showText />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Building in public. Shipping real tools. Documenting the journey for developers and indie hackers.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-2">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  aria-label={item.name}
                >
                  <item.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-foreground">Explore</h3>
              <ul className="mt-5 space-y-3">
                {navigation.explore.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-wide text-foreground">Company</h3>
              <ul className="mt-5 space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-wide text-foreground">Legal</h3>
              <ul className="mt-5 space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter column */}
          <div className="lg:col-span-1">
            <FooterNewsletter />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-10 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Six1Five Devs. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Next.js
            </Link>
            {" "}&bull;{" "}Deployed on{" "}
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Vercel
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
