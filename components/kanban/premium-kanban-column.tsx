'use client';

import { useState } from 'react';
import PremiumTaskCard from './premium-task-card';

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
  title: string;
  status: 'todo' | 'inprogress' | 'done';
  tasks: Task[];
  onTasksChange: () => void;
}

export default function PremiumKanbanColumn({
  title,
  status,
  tasks,
  onTasksChange,
}: Props) {
  return (
    <div className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Column Header */}
      <div className="bg-background px-6 py-4 border-b border-border/50">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Status Icon */}
            {status === 'todo' && (
              <svg
                className="w-5 h-5 text-amber-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            )}
            {status === 'inprogress' && (
              <svg
                className="w-5 h-5 text-blue-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            )}
            {status === 'done' && (
              <svg
                className="w-5 h-5 text-emerald-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          </div>

          {/* Counter Badge */}
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/10 text-accent text-sm font-bold">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[500px]">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center">
            <svg
              className="w-10 h-10 text-muted-foreground/30 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-muted-foreground text-sm">
              {status === 'done' ? 'No completed tasks' : 'No tasks yet'}
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <PremiumTaskCard
              key={task._id}
              task={task}
              onTaskUpdate={onTasksChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
