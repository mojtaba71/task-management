import type { Task, Priority, FilterStatus, SortOption } from '../types';

// Priority weight for sorting (higher number = higher priority)
const PRIORITY_WEIGHT: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

/**
 * Efficient sorting algorithm for tasks
 * Time Complexity: O(n log n) - optimal for comparison-based sorting
 */
export function sortTasks(tasks: Task[], sortBy: SortOption): Task[] {
  // Create a shallow copy to avoid mutating the original array
  const tasksCopy = [...tasks];

  switch (sortBy) {
    case 'priority':
      // Sort by priority (high to low), then by creation date (newest first) as secondary sort
      return tasksCopy.sort((a, b) => {
        const priorityDiff = PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
        return priorityDiff !== 0 ? priorityDiff : b.createdAt - a.createdAt;
      });

    case 'date':
      // Sort by creation date (newest to oldest)
      return tasksCopy.sort((a, b) => b.createdAt - a.createdAt);

    default:
      return tasksCopy;
  }
}

/**
 * Filter tasks by completion status
 */
export function filterByStatus(tasks: Task[], status: FilterStatus): Task[] {
  switch (status) {
    case 'active':
      return tasks.filter((task) => !task.completed);
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'all':
    default:
      return tasks;
  }
}

/**
 * Search tasks by title or description
 * Case-insensitive search with trim
 */
export function searchTasks(tasks: Task[], query: string): Task[] {
  if (!query.trim()) {
    return tasks;
  }

  const lowerQuery = query.toLowerCase().trim();

  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Combined filter, search, and sort operation
 * Optimized to minimize iterations
 */
export function processTasksOptimized(
  tasks: Task[],
  status: FilterStatus,
  searchQuery: string,
  sortBy: SortOption
): Task[] {
  // Step 1: Filter by status
  let processed = filterByStatus(tasks, status);

  // Step 2: Search
  processed = searchTasks(processed, searchQuery);

  // Step 3: Sort
  processed = sortTasks(processed, sortBy);

  return processed;
}

/**
 * Get priority label with proper capitalization
 */
export function getPriorityLabel(priority: Priority): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

/**
 * Get priority class name for styling
 */
export function getPriorityClassName(priority: Priority): string {
  return `priority-${priority}`;
}
