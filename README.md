# YellowPulse

[![CI](https://github.com/YellowPulse/app/actions/workflows/ci.yml/badge.svg)](https://github.com/YellowPulse/app/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Real-time analytics dashboard for Yellow Network

## Tech Stack

- **Framework:** Next.js 16.2 + React 19 + TypeScript 5.9
- **Styling:** Tailwind CSS 4.1 + shadcn/ui
- **State:** TanStack Query v5 + Zustand 5
- **Testing:** Vitest + Playwright + MSW
- **Code Quality:** Biome + Husky + Commitlint

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/YellowPulse/app.git
cd app

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm lint` | Biome lint check |
| `pnpm lint:fix` | Biome lint + fix |
| `pnpm format` | Biome format |
| `pnpm type-check` | TypeScript check |
| `pnpm test` | Run unit tests |
| `pnpm test:watch` | Watch mode tests |
| `pnpm test:coverage` | Tests with coverage |
| `pnpm e2e` | Playwright E2E tests |

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── (dashboard)/  # Dashboard route group
│   └── api/          # API routes
├── components/
│   ├── ui/           # shadcn/ui components
│   └── layout/       # Layout components
├── lib/              # Utilities and API clients
├── stores/           # Zustand stores
├── hooks/            # Custom React hooks
└── types/            # TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

MIT - see [LICENSE](LICENSE) for details.
