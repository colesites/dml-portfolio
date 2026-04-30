import React from "react";

export function GenericSectionSkeleton() {
  return (
    <div className="w-full min-h-[40vh] flex items-center justify-center animate-pulse bg-muted/20 rounded-xl">
      <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card border rounded-lg overflow-hidden animate-pulse"
          >
            <div className="aspect-video bg-muted" />
            <div className="p-4 @md/card:p-6 space-y-4">
              <div className="h-4 w-16 bg-muted rounded-full mb-2" />
              <div className="h-6 w-3/4 bg-muted rounded" />
              <div className="h-4 w-full bg-muted/50 rounded" />
              <div className="h-4 w-5/6 bg-muted/50 rounded" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 bg-muted rounded-md" />
                <div className="h-6 w-16 bg-muted rounded-md" />
                <div className="h-6 w-16 bg-muted rounded-md" />
              </div>
              <div className="flex gap-3 pt-4">
                <div className="h-10 flex-1 bg-muted rounded-lg" />
                <div className="h-10 flex-1 bg-muted rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperienceSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative pl-8 pb-8 border-l-2 border-muted last:border-l-0 animate-pulse"
        >
          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-muted border-4 border-background" />
          <div className="bg-card border rounded-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-muted shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-6 w-1/2 bg-muted rounded" />
                <div className="h-5 w-1/3 bg-muted/70 rounded" />
                <div className="h-4 w-1/4 bg-muted/50 rounded" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-muted/50 rounded" />
              <div className="h-4 w-5/6 bg-muted/50 rounded" />
              <div className="h-4 w-4/6 bg-muted/50 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-muted rounded-full" />
              <div className="h-6 w-20 bg-muted rounded-full" />
              <div className="h-6 w-20 bg-muted rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EducationSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="relative bg-card border rounded-xl overflow-hidden animate-pulse"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted z-10" />
          <div className="relative z-10 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg bg-muted shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-6 w-3/4 bg-muted rounded" />
                <div className="h-5 w-1/2 bg-muted/70 rounded" />
                <div className="h-4 w-1/3 bg-muted/50 rounded" />
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="h-8 w-32 bg-muted rounded-full" />
              <div className="h-8 w-24 bg-muted rounded-full" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-muted/50 rounded" />
              <div className="h-4 w-5/6 bg-muted/50 rounded" />
            </div>
            <div className="p-3 rounded-lg bg-muted/20 space-y-2">
              <div className="h-4 w-1/2 bg-muted rounded" />
              <div className="h-3 w-3/4 bg-muted/50 rounded" />
              <div className="h-3 w-2/3 bg-muted/50 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkillsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-xl border bg-card overflow-hidden animate-pulse"
        >
          <div className="border-b bg-muted/20 px-4 py-3 flex justify-between">
            <div className="h-6 w-32 bg-muted rounded" />
            <div className="h-6 w-8 bg-muted rounded-full" />
          </div>
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4].map((j) => {
              const width = ((j * 17) % 50) + 30; // Deterministic pseudo-random width
              return (
                <div key={j} className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="h-3 w-24 bg-muted rounded" />
                  </div>
                  <div className="h-4 w-full bg-muted/30 rounded-r-md">
                    <div
                      className="h-full bg-muted rounded-r-md"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
