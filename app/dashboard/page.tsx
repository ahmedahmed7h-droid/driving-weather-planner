"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Weather = {
  description: string;
  temp: number;
  icon: string;
};

type Lesson = {
  id: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  weather?: Weather | null;
};

async function fetchWeather(location: string, date: string, time: string): Promise<Weather | null> {
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${key}&units=metric`
    );
    const data = await res.json();
    if (data.cod !== "200") return null;

    const target = new Date(`${date}T${time}`).getTime();
    const closest = data.list.reduce((prev: any, curr: any) => {
      const currDiff = Math.abs(new Date(curr.dt_txt).getTime() - target);
      const prevDiff = Math.abs(new Date(prev.dt_txt).getTime() - target);
      return currDiff < prevDiff ? curr : prev;
    });

    return {
      description: closest.weather[0].description,
      temp: Math.round(closest.main.temp),
      icon: closest.weather[0].icon,
    };
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email ?? "");

      const { data } = await supabase
        .from("lessons")
        .select("*")
        .order("date", { ascending: true });

      const lessonsData: Lesson[] = data ?? [];

      const lessonsWithWeather = await Promise.all(
        lessonsData.map(async (lesson) => ({
          ...lesson,
          weather: await fetchWeather(lesson.location, lesson.date, lesson.time),
        }))
      );

      setLessons(lessonsWithWeather);
      setLoading(false);
    }

    load();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleDelete(id: string) {
    await supabase.from("lessons").delete().eq("id", id);
    setLessons((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          {email && <p className="text-sm text-gray-500 mt-1">Logged in as {email}</p>}
        </div>
        <div className="flex gap-3">
          <Link
            href="/add-lesson"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Add Lesson
          </Link>
          <button
            onClick={handleLogout}
            className="border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Log Out
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading lessons...</p>
      ) : lessons.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          <p className="text-lg mb-2">No lessons yet.</p>
          <p className="text-sm">Click &quot;Add Lesson&quot; above to schedule your first driving lesson.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="bg-white rounded-xl shadow p-5 flex justify-between items-start">
              <div>
                <p className="font-semibold">{lesson.date} at {lesson.time}</p>
                <p className="text-gray-600 text-sm mt-1">{lesson.location}</p>
                {lesson.notes && <p className="text-gray-400 text-sm mt-1">{lesson.notes}</p>}
                {lesson.weather ? (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      src={`https://openweathermap.org/img/wn/${lesson.weather.icon}.png`}
                      alt={lesson.weather.description}
                      width={32}
                      height={32}
                    />
                    <span className="text-sm text-gray-600 capitalize">
                      {lesson.weather.description}, {lesson.weather.temp}°C
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-2">Weather unavailable</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(lesson.id)}
                className="text-red-400 hover:text-red-600 text-sm ml-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
