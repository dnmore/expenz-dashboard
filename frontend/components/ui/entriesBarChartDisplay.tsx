"use client";

import { formatCurrency } from "@/lib/utils";
import { BarChart } from "./barChart";

type EntriesBarChartDisplayProps = {
  chartdata: {
    name: string;
    "Total of transactions": number;
  }[];
};

export const EntriesBarChartDisplay = (props: EntriesBarChartDisplayProps) => {
  return (
    <div className="p-4">
      <BarChart
        data={props.chartdata}
        index="name"
        categories={["Total of transactions"]}
        
      />
    </div>
  );
};
