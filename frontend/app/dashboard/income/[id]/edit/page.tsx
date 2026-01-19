import type { Metadata } from "next";
import EditForm from "@/components/ui/income/edit-form";
import { fetchIncomeById } from "@/lib/data";
import { notFound } from "next/navigation";
import { getUserId } from "@/lib/session";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: 'Edit Income',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const userId = await getUserId();
    
      if (!userId) {
        redirect("/");
      }
  const income = await fetchIncomeById(id, userId);

  if (!income) {
    notFound();
  }
  return (
    <div className="pt-6">
      <h1 className="mb-2 text-xl md:text-2xl  ml-1">
        Edit Income
      </h1>
      <div className="container py-10 max-w-lg">
        <EditForm income={income} />
      </div>
    </div>
  );
}
