'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoricalNameForm } from '@/components/historical-name-form';
import { ModeTabs } from '@/components/mode-tabs';
import { useGenerateHistoricalName } from '@/hooks/use-generate-historical-name';
import { usePreferencesStore } from '@/stores/preferences-store';
import type { GeneratedHistoricalName } from '@/types/name';
import type { GenerateHistoricalNameRequest } from '@/types/api';

export default function HistoricalPage() {
  const [generatedNames, setGeneratedNames] = useState<GeneratedHistoricalName[]>([]);
  const { mutate, isPending } = useGenerateHistoricalName();
  const { language, explanationDepth } = usePreferencesStore();

  const handleGenerate = (values: GenerateHistoricalNameRequest) => {
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
              Historical Archive
            </p>
            <h1 className="font-display text-4xl sm:text-5xl">
              Forge a historical Chinese name.
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Choose a dynasty, style, and rhythm to shape an AI-crafted
              historical name.
            </p>
          </div>
          <div className="paper-panel rounded-md border-2 border-border bg-card/90 p-6 text-xs font-mono uppercase tracking-[0.28em] text-muted-foreground">
            <p>Each result includes a short backstory and tonal tags.</p>
          </div>
        </div>
      </header>

      <HistoricalNameForm onSubmit={handleGenerate} isLoading={isPending} />

      <section className="flex justify-center">
        <AnimatePresence mode="wait">
          {generatedNames.length > 0 && (
            <motion.div
              key={generatedNames[0].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-xl"
            >
              <div className="space-y-6">
                {generatedNames.map((generatedName) => (
                  <div
                    key={generatedName.id}
                    className="paper-panel relative overflow-hidden rounded-md border-2 border-border bg-card/95 p-8 text-foreground shadow-[0_28px_60px_-44px_rgba(26,18,12,0.6)]"
                  >
                    <div className="absolute -top-8 right-6 text-[8rem] font-display text-foreground/10">
                      {generatedName.name.charAt(0)}
                    </div>
                    <div className="absolute right-6 top-6 flex h-10 w-10 rotate-6 items-center justify-center rounded-sm border-2 border-border bg-primary text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_10px_20px_-12px_rgba(26,18,12,0.6)]">
                      史
                    </div>
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary">
                        {generatedName.dynasty}
                      </span>
                      <h2 className="font-display text-4xl">{generatedName.name}</h2>
                      <p className="text-sm text-muted-foreground">{generatedName.pinyin}</p>
                    </div>

                    <div className="mt-6 space-y-5 text-sm">
                      <section className="space-y-3">
                        <h3 className="text-[10px] font-mono uppercase tracking-[0.35em] text-primary">
                          Historical Story
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                          {generatedName.story}
                        </p>
                        {generatedName.matchReason && (
                          <p className="text-xs text-muted-foreground">
                            Pronunciation Match: {generatedName.matchReason}
                          </p>
                        )}
                      </section>
                      <section className="space-y-3">
                        <h3 className="text-[10px] font-mono uppercase tracking-[0.35em] text-primary">
                          Tone Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {generatedName.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-sm border border-border/40 bg-background/70 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {!isPending && generatedNames.length === 0 && (
        <div className="rounded-md border-2 border-dashed border-border/60 bg-card/60 p-16 text-center text-sm text-muted-foreground">
          Set your dynasty and preferences to generate a historical name.
        </div>
      )}
    </div>
  );
}

