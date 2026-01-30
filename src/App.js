import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AvailabilityProvider } from './context/AvailabilityContext';
import Layout from './components/layout/Layout';
import UserDashboard from './pages/UserDashboard';
import MentorDashboard from './pages/MentorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

/**
 * App - Root: Context provider + Router + Layout.
 * WHY: AvailabilityProvider wraps everything so all pages share state.
 * Layout contains Sidebar + main content (Outlet).
 */
function App() {
  return (
    <AvailabilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/user" replace />} />
            <Route path="user" element={<UserDashboard />} />
            <Route path="mentor" element={<MentorDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/user" replace />} />
        </Routes>
      </BrowserRouter>
    </AvailabilityProvider>
  );
}

export default App;
