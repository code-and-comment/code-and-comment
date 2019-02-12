import { Base64 } from 'js-base64'

import { initialState } from './store.jsx'


export function createViewUrl(git, path, comments, location = window.location) {
  const data = {
    git,
    path,
    comments,
  }
  const data_string = Base64.encodeURI(JSON.stringify(data))
  return `${location.origin}${location.pathname}#/view?data=${data_string}`
}


export function getIndexName(conditions) {
  let { repository } = conditions
  repository = repository && repository.trim()
  if (repository) {
    return 'repository'
  }
  else {
    return 'updated_at'
  }
}


export function getRange(conditions, bound) {
  let { repository } = conditions
  repository = repository && repository.trim()
  if (repository) {
    return bound([repository, new Date(0)], [repository, new Date()])
  }
}


export async function search(
  conditions,
  getDB,
  getObjectStore,
  getAllRecords,
  bound = IDBKeyRange.bound
) {
  const indexName = getIndexName(conditions)
  const range = getRange(conditions, bound)
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


export async function deleteOne(id, getDB, getObjectStore, deleteRecord) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  await deleteRecord(objectStore, id)
}


export function getStateAfterDeleting(state, codeAndComments) {
  const _initialState = initialState()
  _initialState.codeAndComments = codeAndComments
  _initialState.repositories = state.repositories
  _initialState.searchRepository = state.searchRepository
  return _initialState
}
