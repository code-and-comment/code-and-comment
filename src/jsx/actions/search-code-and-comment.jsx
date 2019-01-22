import { route as _route } from 'preact-router'

import {
  getDB as _getDB,
  getObjectStore as _getObjectStore,
  getRecord as _getRecord,
  deleteRecord as _deleteRecord,
  getAllRecords as _getAllRecords
} from '../db.jsx'
import { deleteOne as _deleteOne } from '../utils.jsx'


async function search(
  state,
  conditions,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords,
  bound = IDBKeyRange.bound
) {
  let { repository } = conditions
  repository = repository.trim()
  let indexName
  if (repository) {
    indexName = 'repository'
  }
  else {
    indexName = 'updated_at'
  }
  let range
  if (repository) {
    range = bound([repository, new Date(0)], [repository, new Date()])
  }
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const codeAndComments = await getAllRecords(objectStore, indexName, range)
  return { codeAndComments }
}


function back(state, event, route = _route) {
  route('/edit')
}


function home(state, event, route = _route) {
  route('/home')
}


function deleteOne(
  state,
  id,
  event,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  deleteRecord = _deleteRecord,
  getAllRecords = _getAllRecords
) {
  return _deleteOne(id, getDB, getObjectStore, deleteRecord, getAllRecords)
}


async function edit(
  state,
  id,
  event,
  route = _route,
  setTimeout = window.setTimeout,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getRecord = _getRecord
) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const request = await getRecord(objectStore, id)
  if (request.target.result) {
    const codeAndComment = request.target.result
    setTimeout(() => {
      route('/edit')
    })
    return {
      id: codeAndComment.id,
      title: codeAndComment.title,
      git: codeAndComment.git,
      path: codeAndComment.path,
      lines: codeAndComment.lines,
      comments: codeAndComment.comments,
    }
  }
}


const actions = () => ({
  search,
  back,
  home,
  deleteOne,
  edit,
})


export default actions
