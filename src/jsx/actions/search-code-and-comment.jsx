import { route as _route } from 'preact-router'

import {
  getDB as _getDB,
  getObjectStore as _getObjectStore,
  getRecord as _getRecord,
  deleteRecord as _deleteRecord,
  getAllRecords as _getAllRecords
} from '../db.jsx'
import {
  edit as _edit,
  getRepository,
  deleteOne as _deleteOne,
  search as _search,
  getStateAfterDeleting
} from '../utils.jsx'
import {
  updateRepositories as _updateRepositories,
  updateCodeAndComments as _updateCodeAndComments
} from '../worker.jsx'


async function search(
  state,
  conditions,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords
) {
  let searchRepository = ''
  if (conditions && conditions.repository) {
    searchRepository = conditions.repository
  }
  const codeAndComments = await _search(conditions, getDB, getObjectStore, getAllRecords)
  return {
    codeAndComments,
    searchRepository
  }
}


function back(state, event, route = _route, setTimeout = window.setTimeout) {
  event.stopPropagation()
  if (state.id) {
    return edit(
      state,
      state.id,
      0,
      event
    )
  }
  setTimeout(() => {
    route('/edit')
  }, 0)
  return {
    codeAndComments: [],
    searchRepository: ''
  }
}


async function deleteOne(
  state,
  id,
  event,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  deleteRecord = _deleteRecord,
  getAllRecords = _getAllRecords,
  updateRepositories = _updateRepositories,
  search = _search
) {
  event.stopPropagation()
  await _deleteOne(id, getDB, getObjectStore, deleteRecord)
  updateRepositories()
  const conditions = { repository: state.searchRepository }
  const codeAndComments = await search(conditions, getDB, getObjectStore, getAllRecords)
  if (state.id !== id) {
    return { codeAndComments }
  }
  return getStateAfterDeleting(state, codeAndComments)
}


function edit(
  state,
  id,
  highlightLineNumber,
  event,
  route = _route,
  requestIdleCallback = window.requestIdleCallback,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getRecord = _getRecord,
  updateRepositories = _updateRepositories,
  updateCodeAndComments = _updateCodeAndComments,
) {
  event.stopPropagation()
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
    search,
    back,
    deleteOne,
    edit,
  }
}
