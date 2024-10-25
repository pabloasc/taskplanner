'use client';

import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/outline';
import { useTaskStore } from '@/store/taskStore';
import { Toast } from './Toast';

interface Task {
  day: number;
  tasks: string[];
}

interface CalendarProps {
  tasks: Task[];
}

export default function Calendar({ tasks }: CalendarProps) {
  const [currentDay, setCurrentDay] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const today = new Date();
  const { addTask, removeTask, savedTasks } = useTaskStore();

  const currentTasks = tasks[currentDay];

  const goToPrevious = () => {
    setCurrentDay((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentDay((prev) => Math.min(tasks.length - 1, prev + 1));
  };

  const getSavedTaskId = (taskText: string, day: number) => {
    const date = addDays(today, day - 1).toISOString().split('T')[0];
    const savedTask = savedTasks.find(task => task.text === taskText && task.date === date);
    return savedTask?.id;
  };

  const isTaskSaved = (taskText: string, day: number) => {
    return getSavedTaskId(taskText, day) !== undefined;
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleTaskAction = (taskText: string, day: number) => {
    const savedTaskId = getSavedTaskId(taskText, day);
    
    if (savedTaskId) {
      removeTask(savedTaskId);
      showToastMessage('Task removed from saved tasks');
    } else {
      const date = addDays(today, day - 1);
      addTask({
        id: `${Date.now()}-${Math.random()}`,
        text: taskText,
        day,
        date: date.toISOString().split('T')[0],
      });
      showToastMessage('Task saved successfully!');
    }
  };

  if (!currentTasks) {
    return null;
  }

  const currentDate = addDays(today, currentTasks.day - 1);

  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={goToPrevious}
            disabled={currentDay === 0}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {format(currentDate, 'EEEE, MMMM d')}
          </h3>
          <button
            onClick={goToNext}
            disabled={currentDay === tasks.length - 1}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4">
          <ul className="space-y-3">
            {currentTasks.tasks.map((task, index) => {
              const saved = isTaskSaved(task, currentTasks.day);
              return (
                <li
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg group transition-colors ${
                    saved 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100' 
                      : 'bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <div className="flex items-start">
                    <span className={`h-5 w-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 ${
                      saved 
                        ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200' 
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}>
                      {index + 1}
                    </span>
                    <span className={saved ? 'text-green-900 dark:text-green-100' : 'text-gray-900 dark:text-gray-100'}>
                      {task}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTaskAction(task, currentTasks.day)}
                    className={`p-1.5 rounded-full transition-all ${
                      saved
                        ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800 hover:bg-green-200 dark:hover:bg-green-700'
                        : 'opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    {saved ? (
                      <BookmarkSlashIcon className="h-4 w-4" />
                    ) : (
                      <BookmarkIcon className="h-4 w-4" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      
      <Toast show={showToast} message={toastMessage} />
    </div>
  );
}