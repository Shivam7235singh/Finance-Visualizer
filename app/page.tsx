'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      
      {/* 🔵 Animated background dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-500 opacity-20 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* 🔵 Main content */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          💰 Welcome to Your Personal Finance Tracker
        </h1>
        <p className="text-gray-700 mb-8 text-lg">
          Track expenses, analyze your spending, and take control of your finances — all in one place.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/add"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-md transition"
          >
            Add to Diary
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded shadow-md transition"
          >
            View Dashboard
          </Link>
          <Link
            href="/reports"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded shadow-md transition"
          >
            View Reports
          </Link>
        </div>
      </div>
    </main>
  );
}
