import { useAvailability } from '../context/AvailabilityContext';
import MentorSelector from '../components/MentorSelector';
import SchedulerForm from '../components/SchedulerForm';
import SchedulerList from '../components/SchedulerList';
import './Page.css';

/**
 * MentorDashboard - Shows ONE mentor's availability; add/edit/delete.
 * WHY: Independent dashboard; mentor selects who they're acting as.
 */
export default function MentorDashboard() {
  const {
    currentMentor,
    addSlot,
    updateSlot,
    deleteSlot,
  } = useAvailability();

  const slots = currentMentor.availability;

  return (
    <div className="page">
      <h2 className="page-heading">Mentor Dashboard</h2>
      <p className="page-desc">Manage availability for the selected mentor.</p>

      <MentorSelector />

      <SchedulerForm
        existingSlots={slots}
        onAdd={(data) => addSlot('mentor', currentMentor.id, data)}
      />

      <SchedulerList
        slots={slots}
        title={`${currentMentor.name}'s Time Slots`}
        onUpdate={(slotId, data) => updateSlot('mentor', currentMentor.id, slotId, data)}
        onDelete={(slotId) => deleteSlot('mentor', currentMentor.id, slotId)}
      />
    </div>
  );
}
