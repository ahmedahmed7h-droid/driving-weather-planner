import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center mt-16">
      <h1 className="text-4xl font-bold mb-4">Driving Lesson Weather Planner</h1>
      <p className="text-gray-600 text-lg mb-8">
        Plan your driving lessons around the best weather conditions.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
