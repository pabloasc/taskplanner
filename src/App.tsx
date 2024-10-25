import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { SavedTasks } from './pages/SavedTasks';
import { HomePage } from './pages/HomePage';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved" element={<SavedTasks />} />
        </Routes>
      </div>
    </Router>
  );
}