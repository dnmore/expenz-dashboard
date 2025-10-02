import type { Metadata } from "next";
import CreateForm from "@/components/ui/expense/create-form";


export const metadata: Metadata = {
  title: "Create Expense",
};

export default async function Page() {
  return (
    <div className="pt-6">
      <h1 className="mb-2 text-xl md:text-2xl  ml-1">Create Expense</h1>
      <div className="container py-10 max-w-lg">
        <CreateForm />
      </div>
    </div>
  );
}
