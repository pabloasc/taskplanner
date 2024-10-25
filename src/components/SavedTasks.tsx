'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { useTaskStore } from '@/store/taskStore';
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from '@heroicons/react/24/outline';

export function SavedTasks() {
  const { savedTasks, removeTask } = useTaskStore();
  const [currentPage, setCurrentPage] = useState(0);

  const groupedTasks = savedTasks.reduce((acc, task) => {
    const date = task.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, typeof savedTasks>);

  const dates = Object.keys(groupedTasks).sort();
  const currentDate = dates[currentPage];

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(dates.length - 1, prev + 1));
  };

  if (savedTasks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Saved Tasks</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">No tasks saved yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Saved Tasks</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 0}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {currentDate ? format(new Date(currentDate), 'EEEE, MMMM d, yyyy') : ''}
          </h3>
          <button
            onClick={goToNext}
            disabled={currentPage === dates.length - 1}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4">
          <ul className="space-y-3">
            {currentDate &&
              groupedTasks[currentDate].map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg group"
                >
                  <span className="text-gray-900 dark:text-gray-200">{task.text}</span>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}