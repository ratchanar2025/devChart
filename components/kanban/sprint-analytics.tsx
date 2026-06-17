'use client';

interface Task {
  status: 'todo' | 'inprogress' | 'done';
}

interface SprintAnalyticsProps {
  tasks: Task[];
}

export default function SprintAnalytics({ tasks }: SprintAnalyticsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'done').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'inprogress').length;
  const todoTasks = tasks.filter((task) => task.status === 'todo').length;

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Total System Sprints */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">🚀</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sprint</span>
        </div>
        <p className="text-2xl font-bold text-foreground">Sprint 4</p>
        <p className="text-xs text-muted-foreground mt-2">Current active sprint</p>
      </div>

      {/* Open Tasks Count */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">📋</span>
          <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Open</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{todoTasks}</p>
        <p className="text-xs text-muted-foreground mt-2">Waiting to start</p>
      </div>

      {/* In Progress Tasks */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">⚡</span>
          <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Active</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{inProgressTasks}</p>
        <p className="text-xs text-muted-foreground mt-2">Currently in progress</p>
      </div>

      {/* Completion Meter */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl">✨</span>
          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Progress</span>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-foreground">{completionPercentage}%</p>
          <div className="w-full h-2 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent via-accent to-accent/60 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {completedTasks} of {totalTasks} tasks
          </p>
        </div>
      </div>
    </div>
  );
}
