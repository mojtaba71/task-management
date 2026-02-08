import { useState, useMemo } from 'react';
import type { Task, TaskFormData, FilterStatus, SortOption } from './types';
import { useTasks } from './hooks/useTasks';
import { useDarkMode } from './hooks/useDarkMode';
import { processTasksOptimized } from './utils/taskUtils';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Filters } from './components/Filters';
import { Modal } from './components/Modal';
import './styles/App.scss';

function App() {
  const { tasks, addTask, updateTask, toggleTaskComplete, deleteTask } = useTasks();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Filter and sort states
  const [status, setStatus] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [searchQuery, setSearchQuery] = useState('');

  // Edit modal state
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized processed tasks for optimal performance
  const processedTasks = useMemo(
    () => processTasksOptimized(tasks, status, searchQuery, sortBy),
    [tasks, status, searchQuery, sortBy]
  );

  // Task counts for filter badges
  const taskCounts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    }),
    [tasks]
  );

  // Handle task creation
  const handleAddTask = (taskData: TaskFormData) => {
    addTask(taskData);
  };

  // Handle task edit
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Handle task update
  const handleUpdateTask = (taskData: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  // Handle task delete with confirmation
  const handleDeleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task && window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      deleteTask(id);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <h1>Task Manager</h1>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <section className="task-form-section">
            <h2>Create New Task</h2>
            <TaskForm onSubmit={handleAddTask} />
          </section>

          <section className="task-list-section">
            <h2>Your Tasks</h2>
            <Filters
              status={status}
              sortBy={sortBy}
              searchQuery={searchQuery}
              onStatusChange={setStatus}
              onSortChange={setSortBy}
              onSearchChange={setSearchQuery}
              taskCounts={taskCounts}
            />
            <TaskList
              tasks={processedTasks}
              onToggleComplete={toggleTaskComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </section>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Edit Task">
        {editingTask && (
          <TaskForm
            onSubmit={handleUpdateTask}
            initialData={{
              title: editingTask.title,
              description: editingTask.description,
              priority: editingTask.priority,
            }}
            submitLabel="Update Task"
            onCancel={handleModalClose}
          />
        )}
      </Modal>

      <footer className="app-footer">
        <p>
          Built with React, TypeScript & Vite | {taskCounts.active} active{' '}
          {taskCounts.active === 1 ? 'task' : 'tasks'}
        </p>
      </footer>
    </div>
  );
}

export default App;
