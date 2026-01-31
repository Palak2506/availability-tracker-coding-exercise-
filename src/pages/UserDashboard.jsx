import { useMemo } from 'react';
import { useAvailability } from '../context/AvailabilityContext';
import { slotFromGmt, slotToGmt } from '../utils/timezone';
import UserSelector from '../components/UserSelector';
import TimezoneSelector from '../components/TimezoneSelector';
import SchedulerForm from '../components/SchedulerForm';
import SchedulerList from '../components/SchedulerList';
import CalendarView from '../components/CalendarView';
import './Page.css';

/**
 * UserDashboard - Shows ONE user's availability; add/edit/delete.
 * Slots stored in GMT; converted to selectedTimezone for display/input.
 */
export default function UserDashboard() {
  const {
    currentUser,
    selectedTimezone,
    addSlot,
    updateSlot,
    deleteSlot,
  } = useAvailability();

  // Convert GMT slots to display timezone for Form/List
  const slotsForDisplay = useMemo(
    () => currentUser.availability.map((s) => slotFromGmt(s, selectedTimezone)),
    [currentUser.availability, selectedTimezone]
  );

  const handleAdd = (data) => {
    const gmtData = slotToGmt(data, selectedTimezone);
    addSlot('user', currentUser.id, gmtData);
  };

  const handleUpdate = (slotId, data) => {
    const gmtData = slotToGmt(data, selectedTimezone);
    updateSlot('user', currentUser.id, slotId, gmtData);
  };

  return (
    <div className="page">
      <h2 className="page-heading">User Dashboard</h2>
      <p className="page-desc">Manage availability for the selected user.</p>

      <div className="page-selectors">
        <UserSelector />
        <TimezoneSelector />
      </div>

      <SchedulerForm
        existingSlots={slotsForDisplay}
        onAdd={handleAdd}
      />

      <SchedulerList
        slots={slotsForDisplay}
        title={`${currentUser.name}'s Time Slots`}
        onUpdate={handleUpdate}
        onDelete={(slotId) => deleteSlot('user', currentUser.id, slotId)}
      />

      <CalendarView slots={slotsForDisplay} />
    </div>
  );
}
