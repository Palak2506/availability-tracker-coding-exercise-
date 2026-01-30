import { NavLink } from 'react-router-dom';
import './Sidebar.css';

/**
 * Sidebar - Drawer navigation between dashboards.
 * WHY: Each dashboard is independent; links switch context entirely.
 */
export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <p className="sidebar-title">Time Scheduler</p>
          <NavLink
            to="/user"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={onClose}
          >
            User Dashboard
          </NavLink>
          <NavLink
            to="/mentor"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={onClose}
          >
            Mentor Dashboard
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={onClose}
          >
            Admin Dashboard
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
