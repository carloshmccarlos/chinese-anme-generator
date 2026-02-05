import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <Card className="relative w-full max-w-xl border-none bg-card paper-texture ink-shadow overflow-hidden">
        <CardHeader className="space-y-4 pt-12 relative z-10">
          <h1 className="font-display text-8xl text-foreground/5 sm:text-9xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">404</h1>
          <CardTitle className="font-display text-3xl text-foreground text-center relative z-10">
            {t('title')}
          </CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed text-center relative z-10">
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-12 pt-6 relative z-10">
          <div className="flex justify-center">
            <Button asChild size="lg" className="rounded-sm py-6 text-xs font-semibold uppercase tracking-[0.35em]">
              <Link href="/">{t('cta')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
