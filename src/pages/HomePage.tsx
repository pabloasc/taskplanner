import { useState } from 'react';
import TaskInput from '../components/TaskInput';
import Calendar from '../components/Calendar';

const generateMockTasks = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    tasks: [
      `Review and plan daily objectives for Day ${i + 1}`,
      `Complete main project milestones for Day ${i + 1}`,
      'Update task tracking system',
      'Schedule tomorrow\'s priorities',
      'Exercise and wellness activities'
    ]
  }));
};

export function HomePage() {
  const [tasks, setTasks] = useState(generateMockTasks(7));

  const handleSubmit = (text: string, days: number) => {
    setTasks(generateMockTasks(days));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">AI Task Planner</h1>
        <p className="mt-2 text-sm text-gray-600">Organize your plans with AI assistance</p>
      </div>

      <TaskInput onSubmit={handleSubmit} />
      <Calendar tasks={tasks} />
    </div>
  );
}