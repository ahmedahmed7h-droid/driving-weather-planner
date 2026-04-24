import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <Link
          href="/add-lesson"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Add Lesson
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        <p className="text-lg mb-2">No lessons yet.</p>
        <p className="text-sm">
          Click &quot;Add Lesson&quot; above to schedule your first driving lesson.
        </p>
      </div>
    </div>
  );
}
