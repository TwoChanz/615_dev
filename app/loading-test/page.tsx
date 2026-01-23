import { LogoLoader } from "@/components/loading/LogoLoader"
import { QuadrantSplash } from "@/components/loading/QuadrantSplash"
import { TennesseeLoader } from "@/components/loading/TennesseeLoader"

export default function LoadingTestPage() {
  return (
    <div className="container-page py-16 space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Loading Animation Test</h1>
        <p className="mt-2 text-muted-foreground">
          Preview all three loading animation variants.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold mb-4">Default (Wordmark)</h2>
          <div className="flex items-center justify-center h-48 rounded-xl border border-border bg-[#0a0a0f]">
            <LogoLoader size="md" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Blinking caret animation, 900ms cycle
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Splash (Quadrant)</h2>
          <div className="flex items-center justify-center h-48 rounded-xl border border-border bg-[#0a0a0f] overflow-hidden">
            <QuadrantSplash />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Grid → tiles → glow sequence, 1.1s total
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Tennessee</h2>
          <div className="flex items-center justify-center h-48 rounded-xl border border-border bg-[#0a0a0f] overflow-hidden">
            <TennesseeLoader />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            State outline stroke draw, 1.4s
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/50 p-4">
        <h3 className="font-medium">When do these appear?</h3>
        <ul className="mt-2 text-sm text-muted-foreground space-y-1">
          <li>• <strong>First visit:</strong> Splash loader (stored in session)</li>
          <li>• <strong>Subsequent loads:</strong> 90% Default, 10% Tennessee</li>
          <li>• <strong>Hard refresh:</strong> Ctrl+Shift+R to see loading state</li>
          <li>• <strong>Slow network:</strong> DevTools → Network → Slow 3G</li>
        </ul>
      </div>
    </div>
  )
}
