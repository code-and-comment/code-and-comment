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

export async function transfer(
  path,
  route = _route,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords
) {
  route(path)
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const codeAndComments = await getAllRecords(objectStore)
  return { codeAndComments }
}

export async function saveCodeAndComment(
  state,
  title,
  getDB,
  getObjectStore,
  addRecord
) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const parts = state.path.split('/')
  // TODO add error process
  const event = await addRecord(objectStore, {
    title,
    git: state.git,
    path: state.path,
    lines: state.lines,
    comments: state.comments,
    repository: `${parts[1]}/${parts[2]}`,
  })
  return {
    id: event.target.result,
    title,
    saved: true
  }
}

export async function updateCodeAndComment(
  state,
  title,
  getDB,
  getObjectStore,
  putRecord
) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const parts = state.path.split('/')
  // TODO add error process
  await putRecord(objectStore, {
    id: state.id,
    title,
    git: state.git,
    path: state.path,
    lines: state.lines,
    comments: state.comments,
    repository: `${parts[1]}/${parts[2]}`,
  })
  return {
    title,
    updated: true
  }
}
