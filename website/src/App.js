import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { useDarkMode } from './hooks/useDarkMode';
import PageviewTracker from './components/analytics/PageviewTracker';
import CookieConsent from './components/analytics/CookieConsent';

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <Router>
      <PageviewTracker />
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-gray-900 text-white blueprint-bg'
          : 'bg-white text-gray-900'
      }`}>
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <ErrorBoundary>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:blogId" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </ErrorBoundary>
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
