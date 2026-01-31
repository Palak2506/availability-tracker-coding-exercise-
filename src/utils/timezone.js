/**
 * Timezone utilities - Plain JavaScript, no external libs.
 *
 * WHY single timezone storage (GMT):
 * - Prevents bugs when users switch timezones (data stays consistent).
 * - One source of truth; display is always a conversion from GMT.
 *
 * Slot format: { day, start, end } where start/end are HOURS (decimal for :30).
 * - Stored in GMT.
 * - Displayed in selected timezone (IST or GMT).
 */

export const TIMEZONES = { IST: 'IST', GMT: 'GMT' };

// IST = GMT + 5.5 (India Standard Time)
const IST_OFFSET_HOURS = 5.5;

/**
 * Convert hours from user's timezone to GMT for storage.
 * @param {number} hour - Hour in selected timezone (0-24, decimal allowed)
 * @param {string} fromTz - 'IST' | 'GMT'
 * @returns {{ hour: number, dayOffset: number }} - GMT hour and day shift (-1, 0, or 1)
 */
export function toGmtHour(hour, fromTz) {
  if (fromTz === TIMEZONES.GMT) return { hour, dayOffset: 0 };
  const gmtHour = hour - IST_OFFSET_HOURS;
  if (gmtHour < 0) return { hour: gmtHour + 24, dayOffset: -1 };
  if (gmtHour >= 24) return { hour: gmtHour - 24, dayOffset: 1 };
  return { hour: gmtHour, dayOffset: 0 };
}

/**
 * Convert hours from GMT to display timezone.
 * @param {number} gmtHour - Hour in GMT (decimal allowed)
 * @param {string} toTz - 'IST' | 'GMT'
 * @returns {{ hour: number, dayOffset: number }}
 */
export function fromGmtHour(gmtHour, toTz) {
  if (toTz === TIMEZONES.GMT) return { hour: gmtHour, dayOffset: 0 };
  const localHour = gmtHour + IST_OFFSET_HOURS;
  if (localHour < 0) return { hour: localHour + 24, dayOffset: -1 };
  if (localHour >= 24) return { hour: localHour - 24, dayOffset: 1 };
  return { hour: localHour, dayOffset: 0 };
}

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getNextDay(day, offset) {
  const i = DAY_ORDER.indexOf(day);
  const next = (i + offset + 7) % 7;
  return DAY_ORDER[next];
}

/**
 * Convert a slot from display timezone to GMT for storage.
 * @param {{ day: string, start: number, end: number }} slot - In display timezone
 * @param {string} fromTz - 'IST' | 'GMT'
 * @returns {{ day: string, start: number, end: number }} - In GMT
 */
export function slotToGmt(slot, fromTz) {
  const { day, start, end } = slot;
  const startRes = toGmtHour(start, fromTz);
  const endRes = toGmtHour(end, fromTz);

  const gmtDay = getNextDay(day, startRes.dayOffset);
  return {
    day: gmtDay,
    start: startRes.hour,
    end: endRes.hour,
  };
}

/**
 * Convert a slot from GMT to display timezone.
 * @param {{ id: string, day: string, start: number, end: number }} slot - In GMT
 * @param {string} toTz - 'IST' | 'GMT'
 * @returns {{ id: string, day: string, start: number, end: number }} - In display timezone
 */
export function slotFromGmt(slot, toTz) {
  const { id, day, start, end } = slot;
  const startRes = fromGmtHour(start, toTz);
  const endRes = fromGmtHour(end, toTz);

  const displayDay = getNextDay(day, startRes.dayOffset);
  return {
    id,
    day: displayDay,
    start: startRes.hour,
    end: endRes.hour,
  };
}

/**
 * Format hour for display (handles decimals: 9.5 -> "09:30").
 * WHY: Slots may have 30-min granularity due to IST offset.
 */
export function formatHour(hour) {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/** Hour options for selects (0, 0.5, 1, ... 23.5) - supports IST 30-min offsets */
export const HOUR_OPTIONS = Array.from({ length: 48 }, (_, i) => i / 2);
