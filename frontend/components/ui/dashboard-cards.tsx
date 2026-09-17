import { fetchCardsData, fetchLatestEntries } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { JSX } from "react";
import { Suspense } from "react";
import { SkeletonCard } from "./skeletons";
import { LatestEntries } from "./latestEntries";
import { getUserId } from "@/lib/session";
import { BarChart } from "./barChart";
import { redirect } from "next/navigation";


export function DashboardCard({
  title,
  content,
}: {
  title: string;
  content: string | JSX.Element;
}) {
  return (
    <>
      <Suspense fallback={<SkeletonCard />}>
        <Card>
          <CardHeader>
            <CardDescription>{title}</CardDescription>
            <CardTitle className="text-2xl font-semibold" >{content}</CardTitle>
          </CardHeader>
          
        </Card>
      </Suspense>
    </>
  );
}

export async function DashboardTotalCards() {
  
   const userId = await getUserId();

  if (!userId) {
    redirect("/");
  }
  const { totalOfIncome, totalOfExpense, totalBalance } = await fetchCardsData(
    userId
  );

  return (
    <>
      <DashboardCard title="Total Income" content={totalOfIncome} />
      <DashboardCard title="Total Expense" content={totalOfExpense} />
      <DashboardCard title="Total Balance" content={totalBalance} />
    </>
  );
}

export async function DashboardBarChartCard() {
 
  const userId = await getUserId();

  if (!userId) {
    redirect("/");
  }
  const { chartIncomeData, chartExpenseData } = await fetchCardsData(userId);

  const barChartdata = [
    {
      name: "Total of transactions",
      Income: chartIncomeData ?? 0,
      Expense: chartExpenseData ?? 0,
    },
  ];

  return (
    <>
      <DashboardCard
        title="Total Overview"
         content={
          <BarChart
          
            data={barChartdata}
            index="name"
            categories={["Income", "Expense"]}
            barCategoryGap={"30%"}
            colors={["blue", "gray"]}
            showLegend={false}
            
          />
        }
      />
    </>
  );
}

export async function DashboardLatestEntriesCard() {
 
   const userId = await getUserId();

  if (!userId) {
    redirect("/");
  }

  const { latestIncomeEntries, latestExpenseEntries } =
    await fetchLatestEntries(userId);

  return (
    <>
      <DashboardCard
        title="Latest Entries"
        content={
          <LatestEntries
            latestIncomeEntries={latestIncomeEntries}
            latestExpenseEntries={latestExpenseEntries}
          />
        }
      />
    </>
  );
}
