'use client';

import { useState } from 'react';
import { Settings, Info, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { usePreferencesStore } from '@/stores/preferences-store';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { LanguagePreference } from '@/types/preferences';

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale() as LanguagePreference;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('settings');
  const tLanguage = useTranslations('language');
  const {
    setLanguage,
    explanationDepth,
    setExplanationDepth,
  } = usePreferencesStore();

  const handleLanguageChange = (value: LanguagePreference) => {
    setLanguage(value);
    router.replace(pathname, { locale: value });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg border border-primary/15 bg-white/35 hover:border-primary/55 hover:bg-accent/35"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Open settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="border-primary/20 bg-card/92 font-sans sm:max-w-md">
        <motion.div
          key={isOpen ? 'open' : 'closed'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex h-full flex-col gap-10 px-6 pb-10 pt-8"
        >
          <SheetHeader className="space-y-2 p-0">
            <SheetTitle className="font-display text-2xl">
              {t('title')}
            </SheetTitle>
            <SheetDescription className="text-sm">
              {t('description')}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.32em] text-primary">
              <Languages className="h-4 w-4" />
              {t('displayLanguage')}
            </div>
            <RadioGroup
              value={locale}
              onValueChange={(val) => handleLanguageChange(val as LanguagePreference)}
              className="grid grid-cols-2 gap-3"
            >
              {(
                [
                  { value: 'en', label: tLanguage('en') },
                  { value: 'zh', label: tLanguage('zh') },
                  { value: 'ja', label: tLanguage('ja') },
                  { value: 'ko', label: tLanguage('ko') },
                ] as const
              ).map((item) => (
                <div key={item.value}>
                  <RadioGroupItem
                    value={item.value}
                    id={item.value}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={item.value}
                    className="flex items-center justify-between rounded-lg border border-border/70 bg-popover/85 px-4 py-3 text-sm font-medium transition hover:border-primary/60 hover:bg-accent/45 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                      {item.value}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.32em] text-primary">
              <Info className="h-4 w-4" />
              {t('explanationDepth')}
            </div>
            <RadioGroup
              value={explanationDepth}
              onValueChange={(val) => setExplanationDepth(val as 'brief' | 'detailed')}
              className="grid grid-cols-1 gap-3"
            >
              {(
                [
                  { value: 'brief', title: t('brief'), body: t('briefDescription') },
                  { value: 'detailed', title: t('detailed'), body: t('detailedDescription') },
                ] as const
              ).map((item) => (
                <div key={item.value}>
                  <RadioGroupItem
                    value={item.value}
                    id={item.value}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={item.value}
                    className="flex flex-col gap-2 rounded-lg border border-border/70 bg-card/80 px-4 py-3 text-sm transition hover:border-primary/60 hover:bg-accent/42 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.body}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
