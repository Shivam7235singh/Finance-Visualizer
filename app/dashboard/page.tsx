"use client";

import { useEffect, useState } from "react";
import useFinanceStore from "@/store/financeStore";
import {Transaction} from "@/types/Transaction";

const categories = [
  "Food", "Transport", "Rent", "Health", "Shopping",
  "Utilities", "Entertainment", "Other",
];

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function Dashboard() {
  const { transactions, setTransactions,  updateTransaction, deleteTransaction } = useFinanceStore();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ amount: "", category: "" });

  // Fetch transactions on mount
  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  // Group by "Month YYYY"
  const monthGroups = transactions.reduce((acc: Record<string, Transaction[]>, txn) => {
    const dateObj = new Date(txn.date);
    const key = `${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(txn);
    return acc;
  }, {});

  const MonthButtons = () => {
    const sortedMonths = Object.keys(monthGroups).sort((a, b) => {
      const [monthA, yearA] = a.split(" ");
      const [monthB, yearB] = b.split(" ");
      return new Date(`${monthA} 1, ${yearA}`).getTime() - new Date(`${monthB} 1, ${yearB}`).getTime();
    });

    return (
      <div className="flex flex-wrap gap-4 justify-center my-6">
        {sortedMonths.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-4 py-2 rounded shadow-md transition text-white ${
              selectedMonth === month ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    );
  };

  const handleSave = async (txn: Transaction) => {
    const updatedTxn = {
      ...txn,
      amount: parseFloat(editData.amount),
      category: editData.category,
    };

    const res = await fetch(`/api/transactions/${txn._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTxn),
    });

    if (res.ok) {
      updateTransaction(updatedTxn);
      setEditingId(null);
    }else {
    console.error("Failed to update transaction");
   }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    if (res.ok) {
      deleteTransaction(id);
    }else {
    console.error("Failed to delete transaction");
  }
  };

  const MonthlyExpenses = () => {
    if (!selectedMonth || !monthGroups[selectedMonth]) return null;

    const byDate: Record<string, Transaction[]> = {};
    monthGroups[selectedMonth].forEach((txn) => {
      const dateStr = new Date(txn.date).toLocaleDateString();
      if (!byDate[dateStr]) byDate[dateStr] = [];
      byDate[dateStr].push(txn);
    });

    const total = monthGroups[selectedMonth].reduce((sum, txn) => sum + txn.amount, 0);

    return (
      <div className="max-w-2xl mx-auto mt-4">
        <h2 className="text-2xl font-bold mb-4 text-center">{selectedMonth} Expenses</h2>
        {Object.entries(byDate).map(([date, txns]) => (
          <div key={date} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-semibold text-blue-600 mb-2">{date}</h3>
            <ul className="text-sm space-y-2">
              {txns.map((txn) => {
                const isEditing = editingId === txn._id;

                return (
                  <li key={txn._id} className="flex justify-between items-center">
                    {isEditing ? (
                      <>
                        <select
                          value={editData.category}
                          onChange={(e) =>
                            setEditData({ ...editData, category: e.target.value })
                          }
                          className="w-40 px-2 py-1 border rounded mr-2"
                        >
                          <option value="">Select</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          value={editData.amount}
                          onChange={(e) =>
                            setEditData({ ...editData, amount: e.target.value })
                          }
                          className="border px-2 py-1 rounded w-24 mr-2"
                        />
                        <button
                          onClick={() => handleSave(txn)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{txn.category}</span>
                        <div className="flex items-center gap-3">
                          <span>₹{txn.amount}</span>
                          <button
                            onClick={() => {
                              setEditingId(txn._id);
                              setEditData({
                                amount: txn.amount.toString(),
                                category: txn.category,
                              });
                            }}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(txn._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <div className="text-lg font-bold text-right mt-2">Total: ₹{total}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-indigo-400 to-blue-400 p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">📅 Monthly Expense Dashboard</h1>
      {MonthButtons()}
      {MonthlyExpenses()}
    </div>
  );
}
