// datastore.ts
import { Datastore } from '@google-cloud/datastore'

// Automatically uses the default GCP project and credentials in Cloud Run or App Engine
const datastore = new Datastore({
  namespace: '', // "" means default namespace (optional)
})

export default datastore


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