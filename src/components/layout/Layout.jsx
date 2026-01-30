import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

/**
 * Layout - App shell with hamburger menu + sidebar + main content.
 * WHY: Shared across all pages; Outlet renders the active route (User/Mentor/Admin).
 */
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <header className="header">
        <button
          className="hamburger"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={sidebarOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="header-title">Role-Based Time Scheduler</h1>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
