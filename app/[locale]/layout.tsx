import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { QueryProvider } from '@/components/providers/query-provider';
import { routing } from '@/i18n/routing';
import {
  buildLanguageAlternates,
  OG_LOCALE,
  SITE_DESCRIPTION,
  SITE_NAME,
  toSafeLocale,
} from '@/lib/seo';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = toSafeLocale(locale);
  const siteName = SITE_NAME[safeLocale];
  const description = SITE_DESCRIPTION[safeLocale];

  return {
    title: { default: siteName, template: `%s | ${siteName}` },
    description,
    alternates: {
      canonical: `/${safeLocale}`,
      languages: buildLanguageAlternates('/'),
    },
    openGraph: {
      title: siteName,
      description,
      url: `/${safeLocale}`,
      siteName,
      locale: OG_LOCALE[safeLocale],
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <QueryProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </QueryProvider>
  );
}
