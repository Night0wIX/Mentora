import { Skeleton, SkeletonGroup } from "@/shared/ui/skeleton";

export const CourseCardSkeleton = () => {
  return (
    <li className="list-none">
      <SkeletonGroup
        label="Loading course"
        className="block overflow-hidden rounded-2xl border border-border bg-card"
      >
        <Skeleton className="aspect-video w-full" />

        <div className="space-y-2 p-4 sm:p-5">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-24" />
        </div>
      </SkeletonGroup>
    </li>
  );
};
