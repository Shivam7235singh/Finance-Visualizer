export interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  date: Date;
  category: string;
}
