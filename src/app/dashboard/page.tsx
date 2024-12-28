"use client";

import { useEffect, useState } from "react";
import { clearAuthData } from "@/util/login";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/util/login";
import { fetchInsights } from "@/util/insights";
import InsightsCard from "@/components/InsightsCard";
import type { InsightItem } from "@/types/insights";

export default function Dashboard() {
  const router = useRouter();
  const user = getStoredUser();
  const [textInsights, setTextInsights] = useState<InsightItem[]>([]);
  const [imageInsights, setImageInsights] = useState<InsightItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const [textData, imageData] = await Promise.all([
          fetchInsights("TEXT"),
          fetchInsights("IMAGE"),
        ]);

        setTextInsights(textData.data);
        setImageInsights(imageData.data);
      } catch (error) {
        console.error("Failed to load insights:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, []);

  const handleLogout = async () => {
    await clearAuthData();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {user && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Welcome, {user.fullName}
            </h2>
            <div className="grid gap-4">
              <p>Organization: {user.orgName}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          <InsightsCard title="Ad Images" data={imageInsights} type="image" />
          <InsightsCard title="Ad Copy Text" data={textInsights} type="text" />
        </div>
      </div>
    </div>
  );
}
