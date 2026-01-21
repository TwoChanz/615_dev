# DESIGN_RULES.md

Brand and UI guidelines for Six1Five Devs.

## Brand Colors

### Primary Palette
| Name | OKLCH | Hex (approx) | Usage |
|------|-------|--------------|-------|
| Teal (Primary) | `oklch(0.70 0.15 175)` | #14b8a6 | CTAs, links, accents, primary buttons |
| Purple (Secondary) | `oklch(0.55 0.20 280)` | #6366f1 | Gradients, accent glows, secondary elements |

### Semantic Colors
| Name | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| Background | `oklch(0.985 0 0)` | `oklch(0.06 0.01 270)` | Page background |
| Card | `oklch(1 0 0)` | `oklch(0.10 0.01 270)` | Card surfaces |
| Foreground | `oklch(0.12 0 0)` | `oklch(0.97 0 0)` | Primary text |
| Muted | `oklch(0.45 0 0)` | `oklch(0.6 0 0)` | Secondary text |
| Border | `oklch(0.88 0 0)` | `oklch(0.20 0.02 280)` | Borders, dividers |

### Status Colors
| Status | Badge Style |
|--------|-------------|
| Live | `bg-green-500/10 text-green-600 dark:text-green-400` |
| Beta | `bg-yellow-500/10 text-yellow-600 dark:text-yellow-400` |
| Alpha | `bg-purple-500/10 text-purple-600 dark:text-purple-400` |
| Coming Soon | `bg-muted text-muted-foreground` |

## Typography

### Font Stack
- **Sans:** Geist Sans (primary UI and body)
- **Mono:** Geist Mono (code, technical elements)

### Heading Scale
```
h1: text-4xl sm:text-5xl lg:text-6xl font-bold
h2: text-3xl sm:text-4xl font-bold
h3: text-2xl font-semibold
h4: text-xl font-semibold
```

### Body Text
- Default: `leading-relaxed` (1.625 line height)
- Muted: `text-muted-foreground`
- Use `text-pretty` or `text-balance` for better line breaks

## Spacing

### Container
- Max width: `max-w-7xl` (1280px)
- Padding: `px-4 lg:px-8`
- Utility: `.container-page`

### Section Spacing
- Standard: `py-16 md:py-24` (`.section`)
- Large: `py-24 md:py-32` (`.section-lg`)

### Component Gaps
- Card grid: `gap-6`
- Inline items: `gap-2` or `gap-4`
- Stacked items: `space-y-2` or `space-y-4`

## Components

### Buttons
Use shadcn/ui Button component:
```tsx
<Button>Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="secondary">Secondary</Button>
```

Sizing: `size="sm"`, `size="default"`, `size="lg"`

### Cards
```tsx
<Card className="transition-all duration-200 hover:border-primary/40 hover:shadow-md">
```

For interactive cards, add `.card-interactive` or the hover styles above.

### Badges
```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge className="bg-primary/10 text-primary border-primary/20">Brand</Badge>
```

### Icons
Use Lucide React icons. Standard sizes:
- Inline: `size-4`
- Card icons: `size-5`
- Feature icons: `size-6` or `size-8`

## Effects

### Text Gradient
```tsx
<span className="text-gradient">Gradient Text</span>
```
Creates teal-to-purple gradient text.

### Glow Effects (Dark Mode)
```css
.glow      /* Standard dual teal/purple glow */
.glow-sm   /* Subtle glow */
.glow-lg   /* Prominent glow */
.glow-teal /* Single-color teal */
.glow-purple /* Single-color purple */
```

### Border Gradient
```tsx
<div className="border-gradient">...</div>
```

### Background Glow (Hero sections)
```tsx
<div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 size-[800px] rounded-full bg-primary/5 blur-[120px]" />
```

## Patterns

### Page Layout
```tsx
<div className="container-page py-16">
  <header className="mb-10">
    <h1>Page Title</h1>
    <p className="mt-4 text-muted-foreground">Description</p>
  </header>
  {/* Content */}
</div>
```

### Section with Header + Link
```tsx
<section className="section border-b border-border">
  <div className="container-page">
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2>Section Title</h2>
        <p className="mt-2 text-muted-foreground">Subtitle</p>
      </div>
      <Button asChild variant="ghost">
        <Link href="/path">View all <ArrowRight className="ml-2 size-4" /></Link>
      </Button>
    </div>
    {/* Grid content */}
  </div>
</section>
```

### Card Grid
```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {items.map(item => <Card key={item.id} />)}
</div>
```

## Do's and Don'ts

### Do
- Use `primary` color for interactive elements
- Apply hover states to clickable cards
- Use `text-muted-foreground` for secondary text
- Maintain consistent spacing with utilities
- Use `transition-all duration-200` for smooth hovers

### Don't
- Don't use raw hex colors; use CSS variables
- Don't create new button styles; use shadcn variants
- Don't hardcode spacing; use Tailwind scale
- Don't mix icon libraries; stick to Lucide
- Don't use glow effects in light mode
