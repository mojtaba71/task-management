import type { Task } from '../types';
import { getPriorityLabel, getPriorityClassName } from '../utils/taskUtils';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
      </div>

      <div className="task-content">
        <div className="task-header">
          <label htmlFor={`task-${task.id}`} className="task-title">
            {task.title}
          </label>
          <span className={`priority-badge ${getPriorityClassName(task.priority)}`}>
            {getPriorityLabel(task.priority)}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          <span className="task-date">{formatDate(task.createdAt)}</span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn-icon btn-edit"
          onClick={() => onEdit(task)}
          aria-label={`Edit "${task.title}"`}
          title="Edit task"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          className="btn-icon btn-delete"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete "${task.title}"`}
          title="Delete task"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  );
}
