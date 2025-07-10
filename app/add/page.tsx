'use client';

import { useState } from 'react';
import useFinanceStore from '@/store/financeStore';

const categories = [
  'Food',
  'Transport',
  'Rent',
  'Health',
  'Shopping',
  'Utilities',
  'Entertainment',
  'Other',
];

export default function AddExpenseForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const { addTransaction } = useFinanceStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      setMessage('Please fill in all fields');
      return;
    }

    const txn = {
      userId: 1, // Replace with real user ID if needed
      amount: parseFloat(amount),
      category: category,
      date,
    };

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(txn),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const savedTxn = await res.json();
        addTransaction(savedTxn);
        setMessage('Expense added successfully!');
        setAmount('');
        setCategory('');
        setDate('');
      } else {
        setMessage('Failed to add expense');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error');
    }
  };

  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Daily Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div>
          <label className="block mb-1 font-medium">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Add Expense
        </button>

        {/* Message */}
        {message && <p className="text-center text-sm mt-2 text-gray-700">{message}</p>}
      </form>
    </section>
  );
}
