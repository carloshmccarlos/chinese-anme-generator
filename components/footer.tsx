import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function Footer() {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="w-full">
      <div className="container mx-auto grid gap-6 px-6 py-8 text-sm text-muted-foreground sm:px-8 lg:grid-cols-3 lg:px-12">
        <div className="space-y-2">
          <p className="font-display text-lg text-foreground/90">{t('title')}</p>
          <p className="text-xs font-mono uppercase tracking-[0.32em] text-primary/70">{t('tagline')}</p>
        </div>
        <div className="flex items-end justify-center gap-4 text-[10px] font-mono uppercase tracking-[0.32em]">
          <Link href="/modern" className="transition-colors hover:text-primary">
            {nav('modern')}
          </Link>
          <Link href="/historical" className="transition-colors hover:text-primary">
            {nav('historical')}
          </Link>
        </div>
        <div className="space-y-2 text-xs opacity-80 lg:text-right">
          <p>{t('powered', { year })}</p>
          <p className="font-display text-[11px] text-muted-foreground">
            {t('heritage')}
          </p>
        </div>
      </div>
    </footer>
  );
}
