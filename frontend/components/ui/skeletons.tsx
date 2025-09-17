import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <Skeleton className="flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 ">
        <Skeleton className="h-4 w-[100px] rounded-xl bg-gray-200 mb-6" />
        <Skeleton className="h-4 w-[100px] rounded-xl bg-gray-200" />
      </div>
    </Skeleton>
  );
}

export function SkeletonCards() {
  return (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  );
}

export function SkeletonChart() {
  return (
    <Skeleton className="flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 ">
        <Skeleton className="h-4 w-[100px] rounded-xl bg-gray-200 mb-6" />
        <div className="py-4">
          <Skeleton className="h-100 w-full rounded-xl bg-gray-200" />
        </div>
      </div>
    </Skeleton>
  );
}

export function SkeletonLatestEntries() {
  return (
    <Skeleton className="flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 ">
        <Skeleton className="h-4 w-[100px] rounded-xl bg-gray-200 mb-6" />
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-4 w-[100px] rounded-xl bg-gray-200" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
          </div>
          <Skeleton className="h-4 w-[100px] rounded-xl bg-gray-200 mt-4" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
          </div>
        </div>
      </div>
    </Skeleton>
  );
}

export function SkeletonDashboard() {
  return (
    <>
      <h1 className="mb-4 text-xl md:text-2xl text-center">Dashboard Page</h1>
      <div className="container mx-auto py-5">
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          <SkeletonCards />
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          <SkeletonChart />
          <SkeletonLatestEntries />
        </div>
      </div>
    </>
  );
}
