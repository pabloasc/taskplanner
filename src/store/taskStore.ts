import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  text: string;
  day: number;
  date: string;
}

interface TaskState {
  savedTasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      savedTasks: [],
      addTask: (task) =>
        set((state) => ({
          savedTasks: [...state.savedTasks, task],
        })),
      removeTask: (taskId) =>
        set((state) => ({
          savedTasks: state.savedTasks.filter((task) => task.id !== taskId),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);