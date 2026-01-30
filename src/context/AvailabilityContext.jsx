import { createContext, useContext, useState, useCallback } from 'react';

/**
 * AvailabilityContext - Central state for MULTIPLE users and mentors.
 *
 * STATE SHAPE:
 *   users: [{ id, name, availability: [{ id, day, start, end }] }]
 *   mentors: [{ id, name, availability: [{ id, day, start, end }] }]
 *   currentUserId: string  - which user the User Dashboard displays
 *   currentMentorId: string - which mentor the Mentor Dashboard displays
 *
 * WHY: Each person has their own availability array. Admin groups by person.
 */

const createSlot = (day, start, end) => ({
  id: `slot-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  day,
  start,
  end,
});

// Seed data - multiple users and mentors for demo
const INITIAL_USERS = [
  { id: 'u1', name: 'Alice', availability: [] },
  { id: 'u2', name: 'Bob', availability: [] },
  { id: 'u3', name: 'Carol', availability: [] },
];

const INITIAL_MENTORS = [
  { id: 'm1', name: 'Dr. Smith', availability: [] },
  { id: 'm2', name: 'Jane Doe', availability: [] },
  { id: 'm3', name: 'Prof. Wilson', availability: [] },
];

const AvailabilityContext = createContext(null);

export function AvailabilityProvider({ children }) {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [mentors, setMentors] = useState(INITIAL_MENTORS);
  const [currentUserId, setCurrentUserId] = useState(INITIAL_USERS[0].id);
  const [currentMentorId, setCurrentMentorId] = useState(INITIAL_MENTORS[0].id);

  const addSlot = useCallback((role, personId, { day, start, end }) => {
    const slot = createSlot(day, start, end);
    if (role === 'user') {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === personId
            ? { ...u, availability: [...u.availability, slot] }
            : u
        )
      );
    } else {
      setMentors((prev) =>
        prev.map((m) =>
          m.id === personId
            ? { ...m, availability: [...m.availability, slot] }
            : m
        )
      );
    }
  }, []);

  const updateSlot = useCallback((role, personId, slotId, { day, start, end }) => {
    const updated = { id: slotId, day, start, end };
    if (role === 'user') {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === personId
            ? {
                ...u,
                availability: u.availability.map((s) =>
                  s.id === slotId ? updated : s
                ),
              }
            : u
        )
      );
    } else {
      setMentors((prev) =>
        prev.map((m) =>
          m.id === personId
            ? {
                ...m,
                availability: m.availability.map((s) =>
                  s.id === slotId ? updated : s
                ),
              }
            : m
        )
      );
    }
  }, []);

  const deleteSlot = useCallback((role, personId, slotId) => {
    if (role === 'user') {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === personId
            ? { ...u, availability: u.availability.filter((s) => s.id !== slotId) }
            : u
        )
      );
    } else {
      setMentors((prev) =>
        prev.map((m) =>
          m.id === personId
            ? { ...m, availability: m.availability.filter((s) => s.id !== slotId) }
            : m
        )
      );
    }
  }, []);

  const currentUser = users.find((u) => u.id === currentUserId) ?? users[0];
  const currentMentor = mentors.find((m) => m.id === currentMentorId) ?? mentors[0];

  const value = {
    users,
    mentors,
    currentUserId,
    currentMentorId,
    setCurrentUserId,
    setCurrentMentorId,
    currentUser,
    currentMentor,
    addSlot,
    updateSlot,
    deleteSlot,
  };

  return (
    <AvailabilityContext.Provider value={value}>
      {children}
    </AvailabilityContext.Provider>
  );
}

export function useAvailability() {
  const ctx = useContext(AvailabilityContext);
  if (!ctx) throw new Error('useAvailability must be used inside AvailabilityProvider');
  return ctx;
}
