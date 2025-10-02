import type { Metadata } from "next";
import EditForm from "@/components/ui/income/edit-form";
import { fetchIncomeById } from "@/lib/data";
import { notFound } from "next/navigation";
import { getUserId } from "@/lib/auth";


export const metadata: Metadata = {
  title: 'Edit Income',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const userIdCookie = await getUserId();
  const userId = userIdCookie?.value;
  if (!userId) return null;
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
