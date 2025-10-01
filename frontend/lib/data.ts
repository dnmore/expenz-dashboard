import { Transaction, LatestTransactionRaw } from "./definitions";
import { formatCurrency } from "./utils";
import sql from "./db";

export async function fetchIncome(userId: string) {
  try {
    const incomeEntries = await sql<Transaction[]>`
     SELECT id, description, amount, date
     FROM income
     WHERE user_id = ${userId}
     ORDER BY date DESC
    `;

    return incomeEntries;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch income entries.");
  }
}

export async function fetchExpense(userId: string) {
  try {
    const expenseEntries = await sql<Transaction[]>`
       SELECT id, description, amount, date
     FROM expense
     WHERE user_id = ${userId}
     ORDER BY date DESC
    `;

    return expenseEntries;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expense entries.");
  }
}

export async function fetchCardsData(userId: string) {
  try {
    const incomeTotal = sql`
      SELECT SUM(amount) AS total
      FROM income
      WHERE user_id = ${userId}
    `;

    const expenseTotal = sql`
      SELECT SUM(amount) AS total
      FROM expense
      WHERE user_id = ${userId}
    `;

    const [incomeResult, expenseResult] = await Promise.all([
      incomeTotal,
      expenseTotal,
    ]);

    const income = incomeResult[0].total ?? 0;
    const expense = expenseResult[0].total ?? 0;

    return {
      totalOfIncome: formatCurrency(income),
      totalOfExpense: formatCurrency(expense),
      totalBalance: formatCurrency(income - expense),
      chartIncomeData: income / 100,
      chartExpenseData: expense / 100,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchLatestEntries(userId: string) {
  try {
    const incomeData = await sql<LatestTransactionRaw[]>`
     SELECT income.id, income.description, income.amount
     FROM income
     WHERE income.user_id = ${userId}
     ORDER BY income.date DESC
     LIMIT 5
    `;

    const expenseData = await sql<LatestTransactionRaw[]>`
    SELECT expense.id, expense.description, expense.amount
     FROM expense
     WHERE expense.user_id = ${userId}
     ORDER BY expense.date DESC
     LIMIT 5
    `;

    const latestIncomeEntries = incomeData.map((entry) => ({
      ...entry,
      amount: formatCurrency(entry.amount),
    }));

    const latestExpenseEntries = expenseData.map((entry) => ({
      ...entry,
      amount: formatCurrency(entry.amount),
    }));

    return {
      latestIncomeEntries,
      latestExpenseEntries,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch latest entries.");
  }
}

export async function fetchIncomeById(id: string, userId: string) {
  try {
    const data = await sql<Transaction[]>`
     SELECT id, description, amount, date
     FROM income
     WHERE user_id = ${userId}
     AND id = ${id}
     
    `;

    const incomeEntry = data.map((entry) => ({
      ...entry,
      amount: entry.amount / 100,
    }));

    return incomeEntry[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch income entry.");
  }
}

export async function fetchExpenseById(id: string, userId: string) {
  try {
    const data = await sql<Transaction[]>`
     SELECT id, description, amount, date
     FROM expense
     WHERE user_id = ${userId}
     AND id = ${id}
     
    `;

    const expenseEntry = data.map((entry) => ({
      ...entry,
      amount: entry.amount / 100,
    }));

    return expenseEntry[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch expense entry.");
  }
}
