import { route as _route } from 'preact-router'

import {
  getDB as _getDB,
  getRecord as _getRecord,
  getObjectStore as _getObjectStore,
} from '../db.jsx'
import {
  updateRepositories as _updateRepositories,
  updateCodeAndComments as _updateCodeAndComments
} from '../worker.jsx'
import {
  edit as _edit,
  getRepository as _getRepository,
} from '../utils'


export function edit(
  state,
  id,
  highlightLineNumber,
  route = _route,
  requestIdleCallback = window.requestIdleCallback,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getRecord = _getRecord,
  getRepository = _getRepository,
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
    getRepository,
    updateRepositories,
    updateCodeAndComments,
  )
}

export default function actions() {
  return {
    edit,
  }
}
