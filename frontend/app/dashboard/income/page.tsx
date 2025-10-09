import type { Metadata } from "next";
import { columns } from "@/app/dashboard/income/columns";
import { DataTable } from "@/components/ui/data-table";
import { fetchIncome } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserId } from "@/lib/auth";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/ui/skeletons";
import { ExportCsvButton } from "@/components/ui/export-button";

export const metadata: Metadata = {
  title: "Income",
};

export default async function Page() {
  const userIdCookie = await getUserId();
  const userId = userIdCookie?.value;
  if (!userId) return null;

  const incomeItems = await fetchIncome(userId);
  return (
    <div className="pt-6">
      <h1 className="mb-2 text-xl md:text-2xl  ml-1">Income</h1>
      <div className="flex items-start justify-baseline gap-2 md:mt-8">
        <Button asChild size={"lg"}>
          <Link href="/dashboard/income/create">Create Income</Link>
        </Button>
      <ExportCsvButton endpoint="/api/export/income" filename="income.csv" label="Export Income CSV"/>
      </div>

      <div className="container mx-auto py-10">
        <Suspense fallback={<SkeletonTable />}>
          <DataTable columns={columns} data={incomeItems} />
        </Suspense>
      </div>
    </div>
  );
}
