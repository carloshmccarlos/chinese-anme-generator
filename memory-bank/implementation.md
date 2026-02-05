# Implementation Plan

## Phase 1: Project Setup

### 1.1 Initialize Project
- [x] Create Next.js 16 project with pnpm
- [x] Configure TypeScript strict mode
- [x] Set up path aliases in tsconfig.json

### 1.2 Install Core Dependencies
- [x] Install Tailwind CSS
- [x] Install shadcn/ui CLI
- [x] Initialize shadcn/ui with default config

### 1.3 Install UI Components (shadcn)
- [x] Add Button component
- [x] Add Card component
- [x] Add Tabs component
- [x] Add Select component
- [x] Add Input component
- [x] Add Label component
- [x] Add Badge component
- [x] Add Tooltip component
- [x] Add Skeleton component
- [x] Add Toggle component
- [x] Add Slider component

### 1.4 Install Additional Dependencies
- [x] Install openai (for SiliconFlow)
- [x] Install @tanstack/react-query
- [x] Install zustand
- [x] Install zod
- [x] Install react-hook-form + @hookform/resolvers
- [x] Install framer-motion
- [x] Install html-to-image
- [x] Install lucide-react

### 1.5 Environment Setup
- [x] Create .env.local template
- [x] Create .env.example for documentation
- [x] Add .env.local to .gitignore

---

## Phase 2: Project Structure

### 2.1 Create Directory Structure
- [x] Create /app/(main)/ directory
- [x] Create /app/api/ directory
- [x] Create /components/ui/ directory
- [x] Create /components/ directory (custom)
- [x] Create /lib/ directory
- [x] Create /hooks/ directory
- [x] Create /stores/ directory
- [x] Create /data/ directory
- [x] Create /types/ directory

### 2.2 Base Layout
- [x] Update app/globals.css with Tailwind
- [x] Create app/layout.tsx with providers
- [x] Add fonts (Inter or similar)
- [x] Create QueryProvider wrapper
- [x] Add metadata for SEO

---

## Phase 3: API Layer

### 3.1 SiliconFlow Client
- [x] Create lib/siliconflow.ts
- [x] Configure OpenAI client with SiliconFlow baseURL
- [x] Export typed client instance

### 3.2 Type Definitions
- [x] Create types/name.ts (HistoricalName, ModernName)
- [x] Create types/api.ts (request/response types)
- [x] Create types/preferences.ts (user preferences)

### 3.3 Zod Schemas
- [x] Create lib/validators/modern-name.ts
- [x] Create lib/validators/historical-name.ts
- [x] Create lib/validators/common.ts

### 3.4 LLM Prompts
- [x] Create lib/prompts/modern-name-prompt.ts
- [x] Create lib/prompts/system-prompt.ts
- [ ] Ensure AI narrative language follows UI locale (EN/ZH/JA/KO)
- [ ] Ensure explanation depth (brief/detailed) is enforced (system prompt must not override brief)

### 3.5 API Route: Generate Modern Name
- [x] Create app/api/generate/modern/route.ts
- [x] Add request validation
- [x] Call SiliconFlow LLM
- [x] Tighten sampling for JSON compliance (temp/top_p/top_k/min_p/frequency/max_tokens)
- [x] Parse and return structured response
- [x] Add error handling

### 3.6 API Route: TTS
- [x] Create app/api/tts/route.ts
- [x] Accept pinyin text input
- [x] Call SiliconFlow TTS API
- [x] Return audio stream/blob
- [x] Add error handling

---

## Phase 4: Historical API
- [x] Create app/api/generate/historical/route.ts
- [x] Filter by dynasty
- [x] Filter by category
- [x] Filter by popularity
- [x] Return random weighted selection
- [x] Replace historical API with AI generation (dynasty/style/length/gender/real name)
- [x] Add historical LLM prompt + guardrails (avoid notorious figures, eunuchs)
- [x] Tighten sampling for JSON compliance (temp/top_p/top_k/min_p/frequency/max_tokens)
- [x] Add strict historical system prompt + fixed JSON schema output
- [x] Define generated historical response type (story + tags + dynasty)
- [x] Remove external validation and source metadata from historical responses
- [x] Return three historical options per request
- [x] Rank results by real-name pronunciation similarity when provided

---

## Phase 5: State Management

### 5.1 Zustand Store
- [x] Create stores/preferences-store.ts
- [x] Add language preference
- [x] Add explanation depth preference
- [x] Add last used mode preference
- [x] Persist to localStorage

### 5.3 React Query Setup
- [x] Create lib/query-client.ts
- [x] Create components/providers/query-provider.tsx
- [x] Configure default stale time
- [x] Configure retry logic

---

## Phase 6: Custom Hooks

### 6.1 Name Generation Hooks
- [x] Create hooks/use-generate-modern-name.ts
- [x] Create hooks/use-generate-historical-name.ts
- [x] Handle loading states
- [x] Handle error states
- [x] Add refetch capability
- [ ] Send locale + explanationDepth preferences with generation requests

