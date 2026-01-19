import Link from "next/link"
import { FileQuestion } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-2xl bg-muted">
        <FileQuestion className="size-10 text-muted-foreground" />
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">Page Not Found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. 
        Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blog">Read the Blog</Link>
        </Button>
      </div>
    </div>
  )
}
