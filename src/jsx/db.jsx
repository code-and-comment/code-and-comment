let db = null


function onUpgradeneeded(event) {
  const db = event.target.result
  const store = db.createObjectStore('CodeAndComment', {
    keyPath: 'id',
    autoIncrement: true
  })

  const updated_at = 'updated_at'
  const indexes = ['git', 'repository', 'path']
  indexes.forEach((key) => {
    store.createIndex(key, [key, updated_at], {
      unique: false,
      multiEntry: false,
    })
  })

  store.createIndex(updated_at, [updated_at], {
    unique: false,
    multiEntry: false,
  })
}


export function getDB() {
  if (db) {
    return db
  }
  const p = new Promise((resolve, reject) => {
    const request = indexedDB.open('CodeAndComment', 1)

    request.addEventListener('upgradeneeded', onUpgradeneeded)

    request.addEventListener('success', (event) => {
      db = event.target.result
      resolve(db)
    })

    request.addEventListener('error', () => {
      alert('indexedDB open error')
      reject(null)
    })
  })
  return p
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


export function getRecord(objectStore, key) {
  const p = new Promise((resolve, reject) => {
    const request = objectStore.get(key)
    setEvent(request, resolve, reject)
  })
  return p
}


export function addRecord(objectStore, data) {
  data.created_at = data.updated_at = new Date()
  const p = new Promise((resolve, reject) => {
    const request = objectStore.add(data)
    setEvent(request, resolve, reject)
  })
  return p
}


export function putRecord(objectStore, data) {
  data.updated_at = new Date()
  const p = new Promise((resolve, reject) => {
    const request = objectStore.put(data)
    setEvent(request, resolve, reject)
  })
  return p
}


export function deleteRecord(objectStore, key) {
  const p = new Promise((resolve, reject) => {
    const request = objectStore.delete(key)
    setEvent(request, resolve, reject)
  })
  return p
}


export function getAllRecords(
  objectStore,
  indexName = 'updated_at',
  range,
  direction = 'prev'
) {
  const p = new Promise((resolve, reject) => {
    const index = objectStore.index(indexName)
    const cursor = index.openCursor(range, direction)
    const records = []
    cursor.addEventListener('success', (event) => {
      const cursor = event.target.result
      if (cursor) {
        records.push(cursor.value)
        cursor.continue()
      }
      else {
        resolve(records)
      }
    })
    cursor.addEventListener('error', () => {
      reject(null)
    })
  })
  return p
}
