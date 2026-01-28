import { Metadata } from "next"
import {
  LogoLoader,
  LogoLoaderInline,
  LogoLoaderOverlay,
  LogoLoaderButton,
} from "@/components/logo-loader"
import { LaptopMockup, PhoneMockup } from "@/components/laptop-mockup"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Logo Loader Demo | Six1Five Devs",
  description: "Premium 615 logo loading animation demo",
  robots: "noindex, nofollow",
}

export default function LoaderDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container-page py-8">
          <h1 className="text-3xl font-bold text-foreground">Logo Loader Demo</h1>
          <p className="mt-2 text-muted-foreground">
            Premium 615 loading animation with sequential glow pulse
          </p>
        </div>
      </div>

      <div className="container-page py-12 space-y-16">
        {/* Hero - Laptop Mockup */}
        <section className="flex flex-col items-center">
          <LaptopMockup screenBg="gradient">
            <div className="flex flex-col items-center gap-6">
              <LogoLoader size={80} />
              <p className="text-sm text-zinc-500 animate-pulse">Loading your dashboard...</p>
            </div>
          </LaptopMockup>
        </section>

        {/* Device Mockups Row */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-8 text-center">Device Previews</h2>
          <div className="flex flex-wrap items-end justify-center gap-12">
            <div className="flex flex-col items-center gap-4">
              <LaptopMockup screenBg="dark" scale={0.7}>
                <LogoLoader size={64} />
              </LaptopMockup>
              <p className="text-sm text-muted-foreground">Laptop</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <PhoneMockup screenBg="dark">
                <LogoLoader size={48} />
              </PhoneMockup>
              <p className="text-sm text-muted-foreground">Mobile</p>
            </div>
          </div>
        </section>

        {/* Size Variants */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Size Variants</h2>
          <div className="flex flex-wrap items-end gap-8 p-8 rounded-xl bg-card border border-border">
            <div className="text-center">
              <LogoLoader size={24} />
              <p className="mt-2 text-xs text-muted-foreground">24px</p>
            </div>
            <div className="text-center">
              <LogoLoader size={32} />
              <p className="mt-2 text-xs text-muted-foreground">32px</p>
            </div>
            <div className="text-center">
              <LogoLoader size={48} />
              <p className="mt-2 text-xs text-muted-foreground">48px (default)</p>
            </div>
            <div className="text-center">
              <LogoLoader size={64} />
              <p className="mt-2 text-xs text-muted-foreground">64px</p>
            </div>
            <div className="text-center">
              <LogoLoader size={96} />
              <p className="mt-2 text-xs text-muted-foreground">96px</p>
            </div>
            <div className="text-center">
              <LogoLoader size={128} />
              <p className="mt-2 text-xs text-muted-foreground">128px</p>
            </div>
          </div>
        </section>

        {/* On Different Backgrounds */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Background Compatibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center p-8 rounded-xl bg-black">
              <LogoLoader size={64} />
            </div>
            <div className="flex items-center justify-center p-8 rounded-xl bg-zinc-900">
              <LogoLoader size={64} />
            </div>
            <div className="flex items-center justify-center p-8 rounded-xl bg-white border border-border">
              <LogoLoader size={64} />
            </div>
            <div className="flex items-center justify-center p-8 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20">
              <LogoLoader size={64} />
            </div>
            <div className="flex items-center justify-center p-8 rounded-xl bg-zinc-800">
              <LogoLoader size={64} />
            </div>
            <div className="flex items-center justify-center p-8 rounded-xl bg-slate-100 border border-border">
              <LogoLoader size={64} />
            </div>
          </div>
        </section>

        {/* Inline Variant */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Inline Loading</h2>
          <div className="space-y-4 p-8 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-4">
              <LogoLoaderInline />
              <span className="text-muted-foreground">Default inline loader</span>
            </div>
            <div className="flex items-center gap-4">
              <LogoLoaderInline text="Loading data..." />
            </div>
            <div className="flex items-center gap-4">
              <LogoLoaderInline size={20} text="Fetching results" />
            </div>
          </div>
        </section>

        {/* Button States */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Button Loading States</h2>
          <div className="flex flex-wrap gap-4 p-8 rounded-xl bg-card border border-border">
            <Button disabled className="min-w-32">
              <LogoLoaderButton />
            </Button>
            <Button variant="outline" disabled className="min-w-32">
              <LogoLoaderButton />
            </Button>
            <Button variant="secondary" disabled className="min-w-32">
              <LogoLoaderButton />
            </Button>
          </div>
        </section>

        {/* Overlay Preview (Static) */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Overlay Preview</h2>
          <div className="relative h-64 rounded-xl bg-card border border-border overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
              <LogoLoader size={64} />
              <p className="mt-4 text-sm text-muted-foreground animate-pulse">
                Loading your dashboard...
              </p>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Use <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">LogoLoaderOverlay</code> for full-page loading states
          </p>
        </section>

        {/* Usage Code */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Usage</h2>
          <div className="rounded-xl bg-zinc-900 p-6 overflow-x-auto">
            <pre className="text-sm text-zinc-300 font-mono">
{`import { LogoLoader, LogoLoaderOverlay, LogoLoaderInline } from "@/components/logo-loader"

// Basic usage
<LogoLoader />

// Custom size (24px to 256px)
<LogoLoader size={64} />

// Inline with text
<LogoLoaderInline text="Loading..." />

// Full-page overlay
<LogoLoaderOverlay visible={isLoading} message="Please wait..." />

// In buttons
<Button disabled={isLoading}>
  {isLoading ? <LogoLoaderButton /> : "Submit"}
</Button>`}
            </pre>
          </div>
        </section>

        {/* Accessibility Notes */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Accessibility</h2>
          <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Includes <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">role="status"</code> and <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">aria-label</code> for screen readers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Respects <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">prefers-reduced-motion</code> - animation disabled when user prefers reduced motion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>SVG content is <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">aria-hidden="true"</code> with separate screen reader text</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>GPU-accelerated animation (opacity + filter) for smooth performance</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
