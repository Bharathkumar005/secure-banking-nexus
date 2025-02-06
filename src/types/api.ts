export interface User {
  name: string;
  email: string;
  accountNumber: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Transaction {
  _id: string;
  sender: string;
  recipient?: string;
  type: 'transfer' | 'deposit' | 'withdraw';
  amount: number;
  description: string;
  date: string;
}

export interface AccountResponse {
  balance: number;
  transactions: Transaction[];
}

export interface TransactionResponse {
  message: string;
  balance: number;
}