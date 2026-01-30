import { useAvailability } from '../context/AvailabilityContext';
import './Selector.css';

/**
 * UserSelector - Dropdown to pick which user the dashboard shows.
 * WHY: Multiple users exist; we need to "act as" one at a time.
 */
export default function UserSelector() {
  const { users, currentUserId, setCurrentUserId } = useAvailability();

  return (
    <div className="selector">
      <label htmlFor="user-select" className="selector-label">
        Acting as
      </label>
      <select
        id="user-select"
        value={currentUserId}
        onChange={(e) => setCurrentUserId(e.target.value)}
        className="selector-select"
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>
    </div>
  );
}
