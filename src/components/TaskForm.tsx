import { useState, type FormEvent } from 'react';
import type { Priority, TaskFormData } from '../types';

interface TaskFormProps {
  onSubmit: (task: TaskFormData) => void;
  initialData?: TaskFormData;
  submitLabel?: string;
  onCancel?: () => void;
}

export function TaskForm({ onSubmit, initialData, submitLabel = 'Add Task', onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || 'medium');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    // Reset form if not editing
    if (!initialData) {
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          maxLength={100}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)"
          rows={3}
          maxLength={500}
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
