import { fetchCardsData, fetchLatestEntries } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JSX } from "react";
import { Suspense } from "react";
import { SkeletonCard } from "./skeletons";
import { EntriesBarChartDisplay } from "./entriesBarChartDisplay";
import { LatestEntries } from "./latestEntries";
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
  const { totalOfIncome, totalOfExpense, totalBalance } = await fetchCardsData(
    "5db65b42-7401-4890-9017-68a4ad6f0884"
  );

  return (
    <>
      <DashboardCard title="Total Income" content={totalOfIncome} />
      <DashboardCard title="Total Expense" content={totalOfExpense} />
      <DashboardCard title="Total Balance" content={totalBalance} />
    </>
  );
}

export async function DashboardChartCard() {
  const { chartIncomeData, chartExpenseData } = await fetchCardsData(
    "5db65b42-7401-4890-9017-68a4ad6f0884"
  );

  const chartdata = [
    {
      name: "Income",
      "Total of transactions": chartIncomeData ?? 0,
    },
    {
      name: "Expense",
      "Total of transactions": chartExpenseData ?? 0,
    },
  ];

  return (
    <>
      <DashboardCard
        title="Total overview"
        content={<EntriesBarChartDisplay chartdata={chartdata} />}
      />
    </>
  );
}

export async function DashboardLatestEntriesCard() {
  const { latestIncomeEntries, latestExpenseEntries } =
    await fetchLatestEntries("5db65b42-7401-4890-9017-68a4ad6f0884");

  return (
    <>
      <DashboardCard
        title="Latest entries"
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
