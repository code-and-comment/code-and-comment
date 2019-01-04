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


