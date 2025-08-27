import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-12">
        <Skeleton className="h-12 md:h-16 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>

      {/* Popular Songs Section Skeleton */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Song Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
