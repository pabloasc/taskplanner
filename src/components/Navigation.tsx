import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-semibold text-gray-900">AI Task Planner</span>
            </div>
          </div>
          <div className="flex space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm ${
                location.pathname === '/'
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Plan Tasks
            </Link>
            <Link
              to="/saved"
              className={`px-3 py-2 rounded-md text-sm ${
                location.pathname === '/saved'
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Saved Tasks
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}