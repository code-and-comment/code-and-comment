import { route as _route } from 'preact-router'

import {
  getDB as _getDB,
  getObjectStore as _getObjectStore,
  getRecord as _getRecord,
  deleteRecord as _deleteRecord,
  getAllRecords as _getAllRecords
} from '../db.jsx'
import {
  deleteOne as _deleteOne,
  search as _search,
  edit as _edit,
  getStateAfterDeleting
} from '../utils.jsx'
import { updateRepositories as _updateRepositories } from '../worker.jsx'


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
  setTimeout(() => {
    route('/edit')
  }, 0)
  return { codeAndComments: [] }
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
    search,
    back,
    deleteOne,
    edit,
  }
}
