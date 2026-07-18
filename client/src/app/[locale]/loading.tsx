import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="sticky top-0 z-50 border-b border-line bg-bg/86 backdrop-blur-sm">
        <div className="mx-auto flex h-[74px] max-w-[1160px] items-center gap-5 px-5">
          <Skeleton className="size-11 shrink-0 rounded-xl" />
          <Skeleton className="h-5 w-32" />
          <div className="ms-auto hidden items-center gap-1 md:flex">
            <Skeleton className="h-9 w-16 rounded-full" />
            <Skeleton className="h-9 w-16 rounded-full" />
            <Skeleton className="h-9 w-20 rounded-full" />
            <Skeleton className="h-9 w-20 rounded-full" />
            <Skeleton className="h-9 w-18 rounded-full" />
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-navy via-navy-2 to-navy-3">
        <div className="relative mx-auto grid max-w-[1160px] items-center gap-14 px-5 pt-[76px] md:grid-cols-[1.25fr_0.85fr]">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-40 rounded-full bg-white/10" />
            <Skeleton className="h-12 w-full max-w-md rounded-lg bg-white/10" />
            <Skeleton className="h-12 w-3/4 rounded-lg bg-white/10" />
            <Skeleton className="h-5 w-full max-w-lg bg-white/10" />
            <div className="mt-3 flex gap-3">
              <Skeleton className="h-12 w-40 rounded-full bg-gold/30" />
              <Skeleton className="h-12 w-36 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="flex justify-center">
            <Skeleton className="aspect-[4/5] w-full max-w-[400px] rounded-[22px] bg-white/10" />
          </div>
        </div>
        <div className="mx-auto grid max-w-[1160px] grid-cols-2 gap-4 px-5 pb-16 pt-14 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="rounded-2xl bg-white/8 p-6">
              <div className="h-9 w-20 mx-auto mb-2 rounded bg-white/10" />
              <div className="h-3 w-24 mx-auto rounded bg-white/10" />
            </Skeleton>
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-[1160px] px-5 py-[72px]">
        <div className="mx-auto max-w-[680px] text-center">
          <Skeleton className="mx-auto mb-3 h-4 w-28" />
          <Skeleton className="mx-auto mb-3 h-8 w-64" />
          <Skeleton className="mx-auto h-5 w-full max-w-md" />
        </div>
        <div className="mt-11 grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-line bg-card">
              <Skeleton className="h-[200px] w-full rounded-t-2xl" />
              <div className="flex flex-col gap-2 p-6">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="mt-2 flex gap-2">
                  <Skeleton className="h-9 w-28 rounded-full" />
                  <Skeleton className="h-9 w-24 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
