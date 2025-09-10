export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Income = {
  id: string;
  user_id: string;
  description: string;
  amount: number;
  date: string;
};

export type Expense = {
  id: string;
  user_id: string;
  description: string;
  amount: number;
  date: string;
};


