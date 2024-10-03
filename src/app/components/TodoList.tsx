"use client";

import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Trash2,
  RotateCcw,
  CheckCircle,
  Circle,
} from "lucide-react";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { Todo, Habit } from "../types";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newHabit, setNewHabit] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [activeTab, setActiveTab] = useState<"todos" | "habits">("habits");
  const [habitFilter, setHabitFilter] = useState<"all" | "daily" | "weekly">(
    "all"
  );

  useEffect(() => {
    const loadData = () => {
      const savedTodos = localStorage.getItem("todos");
      const savedHabits = localStorage.getItem("habits");

      console.log("Loading data:", { savedTodos, savedHabits });

      if (savedTodos) setTodos(JSON.parse(savedTodos));
      if (savedHabits) setHabits(JSON.parse(savedHabits));
    };

    if (!isDataLoaded) {
      loadData();
      setIsDataLoaded(true);
    }
    window.addEventListener("storage", loadData);

    const initializeFrequency = () => setFrequency("daily");
    initializeFrequency();

    return () => window.removeEventListener("storage", loadData);
  }, [isDataLoaded]);

  useEffect(() => {
    console.log("Saving todos:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    console.log("Saving habits:", habits);
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
      setNewTask("");
    }
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabit.trim()) {
      const newHabitItem: Habit = {
        id: Date.now(),
        text: newHabit,
        frequency,
        completed: false,
        lastCompleted: null,
        createdAt: new Date().toISOString(),
        count: 1,
        completedCount: 0,
      };
      setHabits((prevHabits) => [...prevHabits, newHabitItem]);
      setNewHabit("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleHabit = (id: number) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const newCompletedCount =
            habit.completedCount + 1 > habit.count
              ? 0
              : habit.completedCount + 1;
          return {
            ...habit,
            completedCount: newCompletedCount,
            completed: newCompletedCount === habit.count,
            lastCompleted:
              newCompletedCount === habit.count
                ? new Date().toISOString()
                : habit.lastCompleted,
          };
        }
        return habit;
      })
    );
  };

  const changeHabitFrequency = (
    id: number,
    newFrequency: "daily" | "weekly"
  ) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, frequency: newFrequency } : habit
      )
    );
  };

  const changeHabitCount = (id: number, newCount: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, count: newCount } : habit
      )
    );
  };

  const filteredHabits =
    habitFilter === "all"
      ? habits
      : habits.filter((habit) => habit.frequency === habitFilter);

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("habits")}
          className={`flex-1 py-2 rounded ${
            activeTab === "habits"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Habitudes
        </button>
        <button
          onClick={() => setActiveTab("todos")}
          className={`flex-1 py-2 rounded ${
            activeTab === "todos"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Tâches
        </button>
      </div>

      {activeTab === "todos" ? (
        <div>
          <form onSubmit={handleAddTodo} className="flex mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Ajouter une nouvelle tâche"
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 flex items-center"
            >
              <PlusCircle className="w-5 h-5 mr-1" />
              Ajouter
            </button>
          </form>

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="mr-3 h-5 w-5 text-blue-500"
                  />
                  <span
                    className={
                      todo.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : "text-gray-800 dark:text-gray-200"
                    }
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <form onSubmit={handleAddHabit} className="mb-4">
            <div className="flex mb-2">
              <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Ajouter une nouvelle habitude"
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 flex items-center"
              >
                <PlusCircle className="w-5 h-5 mr-1" />
                Ajouter
              </button>
            </div>
          </form>

          <div className="flex space-x-2 mb-4">
            {["all", "daily", "weekly"].map((filter) => (
              <button
                key={filter}
                onClick={() =>
                  setHabitFilter(filter as "all" | "daily" | "weekly")
                }
                className={`px-3 py-1 rounded ${
                  habitFilter === filter
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {filter === "all"
                  ? "Tous"
                  : filter === "daily"
                  ? "Quotidien"
                  : "Hebdomadaire"}
              </button>
            ))}
          </div>

          <ul className="space-y-2">
            {filteredHabits.map((habit) => (
              <li
                key={habit.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => toggleHabit(habit.id)}
              >
                <div className="flex items-center flex-1">
                  <div className="mr-3">
                    {habit.completedCount === habit.count ? (
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    ) : (
                      <Circle className="w-10 h-10 text-gray-400">
                        <PlusCircle className="w-6 h-6 text-gray-600" />
                      </Circle>
                    )}
                  </div>
                  <div className="flex-1">
                    <span
                      className={
                        habit.completedCount === habit.count
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : "text-gray-800 dark:text-gray-200"
                      }
                    >
                      {habit.text}
                    </span>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      <select
                        value={habit.frequency}
                        onChange={(e) => {
                          e.stopPropagation();
                          changeHabitFrequency(
                            habit.id,
                            e.target.value as "daily" | "weekly"
                          );
                        }}
                        className="bg-transparent border-none dark:bg-gray-700 dark:text-gray-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="daily">Quotidien</option>
                        <option value="weekly">Hebdomadaire</option>
                      </select>
                      <span className="ml-2">
                        {habit.completedCount}/{habit.count} fois
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={habit.count}
                    onChange={(e) => {
                      e.stopPropagation();
                      changeHabitCount(habit.id, parseInt(e.target.value));
                    }}
                    className="w-12 p-1 mr-2 border rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteHabit(habit.id);
                    }}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
