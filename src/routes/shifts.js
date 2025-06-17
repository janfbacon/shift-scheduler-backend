import express from 'express';
import {
  getShifts,
  newShift,
  editShift,
  removeShift
} from '../controllers/shiftController.js';

const router = express.Router();

router.get('/', getShifts);
router.post('/', newShift);
router.put('/:id', editShift);
router.delete('/:id', removeShift);

export default router;