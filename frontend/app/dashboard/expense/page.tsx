import type { Metadata } from "next";
import { columns } from "@/app/dashboard/expense/columns";
import { DataTable } from "@/components/ui/data-table";
import { fetchExpense } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserId } from "@/lib/auth";


export const metadata: Metadata = {
  title: 'Expense',
};

export default async function Page() {
  const userIdCookie = await getUserId();
  const userId = userIdCookie?.value;
  if (!userId) return null;
  const expenseItems = await fetchExpense(userId);

  return (
    <div className="pt-6">
      <h1 className="mb-2 text-xl md:text-2xl  ml-1">
        Expense
      </h1>
      <div className="flex items-start justify-baseline gap-2 md:mt-8">
        <Button size={'lg'} asChild >
          <Link href="/dashboard/expense/create">Add Expense</Link>
        </Button>
        <Button size={'lg'} variant="outline">Export As Csv</Button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={expenseItems} />
      </div>
    </div>
  );
}
