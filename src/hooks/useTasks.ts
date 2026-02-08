import { useCallback } from 'react';
import type { Task, TaskFormData } from '../types';
import { useLocalStorage } from './useLocalStorage';

const TASKS_STORAGE_KEY = 'tasks';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_STORAGE_KEY, []);

  // Create a new task
  const addTask = useCallback((taskData: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, [setTasks]);

  // Update an existing task
  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }, [setTasks]);

  // Toggle task completion status
  const toggleTaskComplete = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  // Delete a task
  const deleteTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, [setTasks]);

  return {
    tasks,
    addTask,
    updateTask,
    toggleTaskComplete,
    deleteTask,
  };
}
