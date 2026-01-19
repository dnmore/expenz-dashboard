import type { Metadata } from "next";
import EditForm from "@/components/ui/expense/edit-form";
import { fetchExpenseById } from "@/lib/data";
import { notFound } from "next/navigation";
import { getUserId } from "@/lib/session";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: 'Edit Expense',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const userId = await getUserId();
    
      if (!userId) {
        redirect("/");
      }

  const expense = await fetchExpenseById(id, userId);

  if (!expense) {
    notFound();
  }

  return (
    <div className="pt-6">
      <h1 className="mb-2 text-xl md:text-2xl  ml-1">
       Edit Expense
      </h1>
      <div className="container py-10 max-w-lg">
        <EditForm expense={expense} />
      </div>
    </div>
  );
}
