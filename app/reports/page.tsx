'use client';

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Transaction = {
  amount: number;
  category: string;
};

export default function ReportsPage() {
  const [categoryData, setCategoryData] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(({ data }: { data: Transaction[] }) => {
        const grouped: Record<string, number> = {};

        data.forEach(txn => {
          grouped[txn.category] = (grouped[txn.category] || 0) + txn.amount;
        });

        setCategoryData(grouped);
      });
  }, []);

  const generateColors = (count: number) =>
    Array.from({ length: count }, (_, i) =>
      `hsl(${(i * 360) / count}, 70%, 60%)`
    );

  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: '₹ spent',
        data: Object.values(categoryData),
        backgroundColor: generateColors(Object.keys(categoryData).length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-purple-200 via-indigo-400 to-blue-400 text-center">
      <h1 className="text-3xl font-bold mb-6">📈 Expense Breakdown by Category</h1>
      <div className="max-w-md mx-auto">
        <Pie data={data} />
      </div>
    </div>
  );
}
