import { Base64 } from 'js-base64'
import { route as _route } from 'preact-router'

import {
  addRecord as _addRecord,
  getDB as _getDB,
  getRecord as _getRecord,
  getObjectStore as _getObjectStore,
  getAllRecords as _getAllRecords,
  putRecord as _putRecord,
  putRecords as _putRecords,
  clearObjectStore as _clearObjectStore,
  deleteRecord as _deleteRecord
} from '../db'
import {
  getRepository,
  search,
  saveCodeAndComment as _saveCodeAndComment,
  updateCodeAndComment as _updateCodeAndComment,
  deleteOne as _deleteOne,
  getStateAfterDeleting
} from '../utils'
import {
  updateRepositories as _updateRepositories,
  updateCodeAndComments as _updateCodeAndComments
} from '../worker'
import { initialState, State } from '../store'


async function updateComment(
  state: State,
  index: number | string,
  comment: string,
  updateCodeAndComment: Function = _updateCodeAndComment,
  updateCodeAndComments: Function = _updateCodeAndComments,
  getDB: Function = _getDB,
  getObjectStore: Function = _getObjectStore,
  putRecord: Function = _putRecord
): Pick<State, 'comments'> | void {
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


async function exportData(
  state,
  fileName,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords,
  bound = IDBKeyRange.bound
) {
  const codeAndComments = await search({}, getDB, getObjectStore, getAllRecords, bound, 'prev', true)
  const data = encodeURIComponent(JSON.stringify(codeAndComments))
  const elem = document.createElement('a')
  elem.href = `data:text/plain;charset=utf-8,${data}`
  elem.download = fileName
  elem.click()
}


async function importData(
  state,
  data,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  clearObjectStore = _clearObjectStore,
  putRecords = _putRecords,
  updateRepositories = _updateRepositories,
  // @ts-ignore
  requestIdleCallback = window.requestIdleCallback
) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  await clearObjectStore(objectStore)
  await putRecords(objectStore, data)
  window.alert('Importing data is complete.')
  requestIdleCallback(() => {
    updateRepositories()
  })
  return initialState()
}


async function _search(
  state,
  url,
  route,
  getDB,
  getObjectStore,
  getAllRecords,
  requestIdleCallback,
  bound
) {
  const repository = getRepository(state.path)
  const conditions = { repository }
  const codeAndComments = await search(conditions, getDB, getObjectStore, getAllRecords, bound)
  requestIdleCallback(() => {
    route(url)
  })
  return {
    highlightLineNumber: 0,
    codeAndComments,
    searchRepository: repository
  }
}


function searchCodeAndComment(
  state,
  event,
  route = _route,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getAllRecords = _getAllRecords,
  // @ts-ignore
  requestIdleCallback = window.requestIdleCallback,
  bound = IDBKeyRange.bound
) {
  event.stopPropagation()
  return _search(
    state,
    '/search_code_and_comment',
    route,
    getDB,
    getObjectStore,
    getAllRecords,
    requestIdleCallback,
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
  // @ts-ignore
  requestIdleCallback = window.requestIdleCallback,
  bound = IDBKeyRange.bound
) {
  event.stopPropagation()
  return _search(
    state,
    '/search_comment',
    route,
    getDB,
    getObjectStore,
    getAllRecords,
    requestIdleCallback,
    bound
  )
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
  event.stopPropagation()
  await deleteOneFunc(id, getDB, getObjectStore, deleteRecord)
  updateRepositories()
  updateCodeAndComments(state.searchRepository)
  return getStateAfterDeleting(state, state.codeAndComments)
}


// Select repository for displaying Code and Comment list in CodeAndCommentSelector.
// This is used by RepositorySelector.
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


// Set Code and Comment record for editing.
// This is used by CodeAndCommentSelector.
async function changeCodeAndComment(
  state,
  id,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getRecord = _getRecord
) {
  if (state.loading) {
    return
  }
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const request = await getRecord(objectStore, id)
  // TODO error process
  if (request.target.result) {
    const codeAndComment = request.target.result
    return {
      id: codeAndComment.id,
      highlightLineNumber: 0,
      title: codeAndComment.title,
      git: codeAndComment.git,
      path: codeAndComment.path,
      lines: codeAndComment.lines,
      comments: codeAndComment.comments,
    }
  }
}


function setIsSelectorOpen(state, isSelectorOpen) {
  return { isSelectorOpen }
}


async function getFile(
  state: State,
  url,
  fetch = window.fetch,
  // @ts-ignore
  requestIdleCallback = window.requestIdleCallback,
  saveCodeAndComment = _saveCodeAndComment,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  addRecord = _addRecord,
  updateRepositories = _updateRepositories,
  updateCodeAndComments = _updateCodeAndComments,
) {
  url = url.trim()
  const re = /^https:\/\/github.com\/(.+)\/blob\/([^/]+)\/(.+)/
  const matches = url.match(re)

  if (!matches) {
    return {
      loading: false,
      networkError: false,
      urlError: true
    }
  }

  const apiUrl = `https://api.github.com/repos/${matches[1]}/contents/${matches[3]}?ref=${matches[2]}`

  const data = await fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return null
    })

  if (data && data.type === 'file') {
    const git = data._links.git
    const path = url.substring(18)
    const searchRepository = getRepository(path)
    const lines = Base64.decode(data.content).split('\n')
    const comments = {}
    const title = 'New Code and Comment'
    const state = { title, git, path, lines, comments }
    // @ts-ignore
    const id = await saveCodeAndComment(state, getDB, getObjectStore, addRecord)
    requestIdleCallback(function() {
      updateRepositories()
      updateCodeAndComments(searchRepository)
    })
    return {
      id,
      title,
      git,
      path,
      lines,
      comments,
      searchRepository,
      highlightLineNumber: 0,
      loading: false,
      networkError: false,
      urlError: false
    }
  }

  return {
    loading: false,
    networkError: true,
    urlError: false
  }
}


function setLoading(): Pick<State, 'loading'> {
  return {
    loading: true,
  }
}


function clearErrors(): Pick<State, 'networkError' | 'urlError'> {
  return {
    networkError: false,
    urlError: false
  }
}


export default function actions() {
  return {
    getFile,
    setLoading,
    updateComment,
    updateTitle,
    searchCodeAndComment,
    searchComment,
    deleteOne,
    setCodeAndComments,
    changeCodeAndComment,
    setIsSelectorOpen,
    clearErrors,
    exportData,
    importData
  }
}