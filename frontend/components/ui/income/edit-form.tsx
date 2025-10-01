"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateIncome, State } from "@/lib/actions";
import { Transaction } from "@/lib/definitions";

export default function EditForm({ income }: { income: Transaction }) {
  const updateIncomeWithId = updateIncome.bind(null, income.id);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateIncomeWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 border border-gray-200 py-8 px-4 md:px-6 ">
        <div className="mb-6">
          <Label htmlFor="description" className="mb-2">
            Description
          </Label>
          <Input
            type="text"
            id="description"
            name="description"
            aria-describedby="description-error"
            defaultValue={income.description}
            className="bg-white"
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-6">
          <Label htmlFor="amount" className="mb-2">
            Amount
          </Label>
          <Input
            type="amount"
            id="amount"
            name="amount"
            aria-describedby="amount-error"
            defaultValue={income.amount}
            className="bg-white"
          />
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button asChild variant="outline">
          <Link
            href="/dashboard/income"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
        </Button>

        <Button type="submit">
          Edit Income
        </Button>
      </div>
    </form>
  );
}
