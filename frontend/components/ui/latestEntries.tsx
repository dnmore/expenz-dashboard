import { LatestTransaction } from "@/lib/definitions";
type LatestEntriesProps = {
  latestIncomeEntries: LatestTransaction[];
  latestExpenseEntries: LatestTransaction[];
};
export const LatestEntries = (props: LatestEntriesProps) => {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h3 className="mb-2 text-sm md:text-md font-semibold">Income</h3>
      <ul className="flex grow flex-col justify-between p-4">
        {props.latestIncomeEntries.map((entry) => {
          return (
            <li
              key={entry.id}
              className="mb-2 flex justify-between border-b pb-2 text-xs md:text-sm"
            >
              <span>{entry.description}</span>
              <span>{entry.amount}</span>
            </li>
          );
        })}
      </ul>
      <h3 className="mb-2 text-sm md:text-md font-semibold">Expense</h3>
      <ul className="flex grow flex-col justify-between p-4">
        {props.latestExpenseEntries.map((entry) => {
          return (
            <li
              key={entry.id}
              className="mb-2 flex justify-between border-b pb-2 text-xs md:text-sm"
            >
              <span>{entry.description}</span>
              <span>{entry.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
