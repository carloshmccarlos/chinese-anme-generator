'use client';

import { useEffect } from 'react';
import { Check, Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePreferencesStore } from '@/stores/preferences-store';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { LanguagePreference } from '@/types/preferences';

export function LanguageSelector() {
  const locale = useLocale() as LanguagePreference;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('language');
  const { language, setLanguage } = usePreferencesStore();

  useEffect(() => {
    if (language !== locale) {
      setLanguage(locale);
    }
  }, [language, locale, setLanguage]);

  const handleSelect = (nextLocale: LanguagePreference) => {
    setLanguage(nextLocale);
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 rounded-lg border border-primary/15 bg-white/35 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.3em] hover:border-primary/50 hover:bg-accent/35"
        >
          <Languages className="h-4 w-4" />
          <span className="uppercase tracking-[0.2em]">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl border border-primary/20 bg-card/95 shadow-xl">
        <DropdownMenuItem onClick={() => handleSelect('en')} className="justify-between">
          {t('en')} {locale === 'en' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect('zh')} className="justify-between">
          {t('zh')} {locale === 'zh' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect('ja')} className="justify-between">
          {t('ja')} {locale === 'ja' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect('ko')} className="justify-between">
          {t('ko')} {locale === 'ko' && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
