import { fetchCardsData, fetchLatestEntries } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JSX } from "react";
import { Suspense } from "react";
import { SkeletonCard } from "./skeletons";
import { LatestEntries } from "./latestEntries";
import { getUserId } from "@/lib/auth";
import { BarChart } from "./barChart";

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
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{content}</div>
          </CardContent>
        </Card>
      </Suspense>
    </>
  );
}

export async function DashboardTotalCards() {
  const userIdCookie = await getUserId();
  const userId = userIdCookie?.value;
  if (!userId) return null;
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
  const userIdCookie = await getUserId();
  const userId = userIdCookie?.value;
  if (!userId) return null;
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
            colors={["emerald", "pink"]}
            legendPosition="left"
          />
        }
      />
    </>
  );
}

export async function DashboardLatestEntriesCard() {
  const userIdCookie = await getUserId();
  const userId = userIdCookie?.value;
  if (!userId) return null;

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
