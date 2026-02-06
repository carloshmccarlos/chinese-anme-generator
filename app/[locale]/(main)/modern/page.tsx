'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ModernNameForm } from '@/components/modern-name-form';
import { NameCard } from '@/components/name-card';
import { NameCardSkeleton } from '@/components/name-card-skeleton';
import { useGenerateModernName } from '@/hooks/use-generate-modern-name';
import { usePreferencesStore } from '@/stores/preferences-store';
import type { ModernName } from '@/types/name';
import type { GenerateModernNameRequest } from '@/types/api';
import type { LanguagePreference } from '@/types/preferences';

export default function ModernPage() {
  const [generatedNames, setGeneratedNames] = useState<ModernName[]>([]);
  const { mutate, isPending } = useGenerateModernName();
  const t = useTranslations('modern');
  const locale = useLocale() as LanguagePreference;
  const explanationDepth = usePreferencesStore((state) => state.explanationDepth);

  const handleGenerate = (values: GenerateModernNameRequest) => {
    mutate({ ...values, locale, explanationDepth }, {
      onSuccess: (data) => {
        setGeneratedNames(data.names);
      },
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-10rem)]">
      {/* Page Header */}
      <motion.header
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Back Link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground/70 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>{t('back')}</span>
        </Link>

        {/* Title Area */}
        <div className="flex items-start justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary/80">
                {t('label')}
              </span>
            </div>
            <h1 className="font-display text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="max-w-lg text-muted-foreground/80 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Decorative Character */}
          <div className="hidden font-display text-[10rem] font-light leading-none text-primary/[0.06] lg:block">
            今
          </div>
        </div>
      </motion.header>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <ModernNameForm onSubmit={handleGenerate} isLoading={isPending} />
      </motion.div>

      {/* Results Section */}
      <motion.section
        className="mt-16 space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {/* Section Header */}
        <div className="flex items-center gap-6">
          <h2 className="font-display text-xl text-foreground">{t('sectionTitle')}</h2>
          <div className="h-px flex-1 bg-primary/10" />
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground/60">
            {t('sectionLabel')}
          </span>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <NameCard name={name} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {!isPending && generatedNames.length === 0 && (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="text-center">
              <div className="mb-4 font-display text-6xl text-primary/10">名</div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground/50">
                {t('empty')}
              </p>
            </div>
          </div>
        )}
      </motion.section>
    </div>
  );
}
