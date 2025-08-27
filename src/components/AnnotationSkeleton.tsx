"use client";

import { memo } from "react";

const AnnotationSkeleton = memo(function AnnotationSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-3">
        <div className="h-4 bg-muted rounded w-full mb-2"></div>
        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-3 bg-muted rounded w-20"></div>
        <div className="h-3 bg-muted rounded w-16"></div>
      </div>
    </div>
  );
});

export default AnnotationSkeleton;
