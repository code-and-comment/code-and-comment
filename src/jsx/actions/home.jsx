import { route as _route } from 'preact-router'

import { getDB as _getDB, getObjectStore as _getObjectStore, getAllRecords as _getAllRecords } from '../db.jsx'


export async function _transfer(path, route = _route, getDB = _getDB, getObjectStore = _getObjectStore, getAllRecords = _getAllRecords) {
  route(path)
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const codeAndComments = await getAllRecords(objectStore)
  return { codeAndComments }
}


const actions = () => ({
  search_code_and_comment(state, event, transfer = _transfer) {
    return transfer('/search_code_and_comment')
  },
  search_comment(state, event, transfer = _transfer) {
    return transfer('/search_comment')
  },
})


export default actions
