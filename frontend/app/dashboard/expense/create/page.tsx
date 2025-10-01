import type { Metadata } from "next";
import CreateForm from "@/components/ui/expense/create-form";
import { CircleArrowOutDownRight} from "lucide-react";

export const metadata: Metadata = {
  title: 'Create Expense',
};


export default async function Page() {
  return (
    <div className="pt-6">
      <h1 className="mb-2 text-md md:text-lg flex gap-1.5 items-center ml-1">
        <CircleArrowOutDownRight  size={18} />
        <span>Create Expense</span>
      </h1>
      <div className="container py-10 max-w-lg">
        <CreateForm />
      </div>
    </div>
  );
}
