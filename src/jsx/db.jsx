let db = null


export async function getDB() {
  if (db) {
    return db
  }
  const p = new Promise((resolve, reject) => {
    const request = indexedDB.open('CodeAndComment', 1)

    request.addEventListener('upgradeneeded', (event) => {
      const db = event.target.result
      const store = db.createObjectStore('CodeAndComment', {
        keyPath: 'id',
        autoIncrement: true
      })

      store.createIndex(
        'git',
        ['git'],
        {
          unique: false,
          multiEntry: false,
        }
      )
    })

    request.addEventListener('success', (event) => {
      resolve(event.target.result)
    })

    request.addEventListener('error', () => {
      alert('indexedDB open error')
      reject(null)
    })
  })
  db = await p
  return db
}
