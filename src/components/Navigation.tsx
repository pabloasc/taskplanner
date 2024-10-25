import { Link, useLocation } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-semibold text-gray-900 dark:text-white">AI Task Planner</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm ${
                  location.pathname === '/'
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Plan Tasks
              </Link>
              <Link
                to="/saved"
                className={`px-3 py-2 rounded-md text-sm ${
                  location.pathname === '/saved'
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Saved Tasks
              </Link>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}