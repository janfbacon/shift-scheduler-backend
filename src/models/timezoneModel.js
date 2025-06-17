import db from '../config/firestore.js'

const tzCollection = db.collection('settings')

export async function getTimezone() {
  const snapshot = await tzCollection.doc('timezone').get()
  if (!snapshot.exists) {
    return 'UTC'  // Fallback default
  }
  const data = snapshot.data()
  return data.value || 'UTC'
}

export async function setTimezone(newTimezone) {
  await tzCollection.doc('timezone').set({ value: newTimezone })
  return { value: newTimezone }
}
