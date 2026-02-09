# Product Requirements Document (PRD)

**Product Name (Working):** Chinese Name Generator & History Explorer

**Version:** v1.0
**Owner:** Carlos
**Target Launch:** MVP

## 1. Product Overview

The product provides a dual-mode Chinese name experience:

### Historical Name Mode
Generates real historical Chinese figures spanning the Shang/Zhou era through the Song dynasty, accompanied by concise historical backstories and cultural tone.

### Modern Chinese Name Mode
Generates realistic, commonly used modern Chinese names, optionally based on the user’s real name (pronunciation, meaning, or vibe), with explanations of meaning, pronunciation, and stylistic suitability.

The product is designed for:
*   Name exploration & cultural learning
*   Chinese learners
*   Writers / gamers / role-players
*   People adopting a Chinese name for personal or professional use

## 2. Goals & Success Metrics

### Primary Goals
*   Provide culturally accurate and engaging Chinese names
*   Balance fun generation with historical authenticity
*   Make Chinese names approachable for non-native users

### Success Metrics
*   ≥ 30% users generate names in both modes
*   ≥ 3 names generated per session on average
*   ≥ 20% of users save or export a generated name
*   Low user confusion around pronunciation or meaning

## 3. User Personas

### Persona 1: Cultural Explorer
*   Interested in Chinese history
*   Wants to learn famous figures and their stories
*   Uses Historical Mode

### Persona 2: Chinese Learner / Foreigner
*   Needs a Chinese name
*   Cares about pronunciation and meaning
*   Uses Modern Mode with explanation

### Persona 3: Writer / Gamer
*   Needs authentic Chinese names
*   Wants names categorized by personality or archetype
*   Uses both modes

## 4. Core Features

### 4.1 Historical Name Mode

#### Scope
*   AI-curated real historical figures anchored to Shang/Zhou through Song context
*   Avoid notorious figures, immoral archetypes, and eunuch (huanguan) associations

#### User Inputs
*   Real name (optional)
*   Gender preference (male/female)
*   Dynasty (single-select or any)
*   Name style (same options as Modern)
*   Given name length (one / two / any)
*   Optional surname mode:
    *   Single-character surname (??) or double-character surname (??)

#### Output
*   Three real historical figure options
*   Full Chinese name (surname + given name)
*   Pinyin with tones
*   Dynasty setting
*   Short historical backstory (2-4 sentences)
*   Cultural tone tags (e.g., loyalty, scholarship, valor)

#### Example Output
**Li Jingyun**
*   **Dynasty:** Tang
*   **Story:** A scholar-official known for calm governance and ink-brush chronicles of river towns during the mid-Tang era.
*   **Tags:** Scholarship, Steadiness

#### Non-goals
*   No post-Song dynasty settings
*   No glorification of atrocities or oppressive roles
*   No eunuch (huanguan) naming or narratives

### 4.2 Modern Chinese Name Mode

#### Scope
*   Generate plausible, commonly used modern Chinese names
*   Avoid rare, archaic, or awkward characters by default

#### User Inputs
*   Real name (optional)
*   Gender preference (male/female)
*   Name style:
    *   Modern
    *   Traditional
    *   Neutral
*   Given name length:
    *   One character
    *   Two characters
*   Theme (multi-select):
    *   Nature
    *   Wisdom
    *   Strength
    *   Elegance
    *   Virtue
    *   Brightness / Hope
*   Surname:
    *   Auto-suggest Chinese surname
    *   User-provided surname
    *   Optional surname mode: single-character surname (单姓) or double-character surname (复姓)
    *   Validation rule: if surname mode is selected, surname must match the selected character count (1 for 单姓, 2 for 复姓)

#### Output
For each generated name:
*   Full Chinese name
*   Pinyin
*   Character-by-character meaning
*   Pronunciation guidance
*   Explanation of suitability
*   Optional warning (e.g., uncommon character, ambiguous tone)

#### Example Output
**林知远 (Lín Zhīyuǎn)**
*   **Meaning:**
    *   林 – forest, growth
    *   知 – knowledge, wisdom
    *   远 – far-reaching vision
*   **Why this fits:** The name reflects intellectual depth and long-term vision, and its pronunciation is smooth and common in modern Mandarin.

## 5. Name Generation Logic

### Historical Mode
*   LLM proposes three real historical figures
*   If a real name is provided, prioritize pronunciation similarity in ranking
*   Guardrails: avoid notorious figures, immoral roles, or eunuch narratives
*   Output must include dynasty context and a locale-matched short story (Brief/Detailed)
*   If user sets surname mode (??/??), prefer names that match the selected surname form while keeping historical accuracy
*   Style must be enforced strictly: style-mismatched candidates are invalid

### Modern Mode (LLM-based)
Uses SiliconFlow API with Qwen3-VL-235B-A22B-Instruct for name generation.

