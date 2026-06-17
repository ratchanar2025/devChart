# Production-Ready Kanban Board

## Overview

A premium, dark-mode Kanban board component designed for authenticated user task management. The component integrates seamlessly with the existing API endpoints and provides a clean, responsive interface with real-time task updates.

## Features

### UI Components

- **Header Section** - Sticky header with welcome message displaying authenticated user's email and a real-time search filter
- **Three-Column Layout** - "Backlog / To Do", "In Progress", and "Completed" columns with status indicators and task counters
- **Task Cards** - Dark charcoal background (bg-neutral-900) with:
  - Task title with hover effects
  - Description preview (line-clamped to 2 lines)
  - Priority badge (Low/Medium/High with color coding)
  - Assignee information with accent color highlighting
  - Status-dependent action buttons

### Interactive Features

**Task Actions based on Status:**

- **"To Do" status**: 
  - Shows "Claim Task →" button
  - Updates task status to "in_progress" and assigns to current user
  - Smooth transitions with hover effects

- **"In Progress" status**:
  - Shows "Change Status" dropdown with options
  - Can mark as "Done" or move back to "To Do"
  - Smooth dropdown animation

- **"Completed" status**:
  - Shows checkmark icon instead of action button
  - Read-only display with success styling

**Search Functionality:**
- Real-time text search across task titles and descriptions
- Filters all three columns simultaneously
- Non-destructive filtering (doesn't modify task data)

## API Integration

### Endpoints Used

1. **GET /api/tasks**
   - Fetches all tasks
   - No authentication required for viewing
   - Returns array of task objects with populated creator info

2. **PATCH /api/tasks/[id]**
   - Updates task status and assignee
   - Requires Bearer token in Authorization header
   - Accepts status ("todo", "inprogress", "done") and assignedTo fields

### Authentication

- User email and token stored in localStorage
- Token retrieved from login endpoint: `POST /api/auth/login`
- Authorization header format: `Bearer <token>`

## Component Structure

```
premium-kanban.tsx (Main Board)
├── premium-kanban-column.tsx (Column Wrapper)
│   └── premium-task-card.tsx (Individual Task Card)
```

### Premium Kanban Board (`premium-kanban.tsx`)

Main component that manages:
- Task fetching and state
- Search/filter logic
- User authentication state
- Loading state handling

### Premium Kanban Column (`premium-kanban-column.tsx`)

Container for each status column:
- Column header with icon and counter badge
- Empty state display
- Task list rendering with unique status indicators

### Premium Task Card (`premium-task-card.tsx`)

Individual task display:
- Priority color coding
- Status-based action buttons
- Task update handling with API calls
- Dropdown state management for status changes

## Styling

### Color Palette

- **Background**: `bg-background` (deep dark)
- **Card**: `bg-card` (slightly lighter than background)
- **Text**: `text-foreground` (near white)
- **Muted**: `text-muted-foreground` (gray)
- **Accent**: `text-accent` (emerald green - oklch(0.65 0.15 140))

### Priority Badge Colors

- **Low**: Blue (`text-blue-400` on `bg-blue-500/10`)
- **Medium**: Yellow (`text-yellow-400` on `bg-yellow-500/10`)
- **High**: Red (`text-red-400` on `bg-red-500/10`)

### Status Icons

- **To Do**: Clipboard icon (amber)
- **In Progress**: Lightning bolt icon (blue)
- **Done**: Checkmark icon (emerald)

## Usage

### Basic Setup

The Kanban board is available at the root route `/`. It automatically:

1. Checks for user session in localStorage
2. Fetches tasks from `/api/tasks`
3. Displays loading state while fetching
4. Renders columns with filtered tasks

### With Authentication

Before using the board, users must:

1. Register via `POST /api/auth/register`
   ```json
   {
     "name": "User Name",
     "email": "user@example.com",
     "password": "password123"
   }
   ```

2. Login via `POST /api/auth/login`
   ```json
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

3. Store returned token in localStorage:
   ```javascript
   localStorage.setItem('token', response.token);
   localStorage.setItem('user', JSON.stringify(response.user));
   localStorage.setItem('userEmail', response.user.email);
   ```

### Creating Tasks

Tasks can be created via `POST /api/tasks` with:

```json
{
  "title": "Task Name",
  "description": "Task description",
  "priority": "high",
  "status": "todo",
  "rewardCoins": 10
}
```

## Responsive Design

- **Mobile**: Single column layout (flex flex-col)
- **Desktop (md)**: Three-column grid layout (md:grid md:grid-cols-3)
- **Gap**: Consistent 6-unit spacing between columns
- **Min Height**: 500px per column for proper scroll area

## Key Characteristics

✓ **Dark Mode First** - Premium dark theme with emerald accents
✓ **Production Ready** - Proper error handling and loading states
✓ **API Integrated** - Real-time sync with backend
✓ **Accessible** - Semantic HTML with proper ARIA roles
✓ **Responsive** - Works seamlessly on mobile and desktop
✓ **No External Libraries** - Pure SVG icons, no icon library dependencies
✓ **Sticky Header** - Search bar remains visible while scrolling
✓ **Smooth Animations** - Transitions on hover, focus, and state changes

## Browser Support

- Modern browsers with ES6+ support
- Requires JavaScript enabled
- localStorage support required

## Performance Notes

- Tasks fetched on component mount
- Search filtering is client-side (O(n) complexity)
- No virtual scrolling (suitable for tasks < 200 items per column)
- Debounce search for better performance with large datasets (optional enhancement)
