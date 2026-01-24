"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ToolScreenshotGalleryProps {
  screenshots: string[]
  toolName: string
  className?: string
}

export function ToolScreenshotGallery({
  screenshots,
  toolName,
  className,
}: ToolScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!screenshots || screenshots.length === 0) {
    return (
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/5 via-background to-secondary/5",
          className
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
              <span className="text-2xl font-bold text-primary">
                {toolName.charAt(0)}
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Screenshots coming soon
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -left-10 -top-10 size-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-secondary/10 blur-3xl" />
      </div>
    )
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image with Navigation */}
      <div className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute inset-0 z-10 cursor-zoom-in">
              <span className="sr-only">View full size</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl border-none bg-transparent p-0">
            <Image
              src={screenshots[activeIndex]}
              alt={`${toolName} screenshot ${activeIndex + 1}`}
              width={1920}
              height={1080}
              className="rounded-lg"
            />
          </DialogContent>
        </Dialog>

        <Image
          src={screenshots[activeIndex]}
          alt={`${toolName} screenshot ${activeIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Zoom indicator */}
        <div className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-lg bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <Maximize2 className="size-5 text-foreground" />
        </div>

        {/* Navigation arrows (only show if multiple screenshots) */}
        {screenshots.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
            >
              <ChevronLeft className="size-5" />
              <span className="sr-only">Previous screenshot</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
            >
              <ChevronRight className="size-5" />
              <span className="sr-only">Next screenshot</span>
            </Button>
          </>
        )}

        {/* Image counter */}
        {screenshots.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-sm backdrop-blur-sm">
            {activeIndex + 1} / {screenshots.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip (only show if multiple screenshots) */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {screenshots.map((screenshot, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                activeIndex === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={screenshot}
                alt={`${toolName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
