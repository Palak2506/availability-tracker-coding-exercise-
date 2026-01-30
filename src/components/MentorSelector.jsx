import { useAvailability } from '../context/AvailabilityContext';
import './Selector.css';

/**
 * MentorSelector - Dropdown to pick which mentor the dashboard shows.
 * WHY: Multiple mentors exist; we need to "act as" one at a time.
 */
export default function MentorSelector() {
  const { mentors, currentMentorId, setCurrentMentorId } = useAvailability();

  return (
    <div className="selector">
      <label htmlFor="mentor-select" className="selector-label">
        Acting as
      </label>
      <select
        id="mentor-select"
        value={currentMentorId}
        onChange={(e) => setCurrentMentorId(e.target.value)}
        className="selector-select"
      >
        {mentors.map((m) => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>
    </div>
  );
}
