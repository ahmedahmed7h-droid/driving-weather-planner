import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-blue-600 text-lg">
          DrivePlan
        </Link>
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link href="/add-lesson" className="text-gray-600 hover:text-blue-600 transition">
            Add Lesson
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-600 transition">
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
