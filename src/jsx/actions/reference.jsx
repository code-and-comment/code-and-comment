import { route as _route } from 'preact-router'

import {
  getDB as _getDB,
  getObjectStore as _getObjectStore,
  getRecord as _getRecord,
} from '../db.jsx'
import {
  updateRepositories as _updateRepositories,
  updateCodeAndComments as _updateCodeAndComments
} from '../worker.jsx'
import {
  edit as _edit,
  getRepository,
} from '../utils.jsx'


export function edit(
  state,
  id,
  highlightLineNumber,
  route = _route,
  requestIdleCallback = window.requestIdleCallback,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getRecord = _getRecord,
  updateRepositories = _updateRepositories,
  updateCodeAndComments = _updateCodeAndComments,
) {
  return _edit(
    id,
    highlightLineNumber,
    route,
    requestIdleCallback,
    getDB,
    getObjectStore,
    getRecord,
    updateRepositories,
    updateCodeAndComments,
  )
}

export default function actions() {
  return {
    edit,
  }
}
