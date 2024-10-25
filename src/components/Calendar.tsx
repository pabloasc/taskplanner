import { format, addDays } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';

interface Task {
  day: number;
  tasks: string[];
}

interface CalendarProps {
  tasks: Task[];
}

export default function Calendar({ tasks }: CalendarProps) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const today = new Date();
  const addTask = useTaskStore((state) => state.addTask);
  
  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => Math.min(tasks.length - 1, prev + 1));
  };

  const handleSaveTask = (task: string) => {
    const currentTask = tasks[currentDayIndex];
    const currentDate = addDays(today, currentTask.day - 1);
    
    addTask({
      id: Math.random().toString(36).substr(2, 9),
      date: format(currentDate, 'yyyy-MM-dd'),
      task,
      dayNumber: currentTask.day
    });
  };

  const currentTask = tasks[currentDayIndex];
  const currentDate = addDays(today, currentTask.day - 1);

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <div className="bg-white border rounded-lg shadow-sm">
        {/* Calendar Header */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevDay}
              disabled={currentDayIndex === 0}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
            </button>
            
            <div className="text-center">
              <div className="text-lg font-medium text-gray-900">
                {format(currentDate, 'EEEE')}
              </div>
              <div className="text-sm text-gray-500">
                {format(currentDate, 'MMMM d, yyyy')}
              </div>
            </div>

            <button
              onClick={handleNextDay}
              disabled={currentDayIndex === tasks.length - 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="p-6">
          <div className="space-y-3">
            {currentTask.tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-start rounded-md p-3 hover:bg-gray-50 group transition-colors"
              >
                <span className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-600 font-medium mr-3 flex-shrink-0 border">
                  {index + 1}
                </span>
                <p className="text-gray-700 text-sm flex-grow leading-relaxed">{task}</p>
                <button
                  onClick={() => handleSaveTask(task)}
                  className="ml-4 p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <BookmarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center items-center space-x-1.5">
            {tasks.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  index === currentDayIndex
                    ? 'bg-gray-900'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}