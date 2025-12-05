// employee routes
import { Router } from 'express';
const router = Router();
import { getEmployees } from '../controllers/employeeController.js';
import { authenticate } from '../middleware/authMiddleware.js';

router.get('/', authenticate, getEmployees);

export default router;
