import { useAvailability } from '../context/AvailabilityContext';
import UserSelector from '../components/UserSelector';
import SchedulerForm from '../components/SchedulerForm';
import SchedulerList from '../components/SchedulerList';
import './Page.css';

/**
 * UserDashboard - Shows ONE user's availability; add/edit/delete.
 * WHY: Independent dashboard; user selects who they're acting as.
 */
export default function UserDashboard() {
  const {
    currentUser,
    addSlot,
    updateSlot,
    deleteSlot,
  } = useAvailability();

  const slots = currentUser.availability;

  return (
    <div className="page">
      <h2 className="page-heading">User Dashboard</h2>
      <p className="page-desc">Manage availability for the selected user.</p>

      <UserSelector />

      <SchedulerForm
        existingSlots={slots}
        onAdd={(data) => addSlot('user', currentUser.id, data)}
      />

      <SchedulerList
        slots={slots}
        title={`${currentUser.name}'s Time Slots`}
        onUpdate={(slotId, data) => updateSlot('user', currentUser.id, slotId, data)}
        onDelete={(slotId) => deleteSlot('user', currentUser.id, slotId)}
      />
    </div>
  );
}
