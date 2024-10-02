import TodoList from "./components/TodoList";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Mes Tâches et Habitudes</h1>
      <TodoList />
    </div>
  );
}
