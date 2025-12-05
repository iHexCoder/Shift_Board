// shift controller
import joi from 'joi'
import Shift from '../models/Shift.js';
import Employee from '../models/Employee.js';
import { checkOverlap, isAtLeastFourHours } from '../services/shiftService.js';

const createSchema = joi.object({
  employee: joi.string().required(),
  date: joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
  startTime: joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  endTime: joi.string().pattern(/^\d{2}:\d{2}$/).required()
});

export async function createShift(req, res, next) {
  try {
    const { error, value } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    // verify employee exists
    const emp = await Shift.findById(value.employee);
    if (!emp) return res.status(400).json({ message: 'Employee not found' });

    // business rule: min 4 hours
    if (!isAtLeastFourHours(value.startTime, value.endTime)) {
      return res.status(400).json({ message: 'Shift must be at least 4 hours long' });
    }

    // business rule: no overlap
    const overlap = await checkOverlap(value.employee, value.date, value.startTime, value.endTime);
    if (overlap) {
      return res.status(400).json({ message: 'Shift overlaps with existing shift for this employee' });
    }

    const shift = new Shift(value);
    await shift.save();
    res.status(201).json(shift);
  } catch (err) {
    next(err);
  }
}

export async function getShifts(req, res, next) {
  try {
    const filter = {};
    // if query includes employee
    if (req.query.employee) filter.employee = req.query.employee;
    if (req.query.date) filter.date = req.query.date;

    // role based: normal users only their employee shifts
    if (req.user.role === 'user') {
      if (!req.user.employee) return res.status(400).json({ message: 'User not linked to an employee' });
      filter.employee = req.user.employee._id;
    }

    const shifts = await find(filter).populate('employee').sort({ date: 1, startTime: 1 });
    res.json(shifts);
  } catch (err) {
    next(err);
  }
}

export async function deleteShift(req, res, next) {
  try {
    const shiftId = req.params.id;
    const shift = await findById(shiftId);
    if (!shift) return res.status(404).json({ message: 'Shift not found' });

    // normal users can only delete their own shift (optional requirement — safe to enforce)
    if (req.user.role === 'user') {
      if (!req.user.employee || !shift.employee.equals(req.user.employee._id)) {
        return res.status(403).json({ message: 'Not allowed to delete this shift' });
      }
    }

    await shift.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}
