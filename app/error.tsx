'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="paper-panel w-full max-w-xl rounded-md border-2 border-border bg-card/90 p-10 shadow-[0_22px_55px_-40px_rgba(26,18,12,0.55)]">
        <div className="space-y-2">
          <h2 className="font-display text-4xl">Something went wrong</h2>
          <p className="text-muted-foreground">
            We encountered an unexpected error while generating your name.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => reset()}
            className="rounded-md text-xs font-semibold uppercase tracking-[0.35em]"
          >
            Try again
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-md text-xs font-semibold uppercase tracking-[0.35em]"
          >
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

