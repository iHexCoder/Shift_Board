// seed file
import mongoose from 'mongoose';
import { hash } from 'bcrypt';
import connectDB from './config/db';
import { deleteMany, create } from './models/User';
import { deleteMany as _deleteMany, create as _create } from './models/Employee';

import dotenv from 'dotenv'

dotenv.config();

async function seed() {
    await connectDB(process.env.MONGO_URI);

    // remove existing
    await deleteMany({});
    await _deleteMany({});

    // create employees
    const empAdmin = await _create({ name: 'Hire Me Admin', employeeCode: 'EMP001', department: 'HR' });
    const empUser = await _create({ name: 'Normal User', employeeCode: 'EMP002', department: 'Engineering' });

    // create users
    const hashAdmin = await hash('HireMe@2025!', 10); // required admin login
    const hashUser = await hash('User@2025!', 10);

    await create({ email: 'hire-me@anshumat.org', passwordHash: hashAdmin, role: 'admin', employee: empAdmin._id });
    await create({ email: 'user@company.org', passwordHash: hashUser, role: 'user', employee: empUser._id });

    console.log('Seeded users: hire-me@anshumat.org / HireMe@2025! (admin), user@company.org / User@2025! (user)');
    process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
