import { format } from 'date-fns';
import { useTaskStore } from '../store/taskStore';
import { TrashIcon } from '@heroicons/react/24/outline';

export function SavedTasks() {
  const { savedTasks, removeTask } = useTaskStore();

  const sortedTasks = [...savedTasks].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const groupedTasks = sortedTasks.reduce((acc, task) => {
    const date = task.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, typeof savedTasks>);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Saved Tasks</h1>
        <p className="mt-2 text-sm text-gray-600">Your collection of saved tasks</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groupedTasks).map(([date, tasks]) => (
          <div key={date} className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {format(new Date(date), 'EEEE')}
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(date), 'MMMM d, yyyy')}
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start rounded-md p-2 hover:bg-gray-50 group transition-colors"
                  >
                    <span className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600 font-medium mr-3 flex-shrink-0 border">
                      {task.dayNumber}
                    </span>
                    <p className="text-sm text-gray-700 flex-grow leading-relaxed">{task.task}</p>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="ml-2 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {savedTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-gray-500">No saved tasks yet. Start by saving some tasks from your plans!</p>
        </div>
      )}
    </div>
  );
}