# Tech Stack

## Overview

Modern, performant stack optimized for LLM-powered name generation with excellent DX and minimal complexity.

---

## Core Framework

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Framework | **Next.js** | 16.x (App Router) | SSR for SEO, API routes, React Server Components |
| Runtime | **Node.js** | 20.x LTS | Stable, async-optimized |
| Language | **TypeScript** | 5.x | Type safety, better DX |
| Package Manager | **pnpm** | 9.x | Fast, disk-efficient |

---

## Frontend

### UI & Styling

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Component Library | **shadcn/ui** | Accessible, customizable, copy-paste components |
| Styling | **Tailwind CSS** | Utility-first, responsive, works great with shadcn |
| Icons | **Lucide React** | Consistent, tree-shakeable icons |
| Animations | **Framer Motion** | Smooth loading states, micro-interactions |
| Fonts | **next/font** | Self-hosted, no layout shift |

### State Management

| Concern | Solution | Rationale |
|---------|----------|-----------|
| Server State | **TanStack Query** | Caching, background refetch, error handling |
| Local State | **Zustand** | Lightweight, no boilerplate |
| Form State | **React Hook Form + Zod** | Validation, minimal re-renders |

### Image Export

| Feature | Library | Usage |
|---------|---------|-------|
| Name Card Export | **html-to-image** | Better quality than html2canvas, smaller bundle |

---

## Backend / API

### API Layer

| Component | Technology | Rationale |
|-----------|------------|-----------|
| API Routes | **Next.js Route Handlers** | Colocated with app, edge-ready |
| Validation | **Zod** | Schema validation, type inference |
| Rate Limiting | **Upstash Ratelimit** | Serverless-compatible, Redis-backed |

### AI Services (SiliconFlow)

| Service | Model | Endpoint |
|---------|-------|----------|
| LLM (Name Generation) | `Qwen/Qwen3-VL-235B-A22B-Instruct` | `https://api.siliconflow.cn/v1/chat/completions` |
| TTS (Pronunciation) | `FunAudioLLM/CosyVoice2-0.5B` | `https://api.siliconflow.cn/v1/audio/speech` |

```typescript
// API Client Setup
import OpenAI from 'openai';

export const siliconflow = new OpenAI({
  apiKey: process.env.SILICONFLOW_API_KEY,
  baseURL: 'https://api.siliconflow.cn/v1',
});
```

---

## Data Layer

Historical and modern name generation rely on LLM outputs (no static candidate lists).

### Client Persistence

| Feature | Solution | Rationale |
|---------|----------|-----------|
| Cache | **TanStack Query** | Automatic caching with TTL |

---

## DevOps & Deployment

### Hosting

| Service | Purpose | Rationale |
|---------|---------|-----------|
| **Vercel** | Hosting + Edge | Zero-config Next.js, global CDN |
| **Upstash Redis** | Rate limiting cache | Serverless Redis, free tier |

### Environment Variables

```env
# .env.local
SILICONFLOW_API_KEY=sk-xxx

# Optional: Rate limiting
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

---

## Code Quality

| Tool | Purpose |
|------|---------|
| **ESLint** | Linting (next/core-web-vitals) |
| **Prettier** | Code formatting |
| **TypeScript** | Static type checking |
| **Husky + lint-staged** | Pre-commit hooks |

---

## Project Structure

```
chinese-name-generator/
├── app/
│   ├── (main)/
│   │   ├── page.tsx              # Landing / mode selection
│   │   ├── historical/
│   │   │   └── page.tsx          # Historical mode
│   │   └── modern/
│   │       └── page.tsx          # Modern mode
│   ├── api/
│   │   ├── generate/
│   │   │   └── route.ts          # LLM name generation
│   │   └── tts/
│   │       └── route.ts          # Text-to-speech
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn components
│   ├── name-card.tsx
│   ├── name-form.tsx
│   ├── audio-player.tsx
│   └── export-button.tsx
├── lib/
│   ├── siliconflow.ts            # API client
│   ├── prompts.ts                # LLM prompts
│   ├── utils.ts
│   └── validators.ts             # Zod schemas
├── hooks/
│   ├── use-generate-name.ts
├── stores/
│   └── preferences-store.ts      # Zustand store
├── memory-bank/
│   ├── prd.md
│   ├── tech-stack.md
│   └── architecture.md
└── public/
    └── og-image.png
```

---

## Dependencies Summary

### Production

```json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "openai": "^4.0.0",
  "@tanstack/react-query": "^5.0.0",
  "zustand": "^5.0.0",
  "zod": "^3.23.0",
  "react-hook-form": "^7.53.0",
  "@hookform/resolvers": "^3.9.0",
  "framer-motion": "^11.0.0",
  "html-to-image": "^1.11.0",
  "lucide-react": "^0.460.0",
  "tailwindcss": "^3.4.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.5.0"
}
```

### Development

```json
{
  "typescript": "^5.6.0",
  "@types/node": "^22.0.0",
  "@types/react": "^19.0.0",
  "eslint": "^9.0.0",
  "eslint-config-next": "^16.0.0",
  "prettier": "^3.4.0",
  "prettier-plugin-tailwindcss": "^0.6.0"
}
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| LLM Response | < 5s |
| TTS Response | < 2s |
| Bundle Size (JS) | < 150KB gzipped |

---

## Security Considerations

- API keys stored server-side only (never exposed to client)
- Rate limiting on all API routes
- Input sanitization via Zod validation
- CORS configured for production domain only
