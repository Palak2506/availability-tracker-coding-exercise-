import { useAvailability } from '../context/AvailabilityContext';
import SchedulerList from '../components/SchedulerList';
import './Page.css';

/**
 * AdminDashboard - Read-only view of ALL users and mentors.
 * WHY: Admin sees availability grouped by person; no add/edit/delete.
 */
export default function AdminDashboard() {
  const { users, mentors } = useAvailability();

  return (
    <div className="page page--admin">
      <h2 className="page-heading">Admin Dashboard</h2>
      <p className="page-desc">View all submitted availability. Read-only.</p>

      <section className="admin-section">
        <h3 className="admin-section-title">Users</h3>
        <div className="admin-cards">
          {users.map((user) => (
            <div key={user.id} className="admin-card">
              <h4 className="admin-card-name">{user.name}</h4>
              <SchedulerList
                slots={user.availability}
                readOnly
                title=""
                onUpdate={() => {}}
                onDelete={() => {}}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h3 className="admin-section-title">Mentors</h3>
        <div className="admin-cards">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="admin-card">
              <h4 className="admin-card-name">{mentor.name}</h4>
              <SchedulerList
                slots={mentor.availability}
                readOnly
                title=""
                onUpdate={() => {}}
                onDelete={() => {}}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
