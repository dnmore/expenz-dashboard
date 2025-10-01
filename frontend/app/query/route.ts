import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// list all income entries
async function listIncome() {
  const data = await sql`
    SELECT * FROM income
    
    
  `;

  return data;
}

// list all expense entries
async function listExpense() {
  const data = await sql`
    SELECT * FROM expense
    
    
  `;

  return data;
}

// export async function GET() {
//   try {
//     return Response.json(await listExpense());
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }

//##############################################################//

// list income entries for a specific user
async function listIncomeForUser(userId: string) {
  const data = await sql`
  SELECT income.*, users.name, users.email
  FROM income
  JOIN users ON income.user_id = users.id
  WHERE users.id = ${userId}


  `;
  return data;
}

// list expense entries for a specific user
async function listExpenseForUser(userId: string) {
  const data = await sql`
  SELECT expense.*, users.name, users.email
  FROM expense
  JOIN users ON expense.user_id = users.id
  WHERE users.id = ${userId}


  `;
  return data;
}

//##############################################################//
// return userId for a provided email identifier

async function getUserIdByEmail(identifier: string) {
  const data = await sql`
  SELECT id FROM users WHERE email = ${identifier} LIMIT 1`;

  return data;
}

export async function GET() {
  try {
    const emailIdentifier = "john@demo.com";
    return Response.json(await getUserIdByEmail(emailIdentifier));
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
