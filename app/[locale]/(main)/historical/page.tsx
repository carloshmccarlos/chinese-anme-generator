'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { HistoricalNameForm } from '@/components/historical-name-form';
import { HistoricalNameCard } from '@/components/historical-name-card';
import { NameCardSkeleton } from '@/components/name-card-skeleton';
import { ModeTabs } from '@/components/mode-tabs';
import { useGenerateHistoricalName } from '@/hooks/use-generate-historical-name';
import { usePreferencesStore } from '@/stores/preferences-store';
import type { GeneratedHistoricalName } from '@/types/name';
import type { GenerateHistoricalNameRequest } from '@/types/api';
import type { LanguagePreference } from '@/types/preferences';

export default function HistoricalPage() {
  const [generatedNames, setGeneratedNames] = useState<GeneratedHistoricalName[]>([]);
  const { mutate, isPending } = useGenerateHistoricalName();
  const t = useTranslations('historical');
  const locale = useLocale() as LanguagePreference;
  const explanationDepth = usePreferencesStore((state) => state.explanationDepth);

  const handleGenerate = (values: GenerateHistoricalNameRequest) => {
    mutate({ ...values, locale, explanationDepth }, {
      onSuccess: (data) => {
        setGeneratedNames(data.names);
      },
    });
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-10">
        <ModeTabs />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/80">
              {t('label')}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-foreground">
              {t('title')}
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
              {t('description')}
            </p>
          </div>
          <div className="rounded-lg bg-card/50 border border-border/40 p-6 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <p>{t('note')}</p>
          </div>
        </div>
      </header>

      <HistoricalNameForm onSubmit={handleGenerate} isLoading={isPending} />

      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <h2 className="font-display text-2xl text-foreground">{t('sectionTitle')}</h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted-foreground">
            {t('sectionLabel')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {isPending && (
              <>
                <NameCardSkeleton />
                <NameCardSkeleton />
                <NameCardSkeleton />
              </>
            )}
            {!isPending && generatedNames.map((name) => (
              <motion.div
                key={name.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <HistoricalNameCard name={name} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {!isPending && generatedNames.length === 0 && (
        <div className="rounded-lg border border-dashed border-border/60 p-16 text-center">
          <div className="text-sm text-muted-foreground font-mono tracking-widest uppercase opacity-60">
            {t('empty')}
          </div>
        </div>
      )}
    </div>
  );
}
