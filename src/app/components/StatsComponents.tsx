"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Award } from "lucide-react";

export function CompletionRate() {
  const dummyData = [
    { date: "2024-01-01", completionRate: 75 },
    { date: "2024-01-02", completionRate: 80 },
    { date: "2024-01-03", completionRate: 90 },
    { date: "2024-01-04", completionRate: 85 },
    { date: "2024-01-05", completionRate: 95 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Calendar className="w-6 h-6 mr-2 text-blue-500" />
        Taux de Complétion
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dummyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="completionRate" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function HabitStreak() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Award className="w-6 h-6 mr-2 text-blue-500" />
        Séries en Cours
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded">
          <p className="text-4xl font-bold text-blue-500">7</p>
          <p className="text-sm text-gray-600">jours - Méditation</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded">
          <p className="text-4xl font-bold text-green-500">5</p>
          <p className="text-sm text-gray-600">jours - Lecture</p>
        </div>
      </div>
    </div>
  );
}
