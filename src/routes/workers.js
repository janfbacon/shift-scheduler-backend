import express from 'express';
import {
  listWorkers,
  newWorker,
  editWorker,
  removeWorker
} from '../controllers/workerController.js';

const router = express.Router();

router.get('/', listWorkers);
router.post('/', newWorker);
router.put('/:id', editWorker);
router.delete('/:id', removeWorker);

export default router;
