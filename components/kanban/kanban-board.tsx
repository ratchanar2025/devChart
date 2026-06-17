"use client";

import { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  progress: number;
  rewardCoins: number;
}
  
export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();

      console.log(data);

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  }

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "inprogress"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KanbanColumn
        title="To Do"
        tasks={todoTasks}
      />

      <KanbanColumn
        title="In Progress"
        tasks={inProgressTasks}
      />

      <KanbanColumn
        title="Completed"
        tasks={doneTasks}
      />
    </div>
  );
}