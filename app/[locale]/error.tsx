'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <Card className="relative w-full max-w-xl border-none bg-card paper-texture ink-shadow">
        <CardHeader className="space-y-4 pt-12">
          <CardTitle className="font-display text-4xl text-foreground text-center">
            {t('title')}
          </CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed text-center">
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-12 pt-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => reset()}
              className="rounded-sm py-6 text-xs font-semibold uppercase tracking-[0.35em]"
            >
              {t('tryAgain')}
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-sm py-6 text-xs font-semibold uppercase tracking-[0.35em] bg-transparent border-muted-foreground/30 hover:border-primary hover:text-primary"
            >
              <Link href="/">{t('returnHome')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
