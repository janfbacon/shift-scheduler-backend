import { getTimezone, setTimezone } from '../models/timezoneModel.js'
import { convertAllShiftsToTimezone } from '../utils/timezoneUtils.js'
import { timeZonesNames } from '@vvo/tzdb'

export async function getPreferredTimezone(req, res) {
  try {
    const timezone = await getTimezone()
    res.json({ timezone })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to get timezone.' })
  }
}

export async function updatePreferredTimezone(req, res) {
  try {
    const { timezone } = req.body

    console.log('[DEBUG] Received timezone:', timezone)

    // Validation: must be a valid IANA timezone
    if (
      !timezone ||
      typeof timezone !== 'string' ||
      !timeZonesNames.includes(timezone)
    ) {
      console.warn('[WARN] Invalid timezone format:', timezone)
      return res.status(400).json({ error: 'Invalid timezone format.' })
    }

    // Set new timezone
    await setTimezone(timezone)
    console.log('[DEBUG] Timezone updated in DB:', timezone)

    // Convert existing shifts to new timezone
    await convertAllShiftsToTimezone(timezone)
    console.log('[DEBUG] Shifts converted to timezone:', timezone)

    res.json({ timezone })
  } catch (err) {
    console.error('[ERROR] Failed to update timezone:', err)
    res.status(500).json({ error: 'Failed to update timezone.' })
  }
}