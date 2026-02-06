# Architecture

## Overview
Chinese Name Generator is a Next.js 16 application with a dual-mode UI (Modern + Historical) and a small API layer that proxies to SiliconFlow for LLM. The app is primarily client-driven for interactive generation flows, while API routes handle input validation and external calls.

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
- The main locale shell now uses a framed-canvas layout: rounded outer container, soft glass backdrop, and integrated header/footer surfaces.

## Backend (API Routes)
- `app/api/generate/modern/route.ts`: validates inputs and requests SiliconFlow for modern name generation.
- `app/api/generate/historical/route.ts`: validates inputs and requests three historical figures from the LLM with structured JSON output.
- Generation routes accept `locale` (en/zh/ja/ko) + `explanationDepth` (brief/detailed) to control the language and verbosity of AI narrative fields.
- Generation routes now accept optional surname controls:
  - `surnameType`: `single` (单姓) or `double` (复姓)
  - `wantedSurname`: optional Chinese surname text for modern mode only
- Modern and historical routes enforce option constraints server-side, retry generation when needed, and aggregate only valid matched results.
- If 3 valid names cannot be collected within retry limit, routes return an explicit error instead of backfilling invalid names.

## Data
- Runtime validation via Zod schemas in `lib/validators/`.
- Modern name narrative fields are localized strings (`meaning`, `etymology`).
- Historical name narrative fields are localized strings (`story`, `matchReason`).
- Shared surname validation is centralized in `lib/validators/common.ts` and reused by modern/historical schemas for surname-type rules.

## Styling
- Tailwind CSS with custom tokens in `app/globals.css`.
- Typography via `next/font` (Noto Serif display, Noto Sans body, Noto Sans Mono), with Chinese serif fallbacks.
- Theme direction is now a direct recreation of the user-provided visual references (soft plum-wash editorial layout).
- `app/globals.css` was rewritten from scratch around `public/backgroud.png` with mist/noise overlays.
- Shared primitives in CSS: `snow-panel`, `plum-ring`, `paper-texture`, `ink-shadow`, `plum-chip`, `snow-divider`.
- Card surfaces across landing/forms/results are intentionally transparent (`bg-white/*`) so the background art remains visible.
- **Forms are fully transparent** (`bg-transparent`, `border-none`, `shadow-none`) with subtle `border-primary/10` structural lines.
- **Header/Footer are borderless and transparent** for a seamless full-page experience.
- shadcn/ui components remain unmodified.

## External Services
- SiliconFlow API for LLM generation.
- Chat model set to `deepseek-ai/DeepSeek-V3.2`.
- Prompt layer enforces:
  - modern names should feel realistic and contemporary (avoid novel/fantasy style output)
  - surname-type constraints for both modes, with optional wanted-surname preference in modern mode
  - strict style compliance (style-mismatched candidates are rejected server-side)
  - TTS is deferred to a future release (not active in current runtime)

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

