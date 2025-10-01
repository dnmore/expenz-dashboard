"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createIncome, State } from "@/lib/actions";

export default function CreateForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createIncome, initialState);
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
            placeholder="e.g. 'Stock Dividends'"
            aria-describedby="description-error"
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
            type="number"
            id="amount"
            name="amount"
            placeholder="e.g. '200'"
            aria-describedby="amount-error"
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
          Create Income
        </Button>
      </div>
    </form>
  );
}
