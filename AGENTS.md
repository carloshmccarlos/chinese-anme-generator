# AGENTS.md - Coding Agent Guidelines

## Project Overview

Chinese Name Generator - Next.js 16 app with SiliconFlow LLM integration.
Stack: Next.js 16, TypeScript 5, Tailwind CSS, shadcn/ui, TanStack Query, Zustand.

---

## Commands

### Development
```bash
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors
pnpm format           # Run Prettier
pnpm typecheck        # Run TypeScript check
```

### Testing (when implemented)
```bash
pnpm test             # Run all tests
pnpm test:watch       # Watch mode
pnpm test <file>      # Run single test file
pnpm test -t "name"   # Run tests matching pattern
```

### Utilities
```bash
pnpm add <pkg>        # Add dependency
pnpm add -D <pkg>     # Add dev dependency
pnpm dlx shadcn@latest add <component>  # Add shadcn component
```

---

## Code Style

### File Naming
- Components: `kebab-case.tsx` (e.g., `name-card.tsx`)
- Hooks: `use-kebab-case.ts` (e.g., `use-generate-name.ts`)
- Utilities: `kebab-case.ts` (e.g., `format-pinyin.ts`)
- Types: `kebab-case.ts` in `/types/` directory
- API routes: `route.ts` inside feature folders

### Component Structure
```typescript
// 1. Imports (sorted: react, next, external, internal, types)
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { NameCardProps } from '@/types/name';

// 2. Types (if component-specific)
interface Props {
  name: string;
  onSave?: () => void;
}

// 3. Component (named export preferred)
export function NameCard({ name, onSave }: Props) {
  // hooks first
  const [isPlaying, setIsPlaying] = useState(false);
  
  // handlers
  const handlePlay = () => setIsPlaying(true);
  
  // render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### Import Order
```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. External libraries
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 3. Internal - absolute imports
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// 4. Internal - relative imports
import { formatPinyin } from './utils';

// 5. Types (always last, with 'type' keyword)
import type { GeneratedName } from '@/types/name';
```

### TypeScript Rules
- Use `interface` for object shapes, `type` for unions/intersections
- Always define return types for functions
- Use `const` assertions where applicable
- Prefer `unknown` over `any`
- Use Zod for runtime validation

```typescript
// Good
interface User {
  id: string;
  name: string;
}

type Status = 'idle' | 'loading' | 'error';

function getName(id: string): Promise<User> { ... }

// Bad
const user: any = fetchUser();
function getName(id) { ... }  // missing types
```

### Naming Conventions
- Components: `PascalCase`
- Functions/variables: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE`
- Types/Interfaces: `PascalCase`
- Boolean variables: `is/has/should` prefix

```typescript
// Good
const MAX_SAVED_NAMES = 50;
const isLoading = true;
const hasError = false;
function handleSubmit() { ... }

// Bad
const maxsavednames = 50;
const loading = true;
```

### Error Handling
```typescript
// API routes - always return structured errors
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = schema.parse(body);
    // ... logic
    return Response.json({ data: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Invalid input' }, { status: 400 });
    }
    console.error('API error:', error);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Client - use try/catch with user feedback
try {
  await generateName(params);
} catch (error) {
  toast.error('Failed to generate name');
}
```

### React Patterns
- Prefer Server Components by default
- Use 'use client' only when needed (hooks, events, browser APIs)
- Colocate components with their pages when single-use
- Extract to /components when reused

### Styling (Tailwind)
- Use `cn()` utility for conditional classes
- Mobile-first: start with base, add `sm:`, `md:`, `lg:`
- Keep class strings under 80 chars, break to multiple lines if needed

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'flex items-center gap-2 p-4',
  'rounded-lg border bg-card',
  isActive && 'border-primary',
  className
)} />
```

---

## Project Structure

```
app/
├── (main)/           # Main layout group
│   ├── page.tsx      # Landing page
│   ├── modern/       # Modern mode
│   └── historical/   # Historical mode
├── api/              # API routes
│   ├── generate/     # Name generation
│   └── tts/          # Text-to-speech
├── layout.tsx        # Root layout
└── globals.css       # Global styles

components/
├── ui/               # shadcn components (don't modify)
└── *.tsx             # Custom components

lib/
├── siliconflow.ts    # API client
├── prompts/          # LLM prompts
├── utils.ts          # Utilities
└── validators/       # Zod schemas

hooks/                # Custom React hooks
stores/               # Zustand stores
types/                # TypeScript types
data/                 # Static JSON data
```

---

## Hard Rules

1. **pnpm only** - never use npm/yarn/bun
2. **Max 300 lines** per file (code only, not data)
3. **Max 1 React component** per file
4. **No `any` types** - use `unknown` or proper types
5. **No console.log** in production code - use proper error handling
6. **Always validate** API inputs with Zod
7. **Never expose** API keys to client
8. **Prefer Server Components** - use 'use client' sparingly

---

## API Keys

Store in `.env.local` (never commit):
```
SILICONFLOW_API_KEY=sk-xxx
```

Access server-side only:
```typescript
// lib/siliconflow.ts
const apiKey = process.env.SILICONFLOW_API_KEY;
```
