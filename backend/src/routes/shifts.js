// shift routes
import { Router } from 'express';
const router = Router();
import { createShift, getShifts, deleteShift } from '../controllers/shiftController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

router.post('/', authenticate, authorize('admin'), createShift);
router.get('/', authenticate, getShifts);
router.delete('/:id', authenticate, authorize(['admin','user']), deleteShift);

export default router;
