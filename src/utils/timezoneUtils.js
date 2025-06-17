import { getFirestore } from 'firebase-admin/firestore'
import { DateTime } from 'luxon'

const db = getFirestore()

export async function convertAllShiftsToTimezone(newTimezone) {
  const snapshot = await db.collection('shifts').get()
  const updates = []

  snapshot.forEach((doc) => {
    const shift = doc.data()
    const oldStart = DateTime.fromISO(shift.start).setZone('UTC')  // assumed old stored zone
    const oldEnd = DateTime.fromISO(shift.end).setZone('UTC')

    const newStart = oldStart.setZone(newTimezone).toISO()
    const newEnd = oldEnd.setZone(newTimezone).toISO()
    const duration = DateTime.fromISO(newEnd).diff(DateTime.fromISO(newStart), 'hours').hours

    updates.push(
      db.collection('shifts').doc(doc.id).update({
        start: newStart,
        end: newEnd,
        duration,
      })
    )
  })

  await Promise.all(updates)
}