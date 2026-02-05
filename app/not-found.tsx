import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="paper-panel w-full max-w-xl rounded-md border-2 border-border bg-card/90 p-10 shadow-[0_22px_55px_-40px_rgba(26,18,12,0.55)]">
        <div className="space-y-4">
          <h1 className="font-display text-8xl opacity-10 sm:text-9xl">404</h1>
          <div className="space-y-2">
            <h2 className="font-display text-3xl">Lost in History?</h2>
            <p className="text-muted-foreground">
              The page you&rsquo;re looking for doesn&rsquo;t exist or has been lost to time.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="rounded-md text-xs font-semibold uppercase tracking-[0.35em]">
            <Link href="/">Back to the Present</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

