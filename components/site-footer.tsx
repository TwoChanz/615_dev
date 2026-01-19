import Link from "next/link"
import { Terminal, Github, Twitter } from "lucide-react"

const navigation = {
  main: [
    { name: "Tools", href: "/tools" },
    { name: "Labs", href: "/labs" },
    { name: "Guides", href: "/guides" },
    { name: "Resources", href: "/resources" },
    { name: "Blog", href: "/blog" },
  ],
  secondary: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "RSS", href: "/feed.xml" },
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
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-page py-12 lg:py-16">
        {/* Main footer content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Terminal className="size-4" />
              </div>
              <span className="font-semibold tracking-tight">Six1Five Devs</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Building in public. Shipping real tools. Documenting the journey for developers and indie hackers.
            </p>
            
            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  aria-label={item.name}
                >
                  <item.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:justify-end lg:gap-16">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Explore</h3>
              <ul className="mt-4 space-y-3">
                {navigation.main.map((item) => (
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
              <h3 className="text-sm font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-3">
                {navigation.secondary.map((item) => (
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
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
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
            {" "}and{" "}
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
