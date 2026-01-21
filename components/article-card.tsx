import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface Article {
  title: string
  slug: string
  description: string
  date: string
  readingTime: string
  tags: string[]
  featured?: boolean
  type: "blog" | "guide" | "lab"
}

interface ArticleCardProps {
  article: Article
  className?: string
}

const typeConfig = {
  blog: { label: "Blog", href: "/blog" },
  guide: { label: "Guide", href: "/guides" },
  lab: { label: "Lab", href: "/labs" },
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  const config = typeConfig[article.type]

  return (
    <Card
      className={cn(
        "group relative overflow-hidden card-interactive",
        article.featured && "border-primary/30 bg-primary/5",
        className
      )}
    >
      {article.featured && (
        <div className="absolute right-4 top-4">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Featured
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span className="text-border">|</span>
          <Clock className="size-3.5" />
          <span>{article.readingTime}</span>
        </div>
        <CardTitle className="line-clamp-2 text-lg leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
          <Link href={`${config.href}/${article.slug}`}>{article.title}</Link>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {article.description}
        </CardDescription>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link
          href={`${config.href}/${article.slug}`}
          className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Read more
          <ArrowRight className="ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}
