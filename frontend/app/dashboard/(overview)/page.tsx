import type { Metadata } from "next";
import {
  DashboardTotalCards,
  DashboardBarChartCard,
  DashboardLatestEntriesCard,
} from "@/components/ui/dashboard-cards";
import { Suspense } from "react";
import {
  SkeletonCards,
  SkeletonChart,
  SkeletonLatestEntries,
} from "@/components/ui/skeletons";
import { LayoutGrid } from "lucide-react";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <div className="pt-6">
      <h1 className="mb-2 text-md md:text-lg flex gap-1.5 items-center ml-1">
        <LayoutGrid size={18} /> <span>Dashboard</span>
      </h1>
      <div className="container mx-auto py-5">
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          <Suspense fallback={<SkeletonCards />}>
            <DashboardTotalCards />
          </Suspense>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          <Suspense fallback={<SkeletonChart />}>
            <DashboardBarChartCard />
          </Suspense>
          <Suspense fallback={<SkeletonLatestEntries />}>
            <DashboardLatestEntriesCard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
