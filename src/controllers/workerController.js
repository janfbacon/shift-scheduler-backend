import {
  getAllWorkers,
  addWorker,
  updateWorker,
  deleteWorker
} from '../models/workerModel.js';

export async function listWorkers(req, res) {
  try {
    const workers = await getAllWorkers();
    res.status(200).json(workers);
  } catch (err) {
    console.error('Error fetching workers:', err);
    res.status(500).json({ error: 'Failed to fetch workers.' });
  }
}

export async function newWorker(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Worker name required.' });
    }

    const worker = await addWorker(name);
    res.status(201).json(worker);
  } catch (err) {
    console.error('Error adding worker:', err);
    res.status(500).json({ error: 'Failed to add worker.' });
  }
}

export async function editWorker(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Worker name required.' });
    }

    const updated = await updateWorker(id, name);
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating worker:', err);
    res.status(500).json({ error: 'Failed to update worker.' });
  }
}

export async function removeWorker(req, res) {
  try {
    const { id } = req.params;
    await deleteWorker(id);
    res.status(200).json({ message: 'Worker deleted.' });
  } catch (err) {
    console.error('Error deleting worker:', err);
    res.status(500).json({ error: 'Failed to delete worker.' });
  }
}