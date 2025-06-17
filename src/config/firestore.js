import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp({ credential: applicationDefault() })

const db = getFirestore()
export default db

//Local emulator testing
// import { initializeApp, applicationDefault } from 'firebase-admin/app'
// import { getFirestore } from 'firebase-admin/firestore'

// process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'

// initializeApp({
//   credential: applicationDefault(),
//   projectId: 'shift-sched-fadcd',
// })

// const db = getFirestore()
// export default db