import { route as _route } from 'preact-router'
import { BoundAction } from 'unistore'

import {
  getDB as _getDB,
  getRecord as _getRecord,
  getObjectStore as _getObjectStore,
  deleteRecord as _deleteRecord,
  getAllRecords as _getAllRecords
} from '../db'
import {
  Conditions,
  edit as _edit,
  getRepository as _getRepository,
  deleteOne as _deleteOne,
  search as _search,
  getStateAfterDeleting,
  setLines
} from '../utils'
import {
  updateRepositories as _updateRepositories,
  updateCodeAndComments as _updateCodeAndComments
} from '../worker'
import {
  State,
} from '../store'


export interface ISearch extends BoundAction {
  (
    conditions: Conditions
  ): void
}


async function search(
  state: State,
  conditions: Conditions,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords
) {
  let searchRepository = ''
  if (conditions.repository) {
    searchRepository = conditions.repository
  }
  const codeAndComments = await _search(conditions, getDB, getObjectStore, getAllRecords, IDBKeyRange.bound, 'prev', setLines)
  return {
    codeAndComments,
    searchRepository
  }
}


export interface IBack extends BoundAction {
  (
    event: Event
  ): void
}


function back(
  state: State,
  event: Event,
  route = _route,
  // @ts-ignore
  requestIdleCallback = window.requestIdleCallback
) {
  event.stopPropagation()
  if (state.id) {
    return edit(
      state,
      state.id,
      0,
      event
    )
  }
  requestIdleCallback(() => {
    route('/')
  })
  return {
    codeAndComments: [],
    searchRepository: ''
  }
}


export interface IDeleteOne extends BoundAction {
  (
    id: number,
    event: Event
  ): void
}


async function deleteOne(
  state: State,
  id: number,
  event: Event,
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


export interface IEdit extends BoundAction {
  (
    id: number,
    highlightLineNumber: number,
    event: Event,
  ): void
}


function edit(
  state: State,
  id: number,
  highlightLineNumber: number,
  event: Event,
  route = _route,
  // @ts-ignore
  requestIdleCallback = window.requestIdleCallback,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getRecord = _getRecord,
  getRepository = _getRepository,
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
    getRepository,
    updateRepositories,
    updateCodeAndComments,
  )
}


export default {
  search,
  back,
  deleteOne,
  edit,
}
