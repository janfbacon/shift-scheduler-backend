import express from 'express';
import {
  getPreferredTimezone,
  updatePreferredTimezone
} from '../controllers/timezoneController.js';

const router = express.Router();

router.get('/', getPreferredTimezone);
router.put('/', updatePreferredTimezone);

export default router;
