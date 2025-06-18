import datastore from '../config/firestore.js';
import { v4 as uuidv4 } from 'uuid';

const kind = 'workers';

export async function getAllWorkers() {
  const query = datastore.createQuery(kind).filter('active', '=', 1);
  const [workers] = await datastore.runQuery(query);

  return workers.map(worker => ({
    id: worker[datastore.KEY].name,
    ...worker
  }));
}

export async function addWorker(name) {
  const id = uuidv4();
  const taskKey = datastore.key([kind, id]);

  const worker = {
    name,
    active: 1
  };

  await datastore.save({
    key: taskKey,
    data: worker
  });

  return { id, ...worker };
}

export async function updateWorker(id, name) {
  const taskKey = datastore.key([kind, id]);

  await datastore.update({
    key: taskKey,
    data: { name }
  });

  return { id, name };
}

export async function deleteWorker(id) {
  const taskKey = datastore.key([kind, id]);

  await datastore.update({
    key: taskKey,
    data: { active: 0 }
  });

  return { id, active: 0 };
}