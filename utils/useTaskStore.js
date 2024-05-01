// useTaskStore.js
import { create } from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    })),
}));

export default useTaskStore;
