import {
  getAllShifts,
  getShiftsByWorker,
  addShift,
  updateShift,
  deleteShift
} from '../models/shiftModel.js'
import { getTimezone } from '../models/timezoneModel.js'
import { validateShift } from '../utils/validateShift.js'
import { DateTime } from 'luxon'

export const getShifts = async (req, res) => {
  try {
    const shifts = await getAllShifts()
    res.json(shifts)
  } catch (err) {
    console.error('Error fetching shifts:', err)
    res.status(500).json({ error: 'Failed to fetch shifts.' })
  }
}

export async function newShift(req, res) {
  const { workerId, start, end } = req.body

  if (!workerId || !start || !end) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  try {
    const timezone = await getTimezone()
    const existingShifts = await getShiftsByWorker(workerId)
    const validation = validateShift(start, end, existingShifts, timezone)

    if (!validation.valid) {
      return res.status(400).json({ error: validation.error })
    }

    const duration = DateTime.fromISO(end).diff(DateTime.fromISO(start), 'hours').hours
    const newShift = await addShift({ workerId, start, end, duration })

    res.status(201).json(newShift)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to add shift.' })
  }
}

export async function editShift(req, res) {
  const { id } = req.params
  const { workerId, start, end } = req.body

  if (!workerId || !start || !end) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  try {
    const timezone = await getTimezone()
    const existingShifts = await getShiftsByWorker(workerId)
    const validation = validateShift(start, end, existingShifts, timezone, id)

    if (!validation.valid) {
      return res.status(400).json({ error: validation.error })
    }

    const duration = DateTime.fromISO(end).diff(DateTime.fromISO(start), 'hours').hours
    const updated = await updateShift(id, { workerId, start, end, duration })

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update shift.' })
  }
}

export async function removeShift(req, res) {
  const { id } = req.params

  try {
    await deleteShift(id)
    res.json({ message: 'Shift deleted.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete shift.' })
  }
}