### 6.2 TTS Hook
- [x] Create hooks/use-tts.ts
- [x] Manage audio playback state
- [x] Handle audio loading
- [x] Cache audio URLs

---

## Phase 7: UI Components

### 7.1 Layout Components
- [x] Create components/header.tsx
- [x] Create components/footer.tsx
- [x] Create components/mode-tabs.tsx
- [x] Create components/language-selector.tsx

### 7.2 Name Card Component
- [x] Create components/name-card.tsx (container)
- [x] Create components/name-card-header.tsx (Integrated)
- [x] Create components/name-card-meaning.tsx (Integrated)
- [x] Create components/name-card-tags.tsx (Integrated)
- [x] Create components/name-card-actions.tsx (Integrated)
- [x] Add skeleton loading state

### 7.3 Form Components
- [x] Create components/modern-name-form.tsx
- [x] Add real name input
- [x] Add gender select
- [x] Limit gender options to male/female
- [x] Add style select
- [x] Add name length toggle
- [x] Add theme multi-select (Basic)
- [x] Add surname input/toggle (Basic)
- [x] Add submit button with loading
- [x] Ensure modern output includes surname (force includeSurname)

### 7.4 Historical Form
- [x] Create components/historical-name-form.tsx
- [x] Add dynasty multi-select
- [x] Add archetype select
- [x] Add expanded archetype options
- [x] Replace historical filters with AI generator inputs (real name, gender, dynasty, style, length)
- [x] Add popularity toggle
- [x] Add submit button with loading

### 7.5 Audio Player
- [x] Create components/audio-player.tsx (Integrated in NameCard)
- [x] Add play/pause button
- [x] Add loading indicator
- [x] Handle audio errors

### 7.6 Export Button
- [x] Create components/export-button.tsx
- [x] Capture name card as image
- [x] Trigger download
- [x] Add loading state

### 7.7 Settings Panel
- [x] Create components/settings-panel.tsx
- [x] Add language selector
- [x] Add explanation depth toggle
- [x] Persist preferences

---

## Phase 8: Internationalization (i18n)

### 8.1 next-intl Setup
- [x] Install next-intl
- [x] Add middleware and routing config
- [x] Add request config and provider
- [x] Create locale segment and messages

### 8.2 UI Localization
- [x] Add EN/ZH/JA/KO message files
- [x] Localize navigation, forms, pages, and error states
- [x] Update language selector to switch locales

---

## Phase 9: SEO & Meta

### 9.1 Static Metadata
- [x] Update app/layout.tsx metadata
- [x] Add OpenGraph defaults
- [x] Add Twitter card defaults
- [ ] Add favicon
- [ ] Add robots + sitemap

### 9.2 Dynamic Metadata
- [ ] Add generateMetadata to modern page
- [ ] Add generateMetadata to historical page
- [ ] Add per-locale canonical + hreflang alternates

---

## Phase 10: Polish & Optimization

### 10.1 Loading States
- [ ] Add page-level loading.tsx files
- [x] Add Suspense boundaries (Partial)
- [x] Test skeleton animations

### 10.2 Error Handling
- [x] Create app/error.tsx
- [x] Create app/not-found.tsx
- [ ] Add API error toast notifications


### 10.3 Animations
- [x] Add form entrance animations
- [ ] Add button hover effects
- [ ] Add page transitions

### 10.4 Accessibility
- [ ] Audit keyboard navigation
- [ ] Add ARIA labels
- [ ] Test with screen reader
- [ ] Check color contrast

### 10.5 Performance
- [ ] Analyze bundle size
- [ ] Lazy load heavy components
- [ ] Optimize images
- [ ] Test Core Web Vitals

---

## Phase 11: Testing & Deployment

### 11.1 Manual Testing
- [ ] Test modern name generation flow
- [ ] Test historical name generation flow
- [ ] Test TTS playback
- [ ] Test image export
- [ ] Test save/remove names
- [ ] Test language switching
- [ ] Test on mobile devices

### 11.2 Environment Config
- [ ] Set up Vercel project
- [ ] Add environment variables
- [ ] Configure domain (optional)

### 11.3 Deploy
- [ ] Push to GitHub
- [ ] Connect Vercel to repo
- [ ] Verify production build
- [ ] Test production deployment

---

## Progress Tracker

| Phase | Status | Completion |
|-------|--------|------------|
| 1. Project Setup | Not Started | 0% |
| 2. Project Structure | Not Started | 0% |
| 3. API Layer | Not Started | 0% |
| 4. Historical Data | Not Started | 0% |
| 5. State Management | Not Started | 0% |
| 6. Custom Hooks | Not Started | 0% |
| 7. UI Components | Not Started | 0% |
| 8. Pages | Not Started | 0% |
| 9. SEO & Meta | Not Started | 0% |
| 10. Polish & Optimization | Not Started | 0% |
| 11. Testing & Deployment | Not Started | 0% |

**Total Steps: 147**
