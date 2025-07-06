import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-lg font-semibold bg-gradient-to-r hover:from-amber-400 hover:to-yellow-500  px-2 py-1 rounded"
        >
          💰 Finance Tracker
        </Link>
        <div className="space-x-4 text-sm">
          <Link href="/add" className="text-bold font-semibold bg-gradient-to-r hover:from-amber-400 hover:to-yellow-500  px-2 py-1 rounded">
            Add Transaction
          </Link>
          <Link href="/dashboard" className="text-bold font-semibold bg-gradient-to-r hover:from-amber-400 hover:to-yellow-500  px-2 py-1 rounded">
            Dashboard
          </Link>
          <Link href="/reports" className="text-bold font-semibold bg-gradient-to-r hover:from-amber-400 hover:to-yellow-500  px-2 py-1 rounded">
            Reports
          </Link>
        </div>
      </div>
    </nav>
  );
}
