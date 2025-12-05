// employee model
import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
  name: { type: String, required: true },
  employeeCode: { type: String, required: true, unique: true },
  department: { type: String }
}, { timestamps: true });

export default model('Employee', employeeSchema);
