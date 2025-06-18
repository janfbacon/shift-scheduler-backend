import datastore from '../config/firestore.js'

const KIND = 'Settings'
const TIMEZONE_ID = 'timezone'

export async function getTimezone() {
  const key = datastore.key([KIND, TIMEZONE_ID])
  const [entity] = await datastore.get(key)

  if (!entity) {
    return 'UTC' // fallback
  }

  return entity.value || 'UTC'
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
