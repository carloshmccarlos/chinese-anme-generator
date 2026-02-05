'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { useTTS } from '@/hooks/use-tts';
import { ExportButton } from '@/components/export-button';
import type { ModernName } from '@/types/name';

interface Props {
  name: ModernName;
}

export function NameCard({ name }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { speak, isLoading: isSpeaking } = useTTS();
  const t = useTranslations('nameCard');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-full group"
      ref={cardRef}
    >
      <Card className="relative h-full border-none bg-[#FDFBF7] paper-texture ink-shadow overflow-hidden transition-transform duration-500 hover:-translate-y-1">

        {/* Inner Border Frame for that "Premium" feel */}
        <div className="absolute inset-4 border border-primary/5 rounded-sm pointer-events-none z-20" />

        <CardContent className="flex h-full flex-col p-8 relative z-10 w-full h-full">

          {/* Top Section */}
          <div className="flex items-start justify-between w-full mb-8 min-h-[40px]">
            {/* Vertical Tags - Traditional Stamp Style */}
            <div className="flex flex-row gap-2">
              {name.tags.slice(0, 2).map((tag) => (
                <div
                  key={tag}
                  className="flex items-center justify-center border border-muted-foreground/20 px-1.5 py-1 rounded-[2px]"
                >
                  <span className="writing-mode-vertical text-[10px] font-mono tracking-[0.2em] text-muted-foreground/70">
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Audio Play Button - Explicit & Excluded from Export */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak(name.kanji);
              }}
              disabled={isSpeaking}
              className="export-exclude flex items-center justify-center w-8 h-8 rounded-full border border-primary/20 bg-primary/5 text-primary/60 transition-all duration-300 hover:bg-primary/10 hover:text-primary active:scale-95 group/audio"
              aria-label="Play pronunciation"
            >
              <Play className={cn("w-3.5 h-3.5 ml-0.5 fill-current", isSpeaking && "animate-pulse text-primary")} />
            </button>
          </div>

          {/* Center Section: Name */}
          <div className="relative text-center flex-1 flex flex-col justify-center items-center py-4">
            <h2 className="font-display text-7xl md:text-8xl text-foreground font-light leading-none tracking-tight">
              {name.kanji}
            </h2>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-[1px] w-6 bg-primary/20" />
              <span className="font-sans text-xs tracking-[0.3em] text-primary/70 font-medium uppercase relative">
                {name.pinyin}
              </span>
              <div className="h-[1px] w-6 bg-primary/20" />
            </div>
          </div>

          {/* Bottom Section: Interpretation */}
          <div className="mt-auto pt-6 border-t border-primary/5 relative">
            {/* Corner decoration for the text block */}
            <div className="absolute top-6 left-0 w-2 h-2 border-t border-l border-primary/20" />

            <div className="space-y-4 pl-3">
              <h3 className="text-[9px] font-mono uppercase tracking-[0.25em] text-primary/40 mb-1">
                {t('interpretation')}
              </h3>

              <div className="space-y-3">
                <p className="text-sm text-foreground/90 font-medium leading-relaxed font-serif">
                  {name.meaning}
                </p>
                <p className="text-xs text-muted-foreground/70 leading-relaxed font-light text-justify">
                  {name.etymology}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end items-center opacity-60 hover:opacity-100 transition-opacity duration-300 export-exclude">
              <ExportButton targetRef={cardRef} fileName={`${name.kanji}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
