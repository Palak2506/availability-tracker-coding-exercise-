import { useMemo } from 'react';
import { formatHour } from '../utils/timezone';
import './CalendarView.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * CalendarView - Weekly visualization of availability slots.
 * WHY: Visual feedback; no drag-and-drop, display-only.
 * Props: slots (in display timezone, same shape as SchedulerList)
 */
export default function CalendarView({ slots = [] }) {
  const slotsByDay = useMemo(() => {
    const map = {};
    DAYS.forEach((d) => { map[d] = []; });
    slots.forEach((slot) => {
      if (map[slot.day]) map[slot.day].push(slot);
    });
    return map;
  }, [slots]);

  return (
    <div className="calendar-view">
      <h3 className="calendar-title">Weekly Calendar</h3>
      <div className="calendar-grid">
        {DAYS.map((day) => (
          <div key={day} className="calendar-day">
            <div className="calendar-day-header">{day}</div>
            <div className="calendar-day-slots">
              {slotsByDay[day].length === 0 ? (
                <span className="calendar-empty">—</span>
              ) : (
                slotsByDay[day].map((slot) => (
                  <div key={slot.id} className="calendar-slot">
                    {formatHour(slot.start)} – {formatHour(slot.end)}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
