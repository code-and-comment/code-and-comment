import { CodeAndComment } from './store'


let db: IDBDatabase | null = null


function onUpgradeneeded(event: IDBVersionChangeEvent) {
  // @ts-ignore
  const db = event.target.result as IDBDatabase
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


export function getDB(): Promise<IDBDatabase | null> | IDBDatabase {
  if (db) {
    return db
  }
  const p = new Promise<IDBDatabase | null>((resolve, reject) => {
    const request = indexedDB.open('CodeAndComment', 1)

    request.addEventListener('upgradeneeded', onUpgradeneeded)

    request.addEventListener('success', (event) => {
      // @ts-ignore
      db = event.target.result as IDBDatabase
      resolve(db)
    })

    request.addEventListener('error', () => {
      alert('indexedDB open error')
      reject(null)
    })
  })
  return p
}


export function getObjectStore(db: IDBDatabase) {
  const transaction = db.transaction(['CodeAndComment'], 'readwrite')
  // TODO add transaction.onsuccess() and transaction.onerror()
  return transaction.objectStore('CodeAndComment')
}


export function clearObjectStore(objectStore: IDBObjectStore) {
  const p = new Promise((resolve, reject) => {
    const request = objectStore.clear()

    request.addEventListener('success', () => {
      resolve(true)
    })

    request.addEventListener('error', () => {
      alert('objectStore clear error')
      reject(false)
    })
  })
  return p
}


function setEvent(request: IDBRequest, resolve: Function, reject: Function) {
  request.addEventListener('success', (event) => {
    resolve(event)
  })

  request.addEventListener('error', (event) => {
    reject(event)
  })
}


export function getRecord(objectStore: IDBObjectStore, key: number) {
  const p = new Promise<Event>((resolve, reject) => {
    const request = objectStore.get(key)
    setEvent(request, resolve, reject)
  })
  return p
}


export function addRecord(objectStore: IDBObjectStore, data: CodeAndComment) {
  data.created_at = data.updated_at = new Date()
  const p = new Promise<Event>((resolve, reject) => {
    const request = objectStore.add(data)
    setEvent(request, resolve, reject)
  })
  return p
}


export function putRecord(objectStore: IDBObjectStore, data: CodeAndComment, updatedAt = true) {
  if (updatedAt) {
    data.updated_at = new Date()
  }
  const p = new Promise<Event>((resolve, reject) => {
    const request = objectStore.put(data)
    setEvent(request, resolve, reject)
  })
  return p
}


export async function putRecords(objectStore: IDBObjectStore, data: CodeAndComment[]) {
  for (let d of data) {
    d.created_at = new Date(d.created_at)
    d.updated_at = new Date(d.updated_at)
    await putRecord(objectStore, d, false)
  }
}


export function deleteRecord(objectStore: IDBObjectStore, key: number) {
  const p = new Promise<Event>((resolve, reject) => {
    const request = objectStore.delete(key)
    setEvent(request, resolve, reject)
  })
  return p
}


export function getAllRecords(
  objectStore: IDBObjectStore,
  indexName = 'updated_at',
  range: IDBKeyRange,
  direction: IDBCursorDirection = 'prev',
  callback: ((cursor: IDBCursorWithValue) => void) | null = null
) {
  const p = new Promise<CodeAndComment[] | null>((resolve, reject) => {
    const index = objectStore.index(indexName)
    const cursor = index.openCursor(range, direction)
    const records: CodeAndComment[] = []
    cursor.addEventListener('success', (event: Event) => {
      // @ts-ignore
      const cursor = event.target.result
      if (cursor) {
        if (callback) {
          // @ts-ignore
          callback(cursor)
        }
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
