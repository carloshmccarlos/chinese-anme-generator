'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SettingsPanel } from '@/components/settings-panel';
import { LanguageSelector } from '@/components/language-selector';

export function Header() {
  const t = useTranslations('header');

  return (
    <header className="sticky top-0 z-40 border-b-2 border-border/80 bg-background/90 backdrop-blur">
      <div className="container mx-auto flex flex-col gap-4 px-6 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-border bg-primary font-display text-xl tracking-tight text-primary-foreground shadow-[0_8px_18px_-10px_rgba(21,14,8,0.8)] transition-transform group-hover:-translate-y-0.5">
              名
            </span>
            <div className="leading-none">
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">
                {t('archiveLabel')}
              </p>
              <p className="font-display text-xl tracking-tight">
                {t('title')}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSelector />
            <SettingsPanel />
          </div>
        </div>



        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSelector />
          <SettingsPanel />
        </div>
      </div>
    </header>
  );
}
