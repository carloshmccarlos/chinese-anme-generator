'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { ExportButton } from '@/components/export-button';
import type { GeneratedHistoricalName } from '@/types/name';

interface Props {
    name: GeneratedHistoricalName;
}

export function HistoricalNameCard({ name }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('historical');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-full group"
            ref={cardRef}
        >
            <Card className="relative h-full overflow-hidden border border-white/58 bg-white/12 paper-texture snow-panel ink-shadow transition-transform duration-500 hover:-translate-y-1">
                {/* Inner Border Frame */}
                <div className="pointer-events-none absolute inset-4 z-20 rounded-sm border border-primary/12" />

                <CardContent className="flex h-full flex-col p-8 relative z-10 w-full h-full">
                    {/* Top Section */}
                    <div className="flex items-start justify-between w-full mb-8 min-h-[40px]">
                        {/* Horizontal Tags - Traditional Stamp Style */}
                        <div className="flex flex-row gap-2">
                            {/* Dynasty Stamp */}
                            <div className="flex items-center justify-center rounded-[2px] border border-primary/34 bg-primary/14 px-2 py-1">
                                <span className="text-[10px] font-mono tracking-[0.15em] text-primary/80 uppercase">
                                    {name.dynasty}
                                </span>
                            </div>

                            {/* Other Tags */}
                            {name.tags.slice(0, 2).map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center justify-center rounded-[2px] border border-primary/22 bg-white/24 px-2 py-1"
                                >
                                    <span className="text-[10px] font-mono tracking-[0.15em] text-muted-foreground/70 uppercase">
                                        {tag}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Center Section: Name */}
                    <div className="relative text-center flex-1 flex flex-col justify-center items-center py-4">
                        <h2 className="font-display text-7xl md:text-8xl text-foreground font-light leading-none tracking-tight">
                            {name.name}
                        </h2>

                        <div className="mt-8 flex items-center justify-center gap-4">
                            <div className="h-[1px] w-6 bg-primary/20" />
                            <span className="font-sans text-xs tracking-[0.3em] text-primary/70 font-medium uppercase relative">
                                {name.pinyin}
                            </span>
                            <div className="h-[1px] w-6 bg-primary/20" />
                        </div>
                    </div>

                    {/* Bottom Section: Story/Details */}
                    <div className="relative mt-auto border-t border-primary/10 pt-6">
                        {/* Corner decoration for the text block */}
                        <div className="absolute left-0 top-6 h-2 w-2 border-l border-t border-primary/25" />

                        <div className="space-y-4 pl-3">
                            <h3 className="text-[9px] font-mono uppercase tracking-[0.25em] text-primary/40 mb-1">
                                {t('storyLabel')}
                            </h3>

                            <div className="space-y-3">
                                <p className="text-sm text-foreground/90 font-medium leading-relaxed font-serif line-clamp-4">
                                    {name.story}
                                </p>
                                {name.matchReason && (
                                    <p className="text-xs text-muted-foreground/70 leading-relaxed font-light text-justify italic">
                                        {name.matchReason}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end items-center opacity-60 hover:opacity-100 transition-opacity duration-300 export-exclude">
                            <ExportButton targetRef={cardRef} fileName={`${name.name}`} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
