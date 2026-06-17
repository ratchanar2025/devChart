interface Props {
  task: any;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="bg-slate-50 border rounded-lg p-4 shadow-sm">
      <h3 className="font-bold text-lg">
        {task.title}
      </h3>

      <p className="text-gray-600 text-sm mt-2">
        {task.description}
      </p>

      <div className="mt-3">
        <div className="text-sm">
          Progress: {task.progress}%
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{
              width: `${task.progress}%`,
            }}
          />
        </div>
      </div>

      <div className="flex justify-between mt-4 text-sm">
        <span>
          Priority: {task.priority}
        </span>

        <span>
          🪙 {task.rewardCoins}
        </span>
      </div>
    </div>
  );
}