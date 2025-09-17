import bcrypt from 'bcryptjs'
import postgres from 'postgres';
import { users, income, expense } from '@/lib/placeholder-data';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedIncome() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS income (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      description VARCHAR(255) NOT NULL,
      amount INT NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedIncome = await Promise.all(
    income.map(
      (entry) => sql`
        INSERT INTO income (user_id, description, amount, date)
        VALUES (${entry.user_id}, ${entry.description}, ${entry.amount}, ${entry.date}::date)
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedIncome;
}

async function seedExpense() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS expense (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      description VARCHAR(255) NOT NULL,
      amount INT NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedExpense = await Promise.all(
    expense.map(
      (entry) => sql`
        INSERT INTO expense (user_id, description, amount, date)
        VALUES (${entry.user_id}, ${entry.description}, ${entry.amount}, ${entry.date}::date)
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedExpense;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedIncome(),
      seedExpense(),
      
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}