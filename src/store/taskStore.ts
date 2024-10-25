import { create } from 'zustand';

export interface SavedTask {
  id: string;
  date: string;
  task: string;
  dayNumber: number;
}

interface TaskStore {
  savedTasks: SavedTask[];
  addTask: (task: SavedTask) => void;
  removeTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  savedTasks: [],
  addTask: (task) => 
    set((state) => ({
      savedTasks: [...state.savedTasks, task]
    })),
  removeTask: (taskId) =>
    set((state) => ({
      savedTasks: state.savedTasks.filter((task) => task.id !== taskId)
    }))
}));