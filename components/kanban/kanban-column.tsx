import TaskCard from "./TaskCard";

interface Props {
  title: string;
  tasks: any[];
}

export default function KanbanColumn({
  title,
  tasks,
}: Props) {
  return (
    <div
      className={`
        rounded-xl shadow-md p-4 min-h-[500px]
        ${
          title === "To Do"
            ? "bg-purple-100"
            : title === "In Progress"
            ? "bg-yellow-100"
            : "bg-green-100"
        }
      `}
    >
      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}