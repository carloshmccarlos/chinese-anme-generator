import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function Footer() {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-border/80 bg-card/70">
      <div className="container mx-auto grid gap-8 px-6 py-12 text-sm text-muted-foreground sm:px-8 lg:grid-cols-3 lg:px-12">
        <div className="space-y-2">
          <p className="font-display text-lg text-foreground">{t('title')}</p>
          <p className="text-xs font-mono uppercase tracking-[0.32em]">{t('tagline')}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-[10px] font-mono uppercase tracking-[0.32em]">
          <Link href="/modern" className="transition-colors hover:text-primary">
            {nav('modern')}
          </Link>
          <Link href="/historical" className="transition-colors hover:text-primary">
            {nav('historical')}
          </Link>
        </div>
        <div className="space-y-2 text-xs">
          <p>{t('powered', { year })}</p>
          <p className="font-display text-[11px] text-muted-foreground">
            {t('heritage')}
          </p>
        </div>
      </div>
    </footer>
  );
}
