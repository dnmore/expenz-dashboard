"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { getUserId } from "@/lib/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  description: z
    .string()
    .min(3, { message: "Please enter at least 3 characters" }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than 0." }),
  date: z.string(),
});

const CreateTransaction = FormSchema.omit({
  id: true,
  date: true,
  user_id: true
});

const UpdateTransaction = FormSchema.omit({
  id: true,
  user_id: true,
  date: true,
});

export type State = {
  errors?: {
    description?: string[];
    amount?: string[];
  };
  message?: string | null;
};

export async function createIncome(prevState: State, formData: FormData) {
  const userIdCookie = await getUserId();
  const userId = userIdCookie?.value;
  if (!userId) {
    return {
      message: "User not authenticated. Please log in.",
    };
  }

  const validatedFields = CreateTransaction.safeParse({
    description: formData.get("description"),
    amount: formData.get("amount"),
  });

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);
    return {
      errors: {
        description: tree.properties?.description?.errors,
        amount: tree.properties?.amount?.errors,
      },
      message: "Missing Fields. Failed to Create Income.",
    };
  }

  const { description, amount } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
INSERT INTO income (user_id, description, amount, date)
VALUES (${userId}, ${description}, ${amountInCents},${date})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Income entry.",
    };
  }

  revalidatePath("/dashboard/income");
  redirect("/dashboard/income");
}

export async function createExpense(prevState: State, formData: FormData) {
  const userIdCookie = await getUserId();
  const userId = userIdCookie?.value;

  if (!userId) {
    return {
      message: "User not authenticated. Please log in.",
    };
  }

  const validatedFields = CreateTransaction.safeParse({
    description: formData.get("description"),
    amount: formData.get("amount"),
  });

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);
    return {
      errors: {
        description: tree.properties?.description?.errors,
        amount: tree.properties?.amount?.errors,
      },
      message: "Missing Fields. Failed to Create Expense.",
    };
  }

  const { description, amount } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
INSERT INTO expense (user_id, description, amount, date)
VALUES (${userId}, ${description}, ${amountInCents},${date})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Expense entry.",
    };
  }

  revalidatePath("/dashboard/expense");
  redirect("/dashboard/expense");
}

export async function updateIncome(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateTransaction.safeParse({
    description: formData.get("description"),
    amount: formData.get("amount"),
  });

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);
    return {
      errors: {
        description: tree.properties?.description?.errors,
        amount: tree.properties?.amount?.errors,
      },
      message: "Missing Fields. Failed to Update Income.",
    };
  }

  const { description, amount } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
UPDATE income
SET description=${description}, amount=${amountInCents}
WHERE id=${id}`;
  } catch (error) {
    return { message: "Database Error: Failed to Update Income." };
  }

  revalidatePath("/dashboard/income");
  redirect("/dashboard/income");
}

export async function updateExpense(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateTransaction.safeParse({
    description: formData.get("description"),
    amount: formData.get("amount"),
  });

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);
    return {
      errors: {
        description: tree.properties?.description?.errors,
        amount: tree.properties?.amount?.errors,
      },
      message: "Missing Fields. Failed to Update Expense.",
    };
  }

  const { description, amount } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
UPDATE expense
SET description=${description}, amount=${amountInCents}
WHERE id=${id}`;
  } catch (error) {
    return { message: "Database Error: Failed to Update Expense." };
  }

  revalidatePath("/dashboard/expense");
  redirect("/dashboard/expense");
}

export async function deleteIncome(id: string) {
  await sql`DELETE FROM income WHERE id = ${id}`;
  revalidatePath("/dashboard/income");
}

export async function deleteExpense(id: string) {
  await sql`DELETE FROM expense WHERE id = ${id}`;
  revalidatePath("/dashboard/expense");
}
