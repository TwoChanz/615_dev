"use client"

import { useState, useMemo } from "react"
import { Search, Filter, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToolCard } from "@/components/tool-card"
import type { Tool, ToolStatus } from "@/lib/tools"

interface ToolsFilterProps {
  tools: Tool[]
}

const statusOptions: { value: ToolStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "beta", label: "Beta" },
  { value: "alpha", label: "Alpha" },
  { value: "coming-soon", label: "Coming Soon" },
]

export function ToolsFilter({ tools }: ToolsFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<ToolStatus | "all">("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    tools.forEach((tool) => tool.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [tools])

  // Filter tools based on search, status, and tags
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )

      // Status filter
      const matchesStatus =
        selectedStatus === "all" || tool.status === selectedStatus

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => tool.tags.includes(tag))

      return matchesSearch && matchesStatus && matchesTags
    })
  }, [tools, searchQuery, selectedStatus, selectedTags])

  const hasActiveFilters =
    searchQuery !== "" || selectedStatus !== "all" || selectedTags.length > 0

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedStatus("all")
    setSelectedTags([])
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Status Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tools by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="size-4 text-muted-foreground shrink-0" />
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedStatus === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(option.value)}
              className="shrink-0"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Tags:</span>
        {allTags.slice(0, 10).map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer transition-colors hover:bg-primary/20"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
        {allTags.length > 10 && (
          <span className="text-sm text-muted-foreground">
            +{allTags.length - 10} more
          </span>
        )}
      </div>

      {/* Active Filters & Results Count */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Showing {filteredTools.length} of {tools.length} tools
            </span>
            {selectedTags.length > 0 && (
              <div className="flex items-center gap-1">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    <X className="size-3" />
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}

      {/* Filtered Results (only show if filters are active) */}
      {hasActiveFilters && (
        <div className="mt-6">
          {filteredTools.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                <Search className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No tools found</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filters
              </p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
