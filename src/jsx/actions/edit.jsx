import { route as _route } from 'preact-router'

import { createViewUrl } from '../utils.jsx'
import {
  getDB as _getDB,
  getRecord as _getRecord,
  getObjectStore as _getObjectStore,
  getAllRecords as _getAllRecords,
  putRecord as _putRecord,
  deleteRecord as _deleteRecord
} from '../db.jsx'
import {
  getRepository,
  search,
  updateCodeAndComment as _updateCodeAndComment,
  deleteOne as _deleteOne,
  getStateAfterDeleting
} from '../utils.jsx'
import {
  updateRepositories as _updateRepositories,
  updateCodeAndComments as _updateCodeAndComments
} from '../worker.jsx'


async function updateComment(
  state,
  index,
  comment,
  updateCodeAndComment = _updateCodeAndComment,
  updateCodeAndComments = _updateCodeAndComments,
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
  const repository = getRepository(state.path)
  if (state.searchRepository === repository) {
    updateCodeAndComments(state.searchRepository)
  }
  return { comments }
}


async function updateTitle(
  state,
  event,
  updateCodeAndComment = _updateCodeAndComment,
  updateCodeAndComments = _updateCodeAndComments,
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
    const repository = getRepository(state.path)
    if (state.searchRepository === repository) {
      updateCodeAndComments(state.searchRepository)
    }
    return { title }
  }
}


function fileUrl(state, event, route = _route) {
  route('/start')
}


async function _search(
  state,
  url,
  route,
  getDB,
  getObjectStore,
  getAllRecords,
  setTimeout,
  bound
) {
  const repository = getRepository(state.path)
  const conditions = { repository }
  const codeAndComments = await search(conditions, getDB, getObjectStore, getAllRecords, bound)
  setTimeout(() => {
    route(url)
  }, 0)
  return {
    codeAndComments,
    searchRepository: repository
  }
}


function list(
  state,
  event,
  route = _route,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords,
  setTimeout = window.setTimeout,
  bound = window.IDBKeyRange.bound
) {
  return _search(
    state,
    '/search_code_and_comment',
    route,
    getDB,
    getObjectStore,
    getAllRecords,
    setTimeout,
    bound
  )
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
  return _search(
    state,
    '/search_comment',
    route,
    getDB,
    getObjectStore,
    getAllRecords,
    setTimeout,
    bound
  )
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
  getDB = _getDB,
  deleteOneFunc = _deleteOne,
  getObjectStore = _getObjectStore,
  deleteRecord = _deleteRecord,
  updateRepositories = _updateRepositories,
  updateCodeAndComments = _updateCodeAndComments
) {
  await deleteOneFunc(id, getDB, getObjectStore, deleteRecord)
  updateRepositories()
  updateCodeAndComments(state.searchRepository)
  return getStateAfterDeleting(state, state.codeAndComments)
}


async function setCodeAndComments(
  state,
  repository,
  updateCodeAndComments = _updateCodeAndComments
) {
  updateCodeAndComments(repository)
  return {
    searchRepository: repository
  }
}


async function changeCodeAndComment(
  state,
  id,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getRecord = _getRecord
) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const request = await getRecord(objectStore, id)
  // TODO error process
  if (request.target.result) {
    const codeAndComment = request.target.result
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


export default function actions() {
  return {
    updateComment,
    updateTitle,
    fileUrl,
    list,
    searchComment,
    publish,
    deleteOne,
    setCodeAndComments,
    changeCodeAndComment,
  }
}
