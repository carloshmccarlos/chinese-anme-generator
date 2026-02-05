'use client';

import { Sparkles, ScrollText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ModeTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('nav');

  const currentTab = pathname === '/historical' ? 'historical' : 'modern';

  return (
    <div className="flex justify-center">
      <Tabs
        value={currentTab}
        onValueChange={(value) => router.push(`/${value}`)}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2 rounded-md border-2 border-border bg-card/80 p-1">
          <TabsTrigger
            value="modern"
            className="gap-2 rounded-sm text-[10px] font-mono uppercase tracking-[0.3em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Sparkles className="h-4 w-4" />
            {t('modern')}
          </TabsTrigger>
          <TabsTrigger
            value="historical"
            className="gap-2 rounded-sm text-[10px] font-mono uppercase tracking-[0.3em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <ScrollText className="h-4 w-4" />
            {t('historical')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
