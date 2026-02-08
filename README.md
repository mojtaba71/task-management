# Task Management Application

A modern, feature-rich task management application built with React, TypeScript, and Vite. This project demonstrates clean code practices, efficient algorithms, and a professional UI/UX design.


## Features

### Core Features ✅
- ✨ **Create Tasks** - Add new tasks with title, description, and priority level (Low, Medium, High)
- 📋 **View Tasks** - Display all tasks with clear visual indicators for status
- ✓ **Mark Complete/Incomplete** - Toggle task completion status with visual feedback
- 🔍 **Filter by Status** - Filter tasks by All, Active, or Completed status
- 🔎 **Search Functionality** - Search tasks by title or description in real-time
- 🔀 **Sort Tasks** - Sort by creation date (newest first) or priority (high to low)
- 💾 **Data Persistence** - All data is stored in localStorage and persists across sessions

### Bonus Features 🎁
- 🎨 **Dark Mode** - Toggle between light and dark themes with smooth transitions
- ✏️ **Edit Tasks** - Update existing tasks with a modal interface
- 🗑️ **Delete Tasks** - Remove tasks with confirmation dialog
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Performance Optimized** - Memoized operations and efficient algorithms
- ♿ **Accessible** - ARIA labels and semantic HTML for screen readers

## Tech Stack

- **React 18** - UI library with modern hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Sass/SCSS** - Advanced styling with variables and nesting
- **CSS Variables** - Dynamic theming support

## Project Structure

```
task-management-app/
├── src/
│   ├── components/          # React components
│   │   ├── TaskForm.tsx    # Form for creating/editing tasks
│   │   ├── TaskItem.tsx    # Individual task display
│   │   ├── TaskList.tsx    # Task list container
│   │   ├── Filters.tsx     # Search, filter, and sort controls
│   │   └── Modal.tsx       # Reusable modal component
│   ├── hooks/              # Custom React hooks
│   │   ├── useLocalStorage.ts  # localStorage persistence
│   │   ├── useTasks.ts         # Task management logic
│   │   └── useDarkMode.ts      # Dark mode functionality
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── taskUtils.ts    # Sorting, filtering, search algorithms
│   ├── styles/             # Styling
│   │   └── App.scss        # Main stylesheet with theme support
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage Guide

### Creating a Task
1. Enter a task title (required)
2. Add an optional description
3. Select a priority level (Low, Medium, High)
4. Click "Add Task"

### Managing Tasks
- **Complete/Uncomplete**: Click the checkbox next to any task
- **Edit**: Click the edit icon to modify task details
- **Delete**: Click the delete icon and confirm deletion

### Filtering & Searching
- Use the **status filters** to show All, Active, or Completed tasks
- Type in the **search bar** to filter by title or description
- Use the **sort dropdown** to order by date or priority

### Dark Mode
Click the sun/moon icon in the header to toggle between light and dark themes. Your preference is saved automatically.

## Technical Implementation

### Algorithm Complexity
- **Sorting**: O(n log n) - Uses JavaScript's native sort with optimized comparisons
- **Filtering**: O(n) - Single pass through the array
- **Searching**: O(n) - Case-insensitive substring matching
- **Combined Operations**: Optimized to minimize iterations through memoization

### Performance Optimizations
- ✅ `useMemo` for expensive computations (filtering, sorting, searching)
- ✅ `useCallback` for stable function references
- ✅ Debounced search input (implicit via React state)
- ✅ Shallow array copies to avoid mutations
- ✅ localStorage operations wrapped in try-catch for error handling

### Code Quality Features
- ✅ **TypeScript**: Full type safety with strict mode
- ✅ **Component Modularity**: Single Responsibility Principle
- ✅ **Custom Hooks**: Reusable logic extraction
- ✅ **Clean Code**: Descriptive names, comments where needed
- ✅ **Error Handling**: localStorage failures, edge cases
- ✅ **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## Design Decisions & Trade-offs

### State Management
**Decision**: Used React Context API via custom hooks instead of Redux
- **Rationale**: Application state is simple and doesn't require complex middleware
- **Trade-off**: For larger apps, Redux might provide better debugging tools

### Data Persistence
**Decision**: localStorage instead of a backend API
- **Rationale**: Meets requirements and provides instant offline functionality
- **Trade-off**: Data is device-specific and not synced across devices

### Styling Approach
**Decision**: Sass/SCSS with CSS variables for theming
- **Rationale**: Provides good developer experience with nesting and mixins
- **Trade-off**: Could have used CSS-in-JS (styled-components) for component-scoped styles

### Sorting Algorithm
**Decision**: JavaScript native `.sort()` with custom comparator
- **Rationale**: Highly optimized (Timsort in V8), O(n log n) complexity
- **Trade-off**: For extremely large datasets (10k+ tasks), virtual scrolling would be needed

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancements

- [ ] Drag-and-drop task reordering
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Unit tests with Jest and React Testing Library
- [ ] Backend API integration
- [ ] Multi-user support with authentication
- [ ] Task sharing and collaboration

## Screenshots

### Light Mode
![Light Mode](./screenshots/light-mode.png)

### Dark Mode
![Dark Mode](./screenshots/dark-mode.png)

## License

MIT License - feel free to use this project for learning or as a portfolio piece.

## Author

Built with care as part of a coding challenge.

---

**Note**: This project was completed as part of a frontend developer coding challenge. It demonstrates proficiency in React, TypeScript, state management, algorithms, and clean code practices.
