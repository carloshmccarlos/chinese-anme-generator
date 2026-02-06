import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function NameCardSkeleton() {
  return (
    <Card className="relative flex h-full flex-col justify-between rounded-sm border border-white/58 bg-white/12 paper-texture snow-panel ink-shadow p-8 opacity-70">
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16 bg-muted-foreground/10" />
          <Skeleton className="h-4 w-16 bg-muted-foreground/10" />
        </div>
        <Skeleton className="h-10 w-10 rounded-sm bg-muted-foreground/10" />
      </div>

      <div className="mt-8 flex flex-col items-center justify-center space-y-4">
        <Skeleton className="h-24 w-24 rounded-full bg-muted-foreground/10" />
        <Skeleton className="h-4 w-20 bg-muted-foreground/10" />
      </div>

      <div className="mt-8 space-y-6 pt-6 border-t border-border/20">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 bg-muted-foreground/10" />
          <Skeleton className="h-16 w-full bg-muted-foreground/5" />
        </div>
      </div>
    </Card>
  );
}
