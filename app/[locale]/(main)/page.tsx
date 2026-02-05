'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ScrollText, Feather } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  const t = useTranslations('landing');

  return (
    <div className="relative min-h-[80vh] flex flex-col justify-center py-20">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none z-0">
        <div className="font-display text-[20vw] writing-mode-vertical leading-none whitespace-nowrap">
          中文名
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest">
              <Feather className="w-3 h-3" />
              <span>{t('series')}</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 tracking-tight">
              {t('headline')}
              <span className="text-primary block mt-2">{t('headlineAccent')}</span>
            </h1>

            <p className="font-serif text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Link href="/modern" className="block group h-full">
              <Card className="relative h-full overflow-hidden border-none bg-card paper-texture ink-shadow transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-lg">
                <CardContent className="p-8 md:p-12 h-full flex flex-col justify-between space-y-8">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="w-24 h-24 text-primary" />
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4 block">
                      {t('cardModern.label')}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl mb-4 group-hover:text-primary transition-colors">
                      {t('cardModern.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('cardModern.description')}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center text-sm font-medium uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                    {t('cardModern.action')}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link href="/historical" className="block group h-full">
              <Card className="relative h-full overflow-hidden border-none bg-card paper-texture ink-shadow transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-lg">
                <CardContent className="p-8 md:p-12 h-full flex flex-col justify-between space-y-8">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ScrollText className="w-24 h-24 text-primary" />
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4 block">
                      {t('cardHistorical.label')}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl mb-4 group-hover:text-primary transition-colors">
                      {t('cardHistorical.title')}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('cardHistorical.description')}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center text-sm font-medium uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                    {t('cardHistorical.action')}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
