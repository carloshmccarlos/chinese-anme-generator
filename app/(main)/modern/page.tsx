'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ModernNameForm } from '@/components/modern-name-form';
import { NameCard } from '@/components/name-card';
import { NameCardSkeleton } from '@/components/name-card-skeleton';
import { ModeTabs } from '@/components/mode-tabs';
import { useGenerateModernName } from '@/hooks/use-generate-modern-name';
import { usePreferencesStore } from '@/stores/preferences-store';
import type { ModernName } from '@/types/name';
import type { GenerateModernNameRequest } from '@/types/api';

export default function ModernPage() {
  const [generatedNames, setGeneratedNames] = useState<ModernName[]>([]);
  const { mutate, isPending } = useGenerateModernName();
  const { language, explanationDepth } = usePreferencesStore();

  const handleGenerate = (values: GenerateModernNameRequest) => {
    mutate({ ...values, locale: language, explanationDepth }, {
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
            <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-muted-foreground">
              Modern Studio
            </p>
            <h1 className="font-display text-4xl sm:text-5xl">
              Craft a contemporary Chinese name.
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Select the tone, style, and rhythm. We’ll generate names that feel
              natural to speak and meaningful to keep.
            </p>
          </div>
          <div className="paper-panel rounded-md border-2 border-border bg-card/90 p-6 text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground">
            <p>Output includes surname, pinyin, meaning, and cultural context.</p>
          </div>
        </div>
      </header>

      <ModernNameForm onSubmit={handleGenerate} isLoading={isPending} />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Generated Names</h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted-foreground">
            Result Set
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {isPending && (
              <>
                <NameCardSkeleton />
                <NameCardSkeleton />
                <NameCardSkeleton />
              </>
            )}
            {!isPending && generatedNames.map((name) => (
              <NameCard key={name.id} name={name} />
            ))}
          </AnimatePresence>
        </div>

        {!isPending && generatedNames.length === 0 && (
          <div className="rounded-md border-2 border-dashed border-border/60 bg-card/60 p-16 text-center text-sm text-muted-foreground">
            Your journey begins here. Fill out the form to generate names.
          </div>
        )}
      </section>
    </div>
  );
}

