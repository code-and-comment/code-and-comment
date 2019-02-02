import { Base64 } from 'js-base64'


export function createViewUrl(git, path, comments, location = window.location) {
  const data = {
    git,
    path,
    comments,
  }
  const data_string = Base64.encodeURI(JSON.stringify(data))
  return `${location.origin}${location.pathname}#/view?data=${data_string}`
}


export async function search(
  conditions,
  getDB,
  getObjectStore,
  getAllRecords,
  bound = IDBKeyRange.bound
) {
  let { repository } = conditions
  repository = repository && repository.trim()
  let indexName
  if (repository) {
    indexName = 'repository'
  }
  else {
    indexName = 'updated_at'
  }
  let range
  if (repository) {
    range = bound([repository, new Date(0)], [repository, new Date()])
  }
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const codeAndComments = await getAllRecords(objectStore, indexName, range)
  return codeAndComments
}


export async function transfer(
  path,
  route,
  getDB,
  getObjectStore,
  getAllRecords,
  setTimeout,
  bound
) {
  const codeAndComments = await search({}, getDB, getObjectStore, getAllRecords, bound)
  setTimeout(() => {
    route(path)
  }, 0)
  return { codeAndComments, searchRepository: '' }
}


export function getRepository(path) {
  const parts = path.split('/')
  return `${parts[1]}/${parts[2]}`
}


export async function saveCodeAndComment(
  state,
  getDB,
  getObjectStore,
  addRecord
) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const repository = getRepository(state.path)
  // TODO add error process
  const event = await addRecord(objectStore, {
    title: state.title,
    git: state.git,
    path: state.path,
    lines: state.lines,
    comments: state.comments,
    repository
  })
  return event.target.result
}


export async function updateCodeAndComment(
  state,
  getDB,
  getObjectStore,
  putRecord
) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const repository = getRepository(state.path)
  // TODO add error process
  await putRecord(objectStore, {
    id: state.id,
    title: state.title,
    git: state.git,
    path: state.path,
    lines: state.lines,
    comments: state.comments,
    repository,
  })
}


export async function deleteOne(id, getDB, getObjectStore, deleteRecord, getAllRecords) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  await deleteRecord(objectStore, id)
  if (getAllRecords) {
    const codeAndComments = await getAllRecords(objectStore)
    return { codeAndComments }
  }
}
