import React from "react";
import { CompletionRate, HabitStreak } from "../components/StatsComponents";

export default function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Statistiques</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HabitStreak />
        <CompletionRate />
      </div>
    </div>
  );
}
