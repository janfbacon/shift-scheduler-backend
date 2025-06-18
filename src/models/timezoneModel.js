import datastore from '../config/firestore.js'

const KIND = 'settings'
const TIMEZONE_ID = 'timezone'

export async function getTimezone() {
  const key = datastore.key(['settings', 'timezone']);
  console.log('Fetching Datastore key:', key);
  const [entity] = await datastore.get(key);
  console.log('Entity fetched:', entity);

  if (!entity || !entity.value) {
    return 'UTC';
  }

  return entity.value;
}

export async function setTimezone(newTimezone) {
  const key = datastore.key([KIND, TIMEZONE_ID])
  const entity = {
    key,
    data: {
      value: newTimezone,
    },
  }

  await datastore.save(entity)
  return { value: newTimezone }
}
