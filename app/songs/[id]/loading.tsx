export default function SongLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Song Header Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-64 h-64 bg-muted rounded-lg animate-pulse" />
            <div className="flex-1 space-y-4">
              <div className="h-12 bg-muted rounded animate-pulse" />
              <div className="h-8 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-6 bg-muted rounded animate-pulse w-1/2" />
              <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
              <div className="h-6 bg-muted rounded animate-pulse w-1/4" />
            </div>
          </div>
        </div>

        {/* Lyrics Section Skeleton */}
        <div className="bg-card rounded-lg p-6">
          <div className="h-8 bg-muted rounded animate-pulse mb-6 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-6 bg-muted rounded animate-pulse"
                style={{ width: `${Math.random() * 40 + 60}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
