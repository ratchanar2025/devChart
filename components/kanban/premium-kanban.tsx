'use client';

import { useEffect, useState } from 'react';
import PremiumKanbanColumn from './premium-kanban-column';
import AuthModal from './auth-modal';
import AnnouncementsFeed from './announcements-feed';
import SprintAnalytics from './sprint-analytics';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inprogress' | 'done';
  assignedTo?: string;
  createdBy?: { name: string; email: string };
  rewardCoins: number;
}

interface User {
  email: string;
  name: string;
}

export default function PremiumKanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    if (token && userEmail) {
      setIsAuthenticated(true);
      setUser({ email: userEmail, name: userName || userEmail.split('@')[0] });
      fetchTasks(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Filter tasks based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredTasks(
        tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, tasks]);

  async function fetchTasks(token?: string) {
    try {
      setLoading(true);
      const authToken = token || localStorage.getItem('token');

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }git

      const response = await fetch('/api/tasks', { headers });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error('[v0] Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleAuthSuccess(token: string, email: string) {
    setIsAuthenticated(true);
    setUser({ email, name: localStorage.getItem('userName') || email.split('@')[0] });
    fetchTasks(token);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUser(null);
    setTasks([]);
    setFilteredTasks([]);
  }

  const todoTasks = filteredTasks.filter((task) => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter((task) => task.status === 'inprogress');
  const doneTasks = filteredTasks.filter((task) => task.status === 'done');

  if (!isAuthenticated) {
    return <AuthModal onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Search and Profile */}
      <div className="bg-card border-b border-border sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Welcome Section */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                Task Board
              </h1>
              {user && (
                <p className="text-sm text-muted-foreground">
                  Welcome back, <span className="text-accent">{user.name}</span>
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Board */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Announcements Feed */}
        <AnnouncementsFeed />

        {/* Sprint Analytics */}
        <SprintAnalytics tasks={tasks} />

        {/* Kanban Columns */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading tasks...</div>
          </div>
        ) : (
          <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
            <PremiumKanbanColumn
              title="Backlog / To Do"
              status="todo"
              tasks={todoTasks}
              onTasksChange={() => fetchTasks()}
            />
            <PremiumKanbanColumn
              title="In Progress"
              status="inprogress"
              tasks={inProgressTasks}
              onTasksChange={() => fetchTasks()}
            />
            <PremiumKanbanColumn
              title="Completed"
              status="done"
              tasks={doneTasks}
              onTasksChange={() => fetchTasks()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
