// employee controller
import Employee from '../models/Employee.js';

export async function getEmployees(req, res, next) {
  try {
    const employees = await find().lean();
    res.json(employees);
  } catch (err) {
    next(err);
  }
}
