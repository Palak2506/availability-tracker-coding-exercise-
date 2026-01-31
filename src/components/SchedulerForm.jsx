import { useState } from 'react';
import { HOUR_OPTIONS, formatHour } from '../utils/timezone';
import './SchedulerForm.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * SchedulerForm - Reusable form for adding time slots.
 * WHY: Same UI for User and Mentor dashboards.
 * Props: existingSlots (for duplicate check), onAdd(slotData)
 * Parent binds personId when calling addSlot(role, personId, data).
 */
export default function SchedulerForm({ existingSlots = [], onAdd }) {
  const [day, setDay] = useState('Monday');
  const [start, setStart] = useState(9);
  const [end, setEnd] = useState(10);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation: end must be after start
    if (end <= start) {
      setError('End time must be after start time.');
      return;
    }

    // Validation: no duplicate (same day, start, end)
    const isDuplicate = existingSlots.some(
      (s) => s.day === day && s.start === start && s.end === end
    );
    if (isDuplicate) {
      setError('This time slot already exists.');
      return;
    }

    onAdd({ day, start, end });
    // Reset to sensible defaults after add
    setStart(end);
    setEnd(Math.min(end + 1, 23.5));
  };

  return (
    <form className="scheduler-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Add Availability</h3>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="form-row">
        <label>
          Day
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {DAYS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>
        <label>
          Start
          <select value={start} onChange={(e) => setStart(Number(e.target.value))}>
            {HOUR_OPTIONS.map((h) => (
              <option key={h} value={h}>{formatHour(h)}</option>
            ))}
          </select>
        </label>
        <label>
          End
          <select value={end} onChange={(e) => setEnd(Number(e.target.value))}>
            {HOUR_OPTIONS.map((h) => (
              <option key={h} value={h}>{formatHour(h)}</option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="btn-add">Add Time Slot</button>
    </form>
  );
}
