import { useState } from 'react';
import { HOUR_OPTIONS, formatHour } from '../utils/timezone';
import './SchedulerList.css';

/**
 * SchedulerList - Displays slots with Edit/Delete.
 * WHY: Reusable for User/Mentor dashboards and Admin read-only view.
 * Props: slots, onUpdate(slotId, data), onDelete(slotId), readOnly, title
 * Parent binds personId when passing onUpdate/onDelete.
 */
export default function SchedulerList({ slots, onUpdate, onDelete, readOnly = false, title }) {
  const [editingId, setEditingId] = useState(null);
  const [editDay, setEditDay] = useState('');
  const [editStart, setEditStart] = useState(0);
  const [editEnd, setEditEnd] = useState(0);
  const [error, setError] = useState('');

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const startEdit = (slot) => {
    setEditingId(slot.id);
    setEditDay(slot.day);
    setEditStart(slot.start);
    setEditEnd(slot.end);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError('');
  };

  const saveEdit = () => {
    setError('');
    if (editEnd <= editStart) {
      setError('End time must be after start time.');
      return;
    }
    const others = slots.filter((s) => s.id !== editingId);
    const isDuplicate = others.some(
      (s) => s.day === editDay && s.start === editStart && s.end === editEnd
    );
    if (isDuplicate) {
      setError('This time slot already exists.');
      return;
    }
    onUpdate(editingId, { day: editDay, start: editStart, end: editEnd });
    setEditingId(null);
  };

  const formatSlot = (slot) =>
    `${slot.day} · ${formatHour(slot.start)} – ${formatHour(slot.end)}`;

  if (slots.length === 0 && !readOnly) {
    return <p className="list-empty">No time slots yet. Add one above.</p>;
  }
  if (slots.length === 0 && readOnly) {
    return <p className="list-empty">No availability submitted.</p>;
  }

  return (
    <div className="scheduler-list">
      {title !== '' && (
        <h3 className="list-title">{title ?? 'Your Time Slots'}</h3>
      )}
      {error && <p className="list-error" role="alert">{error}</p>}
      <ul className="slot-list">
        {slots.map((slot) => (
          <li key={slot.id} className="slot-item">
            {editingId === slot.id ? (
              <div className="slot-edit">
                <select value={editDay} onChange={(e) => setEditDay(e.target.value)}>
                  {DAYS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select value={editStart} onChange={(e) => setEditStart(Number(e.target.value))}>
                  {HOUR_OPTIONS.map((h) => (
                    <option key={h} value={h}>{formatHour(h)}</option>
                  ))}
                </select>
                <span>–</span>
                <select value={editEnd} onChange={(e) => setEditEnd(Number(e.target.value))}>
                  {HOUR_OPTIONS.map((h) => (
                    <option key={h} value={h}>{formatHour(h)}</option>
                  ))}
                </select>
                <button type="button" className="btn-save" onClick={saveEdit}>Save</button>
                <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <>
                <span className="slot-text">{formatSlot(slot)}</span>
                {!readOnly && (
                  <div className="slot-actions">
                    <button type="button" className="btn-edit" onClick={() => startEdit(slot)}>Edit</button>
                    <button type="button" className="btn-delete" onClick={() => onDelete(slot.id)}>Delete</button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
