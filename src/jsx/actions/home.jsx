import { route as _route } from 'preact-router'

import { getDB as _getDB, getObjectStore as _getObjectStore, getAllRecords as _getAllRecords } from '../db.jsx'
import { transfer } from '../utils.jsx'


const actions = () => ({
  search_code_and_comment(
    state,
    event,
    route = _route,
    getDB = _getDB,
    getObjectStore = _getObjectStore,
    getAllRecords = _getAllRecords
  ) {
    return transfer('/search_code_and_comment', route, getDB, getObjectStore, getAllRecords)
  },
  search_comment(
    state,
    event,
    route = _route,
    getDB = _getDB,
    getObjectStore = _getObjectStore,
    getAllRecords = _getAllRecords
  ) {
    return transfer('/search_comment', route, getDB, getObjectStore, getAllRecords)
  },
})


export default actions
