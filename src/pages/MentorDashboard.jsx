import { useMemo } from 'react';
import { useAvailability } from '../context/AvailabilityContext';
import { slotFromGmt, slotToGmt } from '../utils/timezone';
import MentorSelector from '../components/MentorSelector';
import TimezoneSelector from '../components/TimezoneSelector';
import SchedulerForm from '../components/SchedulerForm';
import SchedulerList from '../components/SchedulerList';
import CalendarView from '../components/CalendarView';
import './Page.css';

/**
 * MentorDashboard - Shows ONE mentor's availability; add/edit/delete.
 * Slots stored in GMT; converted to selectedTimezone for display/input.
 */
export default function MentorDashboard() {
  const {
    currentMentor,
    selectedTimezone,
    addSlot,
    updateSlot,
    deleteSlot,
  } = useAvailability();

  const slotsForDisplay = useMemo(
    () => currentMentor.availability.map((s) => slotFromGmt(s, selectedTimezone)),
    [currentMentor.availability, selectedTimezone]
  );

  const handleAdd = (data) => {
    const gmtData = slotToGmt(data, selectedTimezone);
    addSlot('mentor', currentMentor.id, gmtData);
  };

  const handleUpdate = (slotId, data) => {
    const gmtData = slotToGmt(data, selectedTimezone);
    updateSlot('mentor', currentMentor.id, slotId, gmtData);
  };

  return (
    <div className="page">
      <h2 className="page-heading">Mentor Dashboard</h2>
      <p className="page-desc">Manage availability for the selected mentor.</p>

      <div className="page-selectors">
        <MentorSelector />
        <TimezoneSelector />
      </div>

      <SchedulerForm
        existingSlots={slotsForDisplay}
        onAdd={handleAdd}
      />

      <SchedulerList
        slots={slotsForDisplay}
        title={`${currentMentor.name}'s Time Slots`}
        onUpdate={handleUpdate}
        onDelete={(slotId) => deleteSlot('mentor', currentMentor.id, slotId)}
      />

      <CalendarView slots={slotsForDisplay} />
    </div>
  );
}
