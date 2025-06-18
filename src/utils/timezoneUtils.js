import datastore from './datastore.js'
import { DateTime } from 'luxon'

export async function convertAllShiftsToTimezone(newTimezone) {
  const query = datastore.createQuery('shifts')  // 'shifts' is the kind name
  const [shifts] = await datastore.runQuery(query)

  const updates = shifts.map((entity) => {
    const shift = entity

    const oldStart = DateTime.fromISO(shift.start).setZone('UTC')
    const oldEnd = DateTime.fromISO(shift.end).setZone('UTC')

    const newStart = oldStart.setZone(newTimezone).toISO()
    const newEnd = oldEnd.setZone(newTimezone).toISO()
    const duration = DateTime.fromISO(newEnd).diff(DateTime.fromISO(newStart), 'hours').hours

    // Use the original entity key to perform update
    const updatedEntity = {
      key: entity[datastore.KEY],
      data: {
        ...shift,
        start: newStart,
        end: newEnd,
        duration,
      },
    }

    return datastore.update(updatedEntity)
  })

  await Promise.all(updates)
  console.log(`Converted ${updates.length} shifts to timezone ${newTimezone}`)
}