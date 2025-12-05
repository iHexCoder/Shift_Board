// shift model
import { Schema, model } from 'mongoose';

const shiftSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: String, required: true }, // ISO date: YYYY-MM-DD
  startTime: { type: String, required: true }, // HH:mm (24h)
  endTime: { type: String, required: true } // HH:mm
}, { timestamps: true });

export default model('Shift', shiftSchema);
