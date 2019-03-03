import { route as _route } from 'preact-router'

import {
  getDB as _getDB,
  getObjectStore as _getObjectStore,
  getRecord as _getRecord,
} from '../db.jsx'
import { edit as _edit } from '../utils.jsx'


function edit(
  state,
  id,
  highlightLineNumber,
  route = _route,
  setTimeout = window.setTimeout,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getRecord = _getRecord
) {
  id -= 0
  highlightLineNumber -= 0
  return _edit(
    id, highlightLineNumber, route, setTimeout, getDB, getObjectStore, getRecord)
}


export default function actions() {
  return {
    edit,
  }
}
