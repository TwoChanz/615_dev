import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Custom MDX components for rendering content
export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-8 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  a: ({
    className,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http")
    if (isExternal) {
      return (
        <a
          className={cn(
            "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
            className
          )}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      )
    }
    return (
      <Link
        className={cn(
          "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
          className
        )}
        href={href || "#"}
        {...props}
      />
    )
  },
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("my-6 rounded-lg border", className)}
      alt={alt}
      {...props}
    />
  ),
}

// Article header component for blog/guide pages
interface ArticleHeaderProps {
  title: string
  description: string
  date: string
  readingTime: string
  tags: string[]
  author?: string
}

export function ArticleHeader({
  title,
  description,
  date,
  readingTime,
  tags,
  author = "Six1Five",
}: ArticleHeaderProps) {
  return (
    <header className="mb-10 border-b pb-10">
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
        {title}
      </h1>
      <p className="mt-4 text-xl text-muted-foreground text-pretty">
        {description}
      </p>
      <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
        <span>By {author}</span>
        <span className="text-border">|</span>
        <time dateTime={date}>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span className="text-border">|</span>
        <span>{readingTime}</span>
      </div>
    </header>
  )
}
