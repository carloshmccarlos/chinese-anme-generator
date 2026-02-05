# Architecture

## Overview
Chinese Name Generator is a Next.js 16 application with a dual-mode UI (Modern + Historical) and a small API layer that proxies to SiliconFlow for LLM and TTS. The app is primarily client-driven for interactive generation flows, while API routes handle input validation and external calls.

## Frontend
- App Router with locale-aware routing in `app/[locale]/(main)` and shared layouts.
- Pages:
  - Landing: `app/[locale]/(main)/page.tsx`
  - Modern mode: `app/[locale]/(main)/modern/page.tsx`
  - Historical mode: `app/[locale]/(main)/historical/page.tsx`
- UI components in `components/` with shadcn/ui primitives in `components/ui/`.
- State:
  - Local component state for generated names and view state.
  - Zustand stores in `stores/` for shared persisted preferences.
  - TanStack Query for API request lifecycle and caching.
  - Internationalization via `next-intl` with middleware, `i18n/request.ts`, and messages in `messages/`.

## Backend (API Routes)
- `app/api/generate/modern/route.ts`: validates inputs and requests SiliconFlow for modern name generation.
- `app/api/generate/historical/route.ts`: validates inputs and requests three historical figures from the LLM with structured JSON output.
- `app/api/tts/route.ts`: proxies TTS requests to SiliconFlow.
- Generation routes accept `locale` (en/zh/ja/ko) + `explanationDepth` (brief/detailed) to control the language and verbosity of AI narrative fields.

## Data
- Runtime validation via Zod schemas in `lib/validators/`.
- Modern name narrative fields are localized strings (`meaning`, `etymology`).
- Historical name narrative fields are localized strings (`story`, `matchReason`).

## Styling
- Tailwind CSS with custom tokens in `app/globals.css`.
- Typography via `next/font` (Noto Serif display, Noto Sans body, Noto Sans Mono), with Chinese serif fallbacks.
- Global background textures (paper fibers + ink wash) and reusable `paper-panel` styling in `app/globals.css`.
- shadcn/ui components remain unmodified.

## External Services
- SiliconFlow API for LLM generation and TTS.

## Error Handling
- API routes return structured JSON errors with proper status codes.
- Client surfaces errors via UI feedback.

## Performance Considerations
- Prefer Server Components by default; use Client Components only when needed.
- Avoid heavy dependencies and dynamic imports unless a component is only used conditionally.

## SEO
- Root metadata configured in `app/layout.tsx` with `metadataBase`.
- Per-locale metadata + hreflang alternates in `app/[locale]/layout.tsx`.
- Mode-specific metadata in `app/[locale]/(main)/modern/layout.tsx` and `app/[locale]/(main)/historical/layout.tsx`.
- `app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml` and `robots.txt`.