**LLM Configuration:**
*   **Provider:** SiliconFlow (https://api.siliconflow.cn/v1)
*   **Model:** deepseek-ai/DeepSeek-V3.2
*   **API:** OpenAI-compatible (can use OpenAI SDK with custom baseURL)

**Generation approach:**
1.  **Step 1: Analyze user's real name (if provided)**
    *   Phonetic analysis: identify sounds that can map to Chinese phonemes
    *   Semantic analysis: extract meaning/origin of the name
2.  **Step 2: Build generation prompt with user preferences**
    *   Gender, style, themes, surname preference
    *   Optional surname mode (单姓/复姓) + strict character-count validation for wanted surname
    *   UI locale (EN/ZH/JA/KO) for the explanation language
    *   Explanation depth (Brief/Detailed) for verbosity
    *   Include character frequency constraints (avoid rare/archaic characters)
    *   Include strict style constraints (reject style-mismatched candidates)
3.  **Step 3: LLM generates candidate names with:**
    *   Full name + pinyin
    *   Character-by-character meaning
    *   Suitability explanation
    *   Pronunciation warnings if applicable
    *   Realistic contemporary usage (avoid fantasy/novel-character style names)
4.  **Step 4: Return exactly N names when possible (default: 3)**
    *   If a single model response is insufficient, retry generation and aggregate only valid, option-compliant names until N is reached.
    *   Never backfill with names that do not satisfy user-selected options.
    *   If N valid names still cannot be found after retry limit, return an explicit error.

**Error Handling:**
*   LLM timeout: Show friendly error with retry button
*   LLM failure: Suggest trying again with different preferences
*   Rate limit: Queue requests, show position in queue

**Caching Strategy:**
*   Cache LLM responses by input hash (name + preferences)
*   TTL: 24 hours for generated names
*   Use localStorage for client-side caching

**Rate Limiting:**
*   Max 10 generations per minute per IP
*   Max 100 generations per day per IP

## 6. Data Requirements

### Historical Dataset
**Note:** Historical and modern name generation rely on LLM knowledge with no static candidate lists.

## 7. UX / UI Requirements

*   Two clear tabs: Historical | Modern
*   Visual style: `踏雪寻梅` aesthetic (snow-wash gradients, plum-blossom accents, airy paper textures, serif-forward typography)
*   Background presentation: use a soft painted-canvas backdrop with branch/plum atmosphere and translucent UI layering
*   Card presentation: key cards should remain semi-transparent so the backdrop is visible through interface surfaces
*   Reference-driven fidelity: landing page composition should track provided visual mocks (editorial hero, dual CTA cards, framed shell)
*   Name card layout
*   "Generate again" CTA
*   Save / favorite names
*   Copy text
*   Export name card as image (html2canvas)
*   Tooltip for tones and pronunciation
*   AI explanation depth toggle (Brief / Detailed)
*   Multilingual explanations (language selector: EN, ZH, JA, KO)
    *   AI-generated narrative content must match the selected UI locale.
    *   Explanation depth controls verbosity for all locales (Brief = concise, Detailed = expanded).

**Loading States:**
*   Skeleton loader for name cards during LLM generation
*   Progress indicator with estimated time (2-5s)
*   Subtle animation to indicate processing

**Persistence:**
*   Preferences stored in localStorage (e.g., language, explanation depth)

**Responsive Design:**
*   Mobile-first approach
*   Breakpoints: 640px (sm), 768px (md), 1024px (lg)
*   Touch-friendly controls for mobile
*   Collapsible filters on mobile
*   Modern preferences form layout contract: 2 columns x 3 rows on desktop, with 4 selectors in rows 1-2 and 2 text inputs in row 3

## 8. Out of Scope (v1)

*   Astrology / 八字 / 五行
*   Legal name registration
*   Dialect-specific names
*   Ming/Qing/modern historical figures
*   AI-generated fictional dynasties
*   TTS pronunciation playback (planned for future release)

## 7.5 SEO & Sharing

**OpenGraph Meta:**
*   **Dynamic OG title:** "Chinese Name: [Generated Name]"
*   **Dynamic OG description:** Name meaning + pinyin
*   **OG image:** Auto-generated name card preview
*   **Default share assets:** Branded fallback OG/Twitter preview images for homepage and locale pages

**URL Structure:**
*   /historical - Historical mode landing
*   /modern - Modern mode landing
*   /name/[id] - Shareable link for generated names (optional v2)

**SEO:**
*   Server-side rendering for name cards
*   Structured data (JSON-LD) for cultural content
*   Semantic HTML for accessibility
*   Technical SEO: sitemap.xml, robots.txt, canonical + hreflang alternates per locale
*   Full icon coverage: favicon (`.ico`), SVG icon, Apple touch icon, and installable 192/512 + maskable manifest icons
*   Primary organic keyword focus: **"best Chinese name generator"** (title, description, keywords, and OG/Twitter metadata for EN pages)

## 9. Risks & Mitigations

| Risk | Mitigation |
| :--- | :--- |
| Historical inaccuracies | Prompt guardrails + strict schema + manual review sampling |
| Weird / unnatural names | Frequency-based filtering |
| Cultural misinterpretation | Neutral, preference-based explanations |
| Overly verbose content | Tight bio length limits |

## 10. Future Extensions

*   User-defined archetypes
*   Name popularity charts by decade
