import { route as _route } from 'preact-router'

import { getDB as _getDB, getObjectStore as _getObjectStore, getAllRecords as _getAllRecords } from '../db.jsx'
import { transfer } from '../utils.jsx'


function search_code_and_comment(
  state,
  event,
  route = _route,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords
) {
  return transfer('/search_code_and_comment', route, getDB, getObjectStore, getAllRecords)
}


function search_comment(
  state,
  event,
  route = _route,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords
) {
  return transfer('/search_comment', route, getDB, getObjectStore, getAllRecords)
}


const actions = () => ({
  search_code_and_comment,
  search_comment,
})


export default actions
