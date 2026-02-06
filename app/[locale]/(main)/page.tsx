'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function LandingPage() {
  const t = useTranslations('landing');

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-col justify-center overflow-hidden py-12 md:py-20">
      {/* Hero Section */}
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left: Typography Hero */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Vertical Accent Line */}
            <div className="mb-8 flex items-center gap-4">
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary/80">
                {t('series')}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-[clamp(2.8rem,8vw,6rem)] font-light leading-[0.95] tracking-tight text-foreground">
              {t('headline')}
              <span className="mt-1 block bg-gradient-to-r from-primary via-primary/85 to-primary/70 bg-clip-text text-transparent">
                {t('headlineAccent')}
              </span>
            </h1>

            <motion.p
              className="mt-8 max-w-lg font-serif text-lg leading-relaxed text-muted-foreground/90 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t('description')}
            </motion.p>

            {/* Signature Line */}
            <motion.div
              className="mt-10 flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="h-px w-16 bg-primary/30" />
              <span className="font-display text-sm tracking-widest text-primary/70">名</span>
              <div className="h-px flex-1 max-w-24 bg-primary/20" />
            </motion.div>
          </motion.div>

          {/* Right: CTA Cards */}
          <motion.div
            className="flex flex-col gap-4 lg:col-span-5"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Modern Card */}
            <Link href="/modern" className="group block">
              <div className="relative overflow-hidden rounded-xl border border-white/40 bg-white/[0.06] p-6 backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:bg-white/[0.12] md:p-8">
                {/* Glass Sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.15] via-transparent to-transparent opacity-60" />

                {/* Decorative Character */}
                <div className="absolute -right-4 -top-4 font-display text-[8rem] font-light leading-none text-primary/[0.04] transition-all duration-700 group-hover:text-primary/[0.08]">
                  今
                </div>

                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/80" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-primary/75">
                      {t('cardModern.label')}
                    </span>
                  </div>

                  <h2 className="mb-2 font-display text-2xl tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    {t('cardModern.title')}
                  </h2>

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground/80">
                    {t('cardModern.description')}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary/90 transition-all group-hover:gap-3">
                    {t('cardModern.action')}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Historical Card */}
            <Link href="/historical" className="group block">
              <div className="relative overflow-hidden rounded-xl border border-white/40 bg-white/[0.06] p-6 backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:bg-white/[0.12] md:p-8">
                {/* Glass Sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.15] via-transparent to-transparent opacity-60" />

                {/* Decorative Character */}
                <div className="absolute -right-4 -top-4 font-display text-[8rem] font-light leading-none text-primary/[0.04] transition-all duration-700 group-hover:text-primary/[0.08]">
                  古
                </div>

                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/80" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-primary/75">
                      {t('cardHistorical.label')}
                    </span>
                  </div>

                  <h2 className="mb-2 font-display text-2xl tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    {t('cardHistorical.title')}
                  </h2>

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground/80">
                    {t('cardHistorical.description')}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary/90 transition-all group-hover:gap-3">
                    {t('cardHistorical.action')}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Flourish */}
      <motion.div
        className="container relative z-10 mx-auto mt-16 flex justify-center px-6 md:mt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <div className="flex items-center gap-8 text-[9px] font-mono uppercase tracking-[0.4em] text-muted-foreground/60">
          <span>踏</span>
          <div className="h-px w-8 bg-primary/20" />
          <span>雪</span>
          <div className="h-px w-8 bg-primary/20" />
          <span>寻</span>
          <div className="h-px w-8 bg-primary/20" />
          <span>梅</span>
        </div>
      </motion.div>
    </div>
  );
}
