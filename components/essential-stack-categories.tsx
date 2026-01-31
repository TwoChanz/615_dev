"use client"

import * as React from "react"
import { ExternalLink, Sparkles, Code, Database, CreditCard, Mail, Cpu, BarChart, Palette, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { trackAffiliate } from "@/lib/analytics"
import type { AffiliateProgram, AffiliateCategory } from "@/lib/monetization"

interface EssentialStackCategoriesProps {
  affiliates: AffiliateProgram[]
  placement?: string
  className?: string
}

const categoryConfig: Record<AffiliateCategory, { name: string; icon: React.ReactNode }> = {
  hosting: {
    name: "Hosting & Deployment",
    icon: <Code className="size-4" />,
  },
  database: {
    name: "Databases",
    icon: <Database className="size-4" />,
  },
  payments: {
    name: "Payments",
    icon: <CreditCard className="size-4" />,
  },
  email: {
    name: "Email",
    icon: <Mail className="size-4" />,
  },
  development: {
    name: "Development Tools",
    icon: <Cpu className="size-4" />,
  },
  design: {
    name: "Design & UI",
    icon: <Palette className="size-4" />,
  },
  analytics: {
    name: "Analytics",
    icon: <BarChart className="size-4" />,
  },
  ai: {
    name: "AI & Machine Learning",
    icon: <Cpu className="size-4" />,
  },
  education: {
    name: "Education",
    icon: <Code className="size-4" />,
  },
  productivity: {
    name: "Productivity",
    icon: <Zap className="size-4" />,
  },
}

// Order categories for display
const categoryOrder: AffiliateCategory[] = [
  "hosting",
  "database",
  "payments",
  "development",
  "email",
  "ai",
  "analytics",
  "design",
  "productivity",
  "education",
]

export function EssentialStackCategories({
  affiliates,
  placement = "resources-essential",
  className,
}: EssentialStackCategoriesProps) {
  // Group affiliates by category
  const groupedAffiliates = React.useMemo(() => {
    const groups: Partial<Record<AffiliateCategory, AffiliateProgram[]>> = {}

    affiliates.forEach((affiliate) => {
      if (!groups[affiliate.category]) {
        groups[affiliate.category] = []
      }
      groups[affiliate.category]!.push(affiliate)
    })

    return groups
  }, [affiliates])

  // Get ordered categories that have affiliates
  const activeCategories = categoryOrder.filter(
    (cat) => groupedAffiliates[cat] && groupedAffiliates[cat]!.length > 0
  )

  if (activeCategories.length === 0) return null

  return (
    <div
      className={cn(
        "rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6",
        className
      )}
    >
      <div className="mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="size-4 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Our Essential Stack</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          The core tools we use on every project, organized by category.
        </p>
      </div>

      <Accordion type="multiple" className="w-full" defaultValue={activeCategories}>
        {activeCategories.map((category) => {
          const config = categoryConfig[category]
          const categoryAffiliates = groupedAffiliates[category]!

          return (
            <AccordionItem key={category} value={category} className="border-border/50">
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {config.icon}
                  </div>
                  <span className="font-medium text-foreground">{config.name}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {categoryAffiliates.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1">
                  {categoryAffiliates.map((affiliate) => (
                    <AffiliateRow
                      key={affiliate.id}
                      affiliate={affiliate}
                      placement={placement}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      <p className="mt-5 text-xs text-muted-foreground">
        Some links may be affiliate links. We only recommend tools we use.
      </p>
    </div>
  )
}

interface AffiliateRowProps {
  affiliate: AffiliateProgram
  placement: string
}

function AffiliateRow({ affiliate, placement }: AffiliateRowProps) {
  const handleClick = () => {
    trackAffiliate.click(affiliate.id, placement, affiliate.name)
  }

  // Track impression
  React.useEffect(() => {
    trackAffiliate.impression(affiliate.id, placement)
  }, [affiliate.id, placement])

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border border-border bg-background/50 p-3 transition-all duration-200 hover:border-primary/40 hover:bg-background",
        affiliate.featured && "border-primary/30 bg-primary/5"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-medium text-foreground">
            {affiliate.name}
          </h4>
          {affiliate.featured && (
            <Badge
              variant="outline"
              className="shrink-0 bg-primary/10 text-primary border-primary/20 text-[10px] px-1.5 py-0"
            >
              Top Pick
            </Badge>
          )}
          {affiliate.discount && (
            <Badge className="shrink-0 bg-primary text-primary-foreground text-[10px] px-1.5 py-0">
              {affiliate.discount}
            </Badge>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
          {affiliate.description}
        </p>
      </div>
      <Button
        asChild
        size="sm"
        variant="outline"
        className="shrink-0 bg-transparent h-8 text-xs"
      >
        <a
          href={affiliate.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
        >
          Visit
          <ExternalLink className="ml-1.5 size-3" />
        </a>
      </Button>
    </div>
  )
}
