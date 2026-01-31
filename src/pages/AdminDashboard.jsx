import { useMemo } from 'react';
import { useAvailability } from '../context/AvailabilityContext';
import { slotFromGmt } from '../utils/timezone';
import TimezoneSelector from '../components/TimezoneSelector';
import SchedulerList from '../components/SchedulerList';
import CalendarView from '../components/CalendarView';
import './Page.css';

/**
 * AdminDashboard - Read-only view of ALL users and mentors.
 * Slots converted to selectedTimezone for display.
 */
export default function AdminDashboard() {
  const { users, mentors, selectedTimezone } = useAvailability();

  return (
    <div className="page page--admin">
      <h2 className="page-heading">Admin Dashboard</h2>
      <p className="page-desc">View all submitted availability. Read-only.</p>

      <div className="page-selectors">
        <TimezoneSelector />
      </div>

      <section className="admin-section">
        <h3 className="admin-section-title">Users</h3>
        <div className="admin-cards">
          {users.map((user) => (
            <AdminPersonCard
              key={user.id}
              name={user.name}
              slots={user.availability}
              selectedTimezone={selectedTimezone}
            />
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h3 className="admin-section-title">Mentors</h3>
        <div className="admin-cards">
          {mentors.map((mentor) => (
            <AdminPersonCard
              key={mentor.id}
              name={mentor.name}
              slots={mentor.availability}
              selectedTimezone={selectedTimezone}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function AdminPersonCard({ name, slots, selectedTimezone }) {
  const slotsForDisplay = useMemo(
    () => slots.map((s) => slotFromGmt(s, selectedTimezone)),
    [slots, selectedTimezone]
  );
  return (
    <div className="admin-card">
      <h4 className="admin-card-name">{name}</h4>
      <SchedulerList
        slots={slotsForDisplay}
        readOnly
        title=""
        onUpdate={() => {}}
        onDelete={() => {}}
      />
      <CalendarView slots={slotsForDisplay} />
    </div>
  );
}
