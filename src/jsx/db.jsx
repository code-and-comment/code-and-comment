let db = null


function onUpgradeneeded(event) {
  const db = event.target.result
  const store = db.createObjectStore('CodeAndComment', {
    keyPath: 'id',
    autoIncrement: true
  })

  const indexes = ['git', 'repository', 'path', 'updated_at']
  indexes.forEach((key) => {
    store.createIndex(key, [key], {
      unique: false,
      multiEntry: false,
    })
  })
}


export async function getDB() {
  if (db) {
    return db
  }
  const p = new Promise((resolve, reject) => {
    const request = indexedDB.open('CodeAndComment', 1)

    request.addEventListener('upgradeneeded', onUpgradeneeded)

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
