import db from '../config/firestore.js'
import { v4 as uuidv4 } from 'uuid'

const workersCollection = db.collection('workers')

export async function getAllWorkers() {
  const snapshot = await workersCollection.where('active', '==', 1).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addWorker(name) {
  const id = uuidv4();
  await workersCollection.doc(id).set({ name, active: 1 });
  return { id, name, active: 1 };
}

export async function updateWorker(id, name) {
  await workersCollection.doc(id).update({ name })
  return { id, name }
}

export async function deleteWorker(id) {
  await workersCollection.doc(id).update({ active: 0 })
  return { id, active: 0 }
}