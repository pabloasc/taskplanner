import { useState } from 'react';

interface TaskInputProps {
  onSubmit: (text: string, days: number) => void;
}

export default function TaskInput({ onSubmit }: TaskInputProps) {
  const [text, setText] = useState('');
  const [days, setDays] = useState(7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text, days);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-3xl mx-auto">
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="task-input" className="block text-sm font-medium text-gray-700">
              What would you like to plan?
            </label>
            <textarea
              id="task-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm min-h-[150px] resize-none"
              placeholder="Enter your planning request..."
            />
          </div>
          
          <div>
            <label htmlFor="days" className="block text-sm font-medium text-gray-700">
              Number of days
            </label>
            <select
              id="days"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 text-sm"
            >
              {[3, 5, 7, 14, 30].map((d) => (
                <option key={d} value={d}>{d} days</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Generate Plan
          </button>
        </div>
      </div>
    </form>
  );
}