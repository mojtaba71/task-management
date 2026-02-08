import type { FilterStatus, SortOption } from '../types';

interface FiltersProps {
  status: FilterStatus;
  sortBy: SortOption;
  searchQuery: string;
  onStatusChange: (status: FilterStatus) => void;
  onSortChange: (sortBy: SortOption) => void;
  onSearchChange: (query: string) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function Filters({
  status,
  sortBy,
  searchQuery,
  onStatusChange,
  onSortChange,
  onSearchChange,
  taskCounts,
}: FiltersProps) {
  return (
    <div className="filters">
      <div className="search-bar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            className="clear-search"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label>Status:</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${status === 'all' ? 'active' : ''}`}
              onClick={() => onStatusChange('all')}
            >
              All <span className="count">({taskCounts.all})</span>
            </button>
            <button
              className={`filter-btn ${status === 'active' ? 'active' : ''}`}
              onClick={() => onStatusChange('active')}
            >
              Active <span className="count">({taskCounts.active})</span>
            </button>
            <button
              className={`filter-btn ${status === 'completed' ? 'active' : ''}`}
              onClick={() => onStatusChange('completed')}
            >
              Completed <span className="count">({taskCounts.completed})</span>
            </button>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="sort-select"
          >
            <option value="date">Creation Date (Newest)</option>
            <option value="priority">Priority (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
