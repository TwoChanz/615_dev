# Six1Five Devs

Developer brand building in public. Shipping real tools like SubSense and AppPilot.

## Quick Start

```bash
npm install
npm run dev
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

- `app/` - Next.js App Router pages
- `components/` - React components (ui/ for shadcn primitives)
- `lib/` - Data models and utilities
- `public/` - Static assets

## Environment Variables

Copy `.env.example` to `.env.local` for local development. All variables have sensible defaults.

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` to deploy.

## License

MIT
