export type Priority = 'low' | 'medium' | 'high';

export type FilterStatus = 'all' | 'active' | 'completed';

export type SortOption = 'date' | 'priority';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
}

export interface FilterOptions {
  status: FilterStatus;
  searchQuery: string;
  sortBy: SortOption;
}
