import { columns} from "@/app/dashboard/income/columns";
import { DataTable } from "@/components/ui/data-table";
import { fetchIncome } from "@/lib/data"



export default async function Page(){

    const incomeItems = await fetchIncome('5db65b42-7401-4890-9017-68a4ad6f0884');
    return(<main>
        <h1 className="mb-4 text-xl md:text-2xl">Income Page</h1>
        <div className="container mx-auto py-10">
      <DataTable columns={columns} data={incomeItems} />
    </div>
    </main>)
}