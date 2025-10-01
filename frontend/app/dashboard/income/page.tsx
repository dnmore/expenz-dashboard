import type { Metadata } from "next";
import { columns } from "@/app/dashboard/income/columns";
import { DataTable } from "@/components/ui/data-table";
import { fetchIncome } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserId } from "@/lib/auth";
import { BriefcaseBusiness } from "lucide-react";

export const metadata: Metadata = {
  title: 'Income',
};


export default async function Page() {
  const userIdCookie = await getUserId();
  const userId = userIdCookie?.value;
  if (!userId) return null;

  const incomeItems = await fetchIncome(userId);
  return (
    <div className="pt-6">
      <h1 className="mb-2 text-md md:text-lg flex gap-1.5 items-center ml-1">
        <BriefcaseBusiness size={18} /> <span>Income</span>
      </h1>
      <div className="flex items-start justify-baseline gap-2 md:mt-8">
        <Button asChild size={"lg"}>
          <Link href="/dashboard/income/create">Create Income</Link>
        </Button>
        <Button size={"lg"} variant="outline">
          Export As Csv
        </Button>
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={incomeItems} />
      </div>
    </div>
  );
}
