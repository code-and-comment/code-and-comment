import { route as _route } from 'preact-router'

import { createViewUrl } from '../utils.jsx'
import {
  getDB as _getDB,
  getObjectStore as _getObjectStore,
  getAllRecords as _getAllRecords,
  putRecord as _putRecord,
  deleteRecord as _deleteRecord
} from '../db.jsx'
import {
  transfer,
  updateCodeAndComment as _updateCodeAndComment,
  deleteOne as _deleteOne
} from '../utils.jsx'
import { updateRepositories as _updateRepositories } from '../worker.jsx'
import { initialState } from '../store.jsx'


async function updateComment(
  state,
  index,
  comment,
  updateCodeAndComment = _updateCodeAndComment,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  putRecord = _putRecord
) {
  let comments = state.comments
  comment = comment.trim()
  index += ''
  if (comments[index] === comment) {
    return
  }
  else if (comment === '') {
    if (comments[index]) {
      delete comments[index]
    }
    else {
      return
    }
  }
  else {
    comments[index] = comment
  }
  comments = Object.assign({}, comments)
  await updateCodeAndComment(
    Object.assign(state, { comments }),
    getDB,
    getObjectStore,
    putRecord
  )
  return { comments }
}


async function updateTitle(
  state,
  event,
  updateCodeAndComment = _updateCodeAndComment,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  putRecord = _putRecord
) {
  const title = event.target.value.trim()
  if (title) {
    await updateCodeAndComment(
      Object.assign(state, { title }),
      getDB,
      getObjectStore,
      putRecord
    )
    return { title }
  }
}


function fileUrl(state, event, route = _route) {
  route('/start')
}


function list(
  state,
  event,
  route = _route,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords,
  setTimeout = window.setTimeout
) {
  return transfer('/search_code_and_comment', route, getDB, getObjectStore, getAllRecords, setTimeout)
}


function publish(state, event, route = _route, location = window.location) {
  const viewUrl = createViewUrl(state.git, state.path, state.comments, location)
  route('/publish')
  return { viewUrl }
}


async function deleteOne(
  state,
  id,
  event,
  route = _route,
  getDB = _getDB,
  deleteOneFunc = _deleteOne,
  getObjectStore = _getObjectStore,
  deleteRecord = _deleteRecord,
  getAllRecords = _getAllRecords,
  updateRepositories = _updateRepositories,
) {
  const _initialState = initialState()
  await deleteOneFunc(id, getDB, getObjectStore, deleteRecord)
  updateRepositories(state)
  const { codeAndComments } = await transfer('/search_code_and_comment', route, getDB, getObjectStore, getAllRecords)
  _initialState.codeAndComments = codeAndComments
  return _initialState
}


const actions = () => ({
  updateComment,
  updateTitle,
  fileUrl,
  list,
  publish,
  deleteOne,
})


export default actions
