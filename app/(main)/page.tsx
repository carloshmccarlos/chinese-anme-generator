'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ScrollText } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative space-y-24 pb-24">
      <section className="grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="space-y-8 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-mono uppercase tracking-[0.5em] text-muted-foreground"
          >
            Archive Series 01
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl"
          >
            Name is the first
            <span className="block text-primary">story we carry.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-lg text-muted-foreground"
          >
            A studio for modern identity and historical memory. Generate a
            Chinese name with precision, or explore figures who shaped entire
            dynasties.
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/modern"
              className="inline-flex items-center gap-2 rounded-md border-2 border-primary bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary-foreground shadow-[0_16px_30px_-20px_rgba(26,18,12,0.7)] transition-transform hover:-translate-y-0.5"
            >
              Begin Modern
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/historical"
              className="inline-flex items-center gap-2 rounded-md border-2 border-border bg-card px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Open Archive
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative lg:col-span-5"
        >
          <div className="paper-panel relative overflow-hidden rounded-md border-2 border-border bg-card/90 p-8 shadow-[0_20px_55px_-38px_rgba(26,18,12,0.6)]">
            <div className="absolute -top-4 right-6 flex h-12 w-12 items-center justify-center rounded-sm border-2 border-border bg-primary text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_12px_24px_-16px_rgba(26,18,12,0.8)]">
              Seal
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">
                  Curated Process
                </p>
                <p className="font-display text-2xl text-foreground">
                  From sound, meaning, and legacy.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  'Phonetic alignment',
                  'Character harmony',
                  'Cultural resonance',
                  'Historical context',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-sm border-2 border-border/50 bg-background/70 p-4 text-xs font-mono uppercase tracking-[0.28em]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Link href="/modern" className="group">
          <div className="paper-panel relative h-full overflow-hidden rounded-md border-2 border-border bg-card/80 p-10 transition-transform duration-300 group-hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">
                Studio
              </span>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mt-8 font-display text-3xl">Modern Generation</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Linguistic synthesis tuned to your sound, style, and intent.
            </p>
            <div className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Enter the studio <ArrowUpRight className="h-4 w-4" />
            </div>
            <div className="pointer-events-none absolute -bottom-10 -right-6 text-[9rem] font-display text-foreground/10">
              01
            </div>
          </div>
        </Link>

        <Link href="/historical" className="group">
          <div className="paper-panel relative h-full overflow-hidden rounded-md border-2 border-border bg-secondary/70 p-10 text-foreground transition-transform duration-300 group-hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">
                Archive
              </span>
              <ScrollText className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mt-8 font-display text-3xl">Historical Archive</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Trace the names that defined dynasties and cultural memory.
            </p>
            <div className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Open the archive <ArrowUpRight className="h-4 w-4" />
            </div>
            <div className="pointer-events-none absolute -bottom-10 -right-6 text-[9rem] font-display text-foreground/10">
              02
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}

