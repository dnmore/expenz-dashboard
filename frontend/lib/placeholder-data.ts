

export const users = [
  {
    id: '5db65b42-7401-4890-9017-68a4ad6f0884',
    name: 'User',
    email: 'user@testmail.com',
    password: '123456',
  },
  {
    id: '62b4037c-98ae-4dce-8380-06bcf212b1ba',
    name: 'User2',
    email: 'user2@testmail.com',
    password: '789012',
  },
];


export const income = [
  {user_id:users[0].id, description: "Salary", amount: 200000, date: "2024-12-01" },
  { user_id:users[0].id, description: "Stock Dividends", amount: 20000, date: "2025-08-18" },
  { user_id:users[0].id, description: "Gifts", amount: 15000, date: "2024-12-12" },
  { user_id:users[0].id, description: "Bonus", amount: 130000, date: "2024-12-15" },
  { user_id:users[1].id, description: "Interest Income", amount: 5000, date: "2024-12-08" },
  { user_id:users[1].id, description: "Online Course Sale", amount: 50000, date: "2024-12-11"},
  { user_id:users[1].id, description: "Tax Refund", amount: 80000, date: "2024-12-07" },
  { user_id:users[1].id, description: "Rental Income", amount: 100000, date: "2024-12-03" },
];

export const expense = [
  { user_id:users[0].id, description: "Grocery", amount: 25000, date: "2024-12-02" },
  { user_id:users[0].id, description: "Utility Bills", amount: 12000, date: "2024-12-04" },
  { user_id:users[0].id, description: "Rent Payment", amount: 150000, date: "2024-12-01" },
  { user_id:users[0].id, description: "Entertainment", amount: 8000, date: "2024-12-06" },
  { user_id:users[0].id, description: "Dining Out", amount: 4500, date: "2024-12-08" },
  { user_id:users[1].id, description: "Fuel", amount: 6000, date: "2024-12-05" },
  { user_id:users[1].id, description: "Insurance Premium", amount: 20000, date: "2024-12-07"},
  { user_id:users[1].id, description: "Subscription Service", amount: 1500, date: "2024-12-09"},
  { user_id:users[1].id, description: "Shopping", amount: 30000, date: "2024-12-10" },
  { user_id:users[1].id,description: "Medical Expenses", amount: 10000, date: "2024-12-13"},
];

