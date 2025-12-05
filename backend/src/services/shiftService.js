// shift service
// service functions for shift validation (no overlapping, min 4 hours)
import User from '../models/Shift.js'
import { parseISO, differenceInMinutes } from 'date-fns';

function timeToMinutes(timeStr) {
  // timeStr "HH:mm"
  const [hh, mm] = timeStr.split(':').map(Number);
  return hh * 60 + mm;
}

export async function checkOverlap(employeeId, date, startTime, endTime, excludeShiftId = null) {
  // Fetch shifts for employee on the date
  const existing = await User.find({ employee: employeeId, date });
  const sStart = timeToMinutes(startTime);
  const sEnd = timeToMinutes(endTime);

  for (const sh of existing) {
    if (excludeShiftId && sh._id.equals(excludeShiftId)) continue;
    const eStart = timeToMinutes(sh.startTime);
    const eEnd = timeToMinutes(sh.endTime);
    // overlap if start < eEnd && end > eStart
    if (sStart < eEnd && sEnd > eStart) return true;
  }
  return false;
}

export function isAtLeastFourHours(startTime, endTime) {
  return (timeToMinutes(endTime) - timeToMinutes(startTime)) >= 4 * 60;
}


