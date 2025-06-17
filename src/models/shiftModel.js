// models/shiftModel.js
import db from '../config/firestore.js'
import { v4 as uuidv4 } from 'uuid'

const shiftsCollection = db.collection('shifts')

export async function getAllShifts() {
  const shiftsSnap = await shiftsCollection.get();
  const shifts = shiftsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Get all active workers
  const workersSnap = await db.collection('workers').where('active', '==', 1).get();
  const activeWorkerIds = new Set(workersSnap.docs.map(doc => doc.id));

  // Filter shifts: keep only those with active workers
  const filteredShifts = shifts.filter(shift => activeWorkerIds.has(shift.workerId));

  return filteredShifts;
}

export async function getShiftsByWorker(workerId) {
  const snapshot = await shiftsCollection.where('workerId', '==', workerId).get()
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function addShift(shift) {
  const id = uuidv4()
  await shiftsCollection.doc(id).set(shift)
  return { id, ...shift }
}

export async function updateShift(id, shift) {
  await shiftsCollection.doc(id).update(shift)
  return { id, ...shift }
}

export async function deleteShift(id) {
  await shiftsCollection.doc(id).delete()
}
