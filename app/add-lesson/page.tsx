import Link from "next/link";

export default function AddLessonPage() {
  return (
    <div className="max-w-sm mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Add a Driving Lesson</h1>
      <form className="bg-white p-8 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            placeholder="e.g. High Street, London"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes (optional)</label>
          <textarea
            placeholder="e.g. Practice motorway driving"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Save Lesson
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Back to Dashboard
        </Link>
      </p>
    </div>
  );
}
