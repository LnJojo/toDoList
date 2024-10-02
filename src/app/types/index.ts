export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
  }
  
  export interface Habit extends Todo {
    frequency: 'daily' | 'weekly';
    lastCompleted: string | null;
    count: number;
    completedCount: number;
  }