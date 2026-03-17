import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="mb-6 flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    </main>
  );
}
