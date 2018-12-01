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


export function getObjectStore(db) {
  const transaction = db.transaction(['CodeAndComment'], 'readwrite')
  // TODO add transaction.onsuccess() and transaction.onerror()
  return transaction.objectStore('CodeAndComment')
}


function setEvent(request, resolve, reject) {
  request.addEventListener('success', (event) => {
    resolve(event)
  })

  request.addEventListener('error', (event) => {
    reject(event)
  })
}


export async function addRecord(objectStore, data) {
  data.created_at = data.updated_at = new Date()
  const p = new Promise((resolve, reject) => {
    const request = objectStore.add(data)
    setEvent(request, resolve, reject)
  })
  const result = await p
  return result
}


export async function putRecord(objectStore, data) {
  data.updated_at = new Date()
  const p = new Promise((resolve, reject) => {
    const request = objectStore.put(data)
    setEvent(request, resolve, reject)
  })
  const result = await p
  return result
}


export async function deleteRecord(objectStore, key) {
  const p = new Promise((resolve, reject) => {
    const request = objectStore.delete(key)
    setEvent(request, resolve, reject)
  })
  const result = await p
  return result
}
