import { DashboardTotalCards, DashboardChartCard, DashboardLatestEntriesCard } from "@/components/ui/dashboard-cards";
import { Suspense } from "react";
import {
  SkeletonCards,
  SkeletonChart,
  SkeletonLatestEntries,
} from "@/components/ui/skeletons";

export default async function Page() {
  

  return (
    <div>
      <h1 className="mb-4 text-xl md:text-2xl text-center">Dashboard Page</h1>
      <div className="container mx-auto py-5">
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          <Suspense fallback={<SkeletonCards />}>
            <DashboardTotalCards />
          </Suspense>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          <Suspense fallback={<SkeletonChart />}>
           <DashboardChartCard />
          </Suspense>
          <Suspense fallback={<SkeletonLatestEntries />}>
           <DashboardLatestEntriesCard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
