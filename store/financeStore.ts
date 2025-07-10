import { create } from 'zustand';
import { Transaction } from '@/types/Transaction';


interface FinanceState {
  transactions: Transaction[];

  addTransaction: (txn: Transaction) => void;
  setTransactions: (txns: Transaction[]) => void;
  updateTransaction: (updatedTxn: Transaction) => void;
  deleteTransaction: (id: string) => void;

  getTotalByCategory: () => Record<string, number>;
}

const useFinanceStore = create<FinanceState>((set, get) => ({
  transactions: [],

  addTransaction: (txn: Transaction) =>
    set((state) => ({
      transactions: [...state.transactions, txn],
    })),

  setTransactions: (txns: Transaction[]) => set({ transactions: txns }),

  updateTransaction: (updatedTxn: Transaction) =>
    set((state) => ({
      transactions: state.transactions.map((txn) =>
        txn._id === updatedTxn._id ? { ...txn, ...updatedTxn } : txn
      ),
    })),

  deleteTransaction: (id: string) =>
    set((state) => ({
      transactions: state.transactions.filter((txn) => txn._id !== id),
    })),

  getTotalByCategory: () => {
    const totals: Record<string, number> = {};
    get().transactions.forEach((txn) => {
      totals[txn.category] = (totals[txn.category] || 0) + txn.amount;
    });
    return totals;
  },
}));

export default useFinanceStore;
