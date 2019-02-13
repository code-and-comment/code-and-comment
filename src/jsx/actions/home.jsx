import { route as _route } from 'preact-router'

import { getDB as _getDB, getObjectStore as _getObjectStore, getAllRecords as _getAllRecords } from '../db.jsx'
import { transfer } from '../utils.jsx'


function searchCodeAndComment(
  state,
  event,
  route = _route,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords,
  setTimeout = window.setTimeout,
  bound = window.IDBKeyRange.bound
) {
  return transfer('/search_code_and_comment', route, getDB, getObjectStore, getAllRecords, setTimeout, bound)
}


function searchComment(
  state,
  event,
  route = _route,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords,
  setTimeout = window.setTimeout,
  bound = window.IDBKeyRange.bound
) {
  return transfer('/search_comment', route, getDB, getObjectStore, getAllRecords, setTimeout, bound)
}


export default function actions() {
  return {
    searchCodeAndComment,
    searchComment,
  }
}
