// user model
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true }, // login email
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin','user'], required: true },
  employee: { type: Schema.Types.ObjectId, ref: 'Employee' } // optional link to employee
}, { timestamps: true });

export default model('User', userSchema);
