import type { Metadata } from "next";
import EditForm from "@/components/ui/expense/edit-form";
import { fetchExpenseById } from "@/lib/data";
import { notFound } from "next/navigation";
import { getUserId } from "@/lib/auth";
import { Pencil } from "lucide-react";

export const metadata: Metadata = {
  title: 'Edit Expense',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const userIdCookie = await getUserId();
  const userId = userIdCookie?.value;
  if (!userId) return null;

  const expense = await fetchExpenseById(id, userId);

  if (!expense) {
    notFound();
  }

  return (
    <div className="pt-6">
      <h1 className="mb-2 text-md md:text-lg flex gap-1.5 items-center ml-1">
        <Pencil size={18} /> Edit Expense
      </h1>
      <div className="container py-10 max-w-lg">
        <EditForm expense={expense} />
      </div>
    </div>
  );
}
