import { useAvailability } from '../context/AvailabilityContext';
import { TIMEZONES } from '../utils/timezone';
import './Selector.css';

/**
 * TimezoneSelector - Pick display/input timezone (IST or GMT).
 * WHY: Availability is stored in GMT; display converts to selected timezone.
 */
export default function TimezoneSelector() {
  const { selectedTimezone, setSelectedTimezone } = useAvailability();

  return (
    <div className="selector">
      <label htmlFor="tz-select" className="selector-label">
        Timezone
      </label>
      <select
        id="tz-select"
        value={selectedTimezone}
        onChange={(e) => setSelectedTimezone(e.target.value)}
        className="selector-select"
      >
        <option value={TIMEZONES.IST}>IST (UTC+5:30)</option>
        <option value={TIMEZONES.GMT}>GMT (UTC+0)</option>
      </select>
    </div>
  );
}
