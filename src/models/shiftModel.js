import datastore from '../config/firestore.js';
import { v4 as uuidv4 } from 'uuid';

const shiftKind = 'shifts';
const workerKind = 'workers';

export async function getAllShifts() {
  const [shifts] = await datastore.runQuery(datastore.createQuery(shiftKind));

  const [workers] = await datastore.runQuery(
    datastore.createQuery(workerKind).filter('active', '=', 1)
  );

  const activeWorkerIds = new Set(
    workers.map(worker => worker[datastore.KEY].name)
  );

  return shifts
    .filter(shift => activeWorkerIds.has(shift.workerId))
    .map(shift => ({
      id: shift[datastore.KEY].name,
      ...shift
    }));
}

export async function getShiftsByWorker(workerId) {
  const query = datastore
    .createQuery(shiftKind)
    .filter('workerId', '=', workerId);

  const [shifts] = await datastore.runQuery(query);

  return shifts.map(shift => ({
    id: shift[datastore.KEY].name,
    ...shift
  }));
}

export async function addShift(shift) {
  const id = uuidv4();
  const shiftKey = datastore.key([shiftKind, id]);

  await datastore.save({
    key: shiftKey,
    data: shift
  });

  return { id, ...shift };
}

export async function updateShift(id, shift) {
  const shiftKey = datastore.key([shiftKind, id]);

  await datastore.update({
    key: shiftKey,
    data: shift
  });

  return { id, ...shift };
}

export async function deleteShift(id) {
  const shiftKey = datastore.key([shiftKind, id]);
  await datastore.delete(shiftKey);
}