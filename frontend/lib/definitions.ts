export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  description: string;
  amount: number;
  date: string;
};

export type LatestTransaction = {
  id: string;
  description: string;
  amount: string;
};


export type LatestTransactionRaw = Omit<LatestTransaction, 'amount'> & {
  amount: number;
};