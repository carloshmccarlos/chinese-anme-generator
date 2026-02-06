'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SettingsPanel } from '@/components/settings-panel';
import { LanguageSelector } from '@/components/language-selector';

export function Header() {
  const t = useTranslations('header');

  return (
    <header className="relative z-50 w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md plum-chip font-display text-lg tracking-tight text-primary shadow-[0_8px_18px_-14px_rgba(154,39,77,0.6)] transition-transform group-hover:-translate-y-0.5">
            名
          </span>
          <div className="leading-none">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/80">
              {t('archiveLabel')}
            </p>
            <p className="font-display text-lg tracking-tight text-foreground">
              {t('title')}
            </p>
          </div>
        </Link>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSelector />
          <SettingsPanel />
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSelector />
          <SettingsPanel />
        </div>
      </div>
    </header>
  );
}
