'use client';

import { useState } from 'react';

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

interface Props {
  task: Task;
  onTaskUpdate: () => void;
}

const priorityColors = {
  low: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Low' },
  medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', label: 'Medium' },
  high: { bg: 'bg-red-500/10', text: 'text-red-400', label: 'High' },
};

export default function PremiumTaskCard({ task, onTaskUpdate }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const priorityInfo = priorityColors[task.priority];

  async function claimTask() {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const userEmail = localStorage.getItem('userEmail');

      const response = await fetch(`/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'inprogress',
          assignedTo: userEmail || 'Unassigned',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to claim task');
      }

      onTaskUpdate();
    } catch (error) {
      console.error('[v0] Error claiming task:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateTaskStatus(newStatus: string) {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      setShowDropdown(false);
      onTaskUpdate();
    } catch (error) {
      console.error('[v0] Error updating task:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-accent/50 transition-all duration-200 group">
      {/* Title */}
      <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 group-hover:text-accent transition-colors">
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
        {task.description}
      </p>

      {/* Priority Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityInfo.bg} ${priorityInfo.text}`}>
          {priorityInfo.label}
        </span>
      </div>

      {/* Assignee Info */}
      {task.assignedTo || task.createdBy ? (
        <div className="text-xs text-muted-foreground mb-3 pb-3 border-b border-neutral-800/50">
          <span className="text-accent">
            {task.assignedTo || task.createdBy?.email || 'Unassigned'}
          </span>
        </div>
      ) : null}

      {/* Action Button - Conditional based on status */}
      {task.status === 'todo' && (
        <button
          onClick={claimTask}
          disabled={isLoading}
          className="w-full px-3 py-2 rounded-md bg-accent/10 text-accent hover:bg-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-xs font-medium group/btn"
        >
          {isLoading ? 'Claiming...' : 'Claim Task →'}
        </button>
      )}

      {task.status === 'inprogress' && (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            disabled={isLoading}
            className="w-full px-3 py-2 rounded-md bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-xs font-medium flex items-center justify-between"
          >
            <span>Change Status</span>
            <svg
              className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-neutral-800 border border-neutral-700 rounded-md overflow-hidden shadow-lg z-10">
              <button
                onClick={() => updateTaskStatus('done')}
                disabled={isLoading}
                className="w-full px-3 py-2 text-xs text-left text-accent hover:bg-neutral-700 disabled:opacity-50 transition-colors"
              >
                Mark as Done
              </button>
              <button
                onClick={() => updateTaskStatus('todo')}
                disabled={isLoading}
                className="w-full px-3 py-2 text-xs text-left text-amber-400 hover:bg-neutral-700 disabled:opacity-50 transition-colors border-t border-neutral-700"
              >
                Move to To Do
              </button>
            </div>
          )}
        </div>
      )}

      {task.status === 'done' && (
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <span>Completed</span>
        </div>
      )}
    </div>
  );
}
