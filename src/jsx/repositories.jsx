import {
  getDB,
  getObjectStore,
} from './db'


self.addEventListener('message', async function() {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const p = new Promise((resolve, reject) => {
    const cursor = objectStore.openCursor()
    const repositories = new Set()
    cursor.addEventListener('success', (event) => {
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
  self.postMessage(repositories)
}, false)
