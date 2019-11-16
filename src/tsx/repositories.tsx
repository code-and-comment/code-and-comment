import {
  getDB,
  getObjectStore,
} from './db'


self.addEventListener('message', async function() {
  const db = await getDB()
  // @ts-ignore
  const objectStore = await getObjectStore(db)
  const p = new Promise((resolve, reject) => {
    const cursor = objectStore.openCursor()
    const repositories = new Set()
    cursor.addEventListener('success', (event: Event) => {
      // @ts-ignore
      const cursor = event.target.result
      if (cursor) {
        repositories.add(cursor.value.repository)
        cursor.continue()
      }
      else {
        resolve(Array.from(repositories))
      }
    })
    cursor.addEventListener('error', () => {
      reject(null)
    })
  })
  const repositories = await p
  const w: Worker = self as any
  w.postMessage(repositories)
}, false)
