import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { SavedTasks } from './components/SavedTasks';
import { HomePage } from './components/HomePage';
import { ThemeProvider } from './components/ThemeProvider';

export function App() {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/saved" element={<SavedTasks />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}