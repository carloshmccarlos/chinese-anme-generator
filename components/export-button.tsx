'use client';

import { useState, type RefObject } from 'react';
import { toPng } from 'html-to-image';
import { Download, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface Props {
  targetRef: RefObject<HTMLElement | null>;
  fileName?: string;
}

export function ExportButton({ targetRef, fileName = 'chinese-name' }: Props) {
  const [isExporting, setIsExporting] = useState(false);
  const t = useTranslations('common');

  const handleExport = async () => {
    if (!targetRef.current) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true,
        backgroundColor: 'transparent',
        filter: (node) => {
          const exclusionClasses = ['export-exclude'];
          return !exclusionClasses.some((classname) => node.classList?.contains(classname));
        },
        style: {
          transform: 'scale(1)',
          borderRadius: '8px',
        }
      });

      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 rounded-md border border-transparent text-[10px] font-semibold uppercase tracking-[0.32em] hover:border-primary/60 hover:bg-accent/40"
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Download className="h-3.5 w-3.5" />
      )}
      {isExporting ? t('exporting') : t('export')}
    </Button>
  );
}
