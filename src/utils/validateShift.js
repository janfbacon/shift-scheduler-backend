import { DateTime } from 'luxon';

export function validateShift(start, end, existingShifts, timezone, editingShiftId = null) {
  const startDate = DateTime.fromISO(start, { zone: timezone });
  const endDate = DateTime.fromISO(end, { zone: timezone });

  if (!startDate.isValid || !endDate.isValid) {
    return { valid: false, error: 'Invalid datetime format.' };
  }

  const durationHours = endDate.diff(startDate, 'hours').hours;

  if (durationHours <= 0) {
    return { valid: false, error: 'End time must be after start time.' };
  }

  if (durationHours > 12) {
    return { valid: false, error: 'Shift cannot exceed 12 hours.' };
  }

  for (const shift of existingShifts) {
    if (shift.id === editingShiftId) continue;

    const shiftStart = DateTime.fromISO(shift.start, { zone: timezone });
    const shiftEnd = DateTime.fromISO(shift.end, { zone: timezone });

    const overlaps = startDate < shiftEnd && endDate > shiftStart;
    if (overlaps) {
      return { valid: false, error: 'Shift overlaps with another shift.' };
    }
  }

  return { valid: true };
}