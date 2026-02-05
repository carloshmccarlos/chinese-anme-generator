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

### Modern Mode (LLM-based)
Uses SiliconFlow API with Qwen3-VL-235B-A22B-Instruct for name generation.

**LLM Configuration:**
*   **Provider:** SiliconFlow (https://api.siliconflow.cn/v1)
*   **Model:** Qwen/Qwen3-VL-235B-A22B-Instruct
*   **API:** OpenAI-compatible (can use OpenAI SDK with custom baseURL)

**Generation approach:**
1.  **Step 1: Analyze user's real name (if provided)**
    *   Phonetic analysis: identify sounds that can map to Chinese phonemes
    *   Semantic analysis: extract meaning/origin of the name
2.  **Step 2: Build generation prompt with user preferences**
    *   Gender, style, themes, surname preference
    *   UI locale (EN/ZH/JA/KO) for the explanation language
    *   Explanation depth (Brief/Detailed) for verbosity
    *   Include character frequency constraints (avoid rare/archaic characters)
3.  **Step 3: LLM generates candidate names with:**
    *   Full name + pinyin
    *   Character-by-character meaning
    *   Suitability explanation
    *   Pronunciation warnings if applicable
4.  **Step 4: Return top N names (default: 3)**

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
*   Visual style: traditional Chinese aesthetic (ink, vermilion seals, paper textures, serif typography)
*   Name card layout
*   "Generate again" CTA
*   Save / favorite names
*   Copy text
*   Export name card as image (html2canvas)
*   Tooltip for tones and pronunciation
*   Audio pronunciation playback (TTS for pinyin)
*   AI explanation depth toggle (Brief / Detailed)
*   Multilingual explanations (language selector: EN, ZH, JA, KO)
    *   AI-generated narrative content must match the selected UI locale.
    *   Explanation depth controls verbosity for all locales (Brief = concise, Detailed = expanded).

**TTS Configuration:**
*   **Provider:** SiliconFlow (https://api.siliconflow.cn/v1/audio/speech)
*   **Model:** FunAudioLLM/CosyVoice2-0.5B
*   **Voice:** FunAudioLLM/CosyVoice2-0.5B:anna (female, clear pronunciation)
*   **Format:** mp3
*   **Use case:** Pronounce pinyin for generated names

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

## 8. Out of Scope (v1)

*   Astrology / 八字 / 五行
*   Legal name registration
*   Dialect-specific names
*   Ming/Qing/modern historical figures
*   AI-generated fictional dynasties

## 7.5 SEO & Sharing

**OpenGraph Meta:**
*   **Dynamic OG title:** "Chinese Name: [Generated Name]"
*   **Dynamic OG description:** Name meaning + pinyin
*   **OG image:** Auto-generated name card preview

**URL Structure:**
*   /historical - Historical mode landing
*   /modern - Modern mode landing
*   /name/[id] - Shareable link for generated names (optional v2)

**SEO:**
*   Server-side rendering for name cards
*   Structured data (JSON-LD) for cultural content
*   Semantic HTML for accessibility
*   Technical SEO: sitemap.xml, robots.txt, canonical + hreflang alternates per locale

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
