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
  getStateAfterDeleting,
} from '../utils'
import {
  updateRepositories as _updateRepositories,
  updateCodeAndComments as _updateCodeAndComments
} from '../worker'
import {
  initialState,
  State,
  CodeAndComment
} from '../store'


async function updateComment(
  state: State,
  index: number | string,
  comment: string,
  updateCodeAndComment: typeof _updateCodeAndComment = _updateCodeAndComment,
  updateCodeAndComments: typeof _updateCodeAndComments = _updateCodeAndComments,
  getDB: Function = _getDB,
  getObjectStore: Function = _getObjectStore,
  putRecord: Function = _putRecord
): Promise<Pick<State, 'comments'> | void> {
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
  state: State,
  event: Event,
  updateCodeAndComment: typeof _updateCodeAndComment = _updateCodeAndComment,
  updateCodeAndComments: typeof _updateCodeAndComments = _updateCodeAndComments,
  getDB: Function = _getDB,
  getObjectStore: Function = _getObjectStore,
  putRecord: Function = _putRecord
): Promise<Pick<State, 'title'> | void> {
  // @ts-ignore
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
  state: State,
  fileName: string,
  getDB: Function = _getDB,
  getObjectStore: Function = _getObjectStore,
  getAllRecords: Function = _getAllRecords,
  bound: typeof IDBKeyRange.bound = IDBKeyRange.bound
): Promise<void> {
  const codeAndComments = await search({}, getDB, getObjectStore, getAllRecords, bound, 'prev', null)
  const data = encodeURIComponent(JSON.stringify(codeAndComments))
  const elem = document.createElement('a')
  elem.href = `data:text/plain;charset=utf-8,${data}`
  elem.download = fileName
  elem.click()
}


async function importData(
  state: State,
  data: CodeAndComment[],
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  clearObjectStore = _clearObjectStore,
  putRecords = _putRecords,
  updateRepositories = _updateRepositories,
  // @ts-ignore
  requestIdleCallback = window.requestIdleCallback
): Promise<State> {
  const db = await getDB()
  // @ts-ignore
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
  state: State,
  url: string,
  route: typeof _route,
  getDB: Function,
  getObjectStore: Function,
  getAllRecords: Function,
  requestIdleCallback: Function,
  bound: typeof IDBKeyRange.bound
): Promise<Pick<State, 'highlightLineNumber' | 'codeAndComments' | 'searchRepository'>> {
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
  state: State,
  event: Event,
  route: typeof _route = _route,
  getDB: Function = _getDB,
  getObjectStore: Function = _getObjectStore,
  getAllRecords: Function = _getAllRecords,
  // @ts-ignore
  requestIdleCallback: Function = window.requestIdleCallback,
  bound: typeof IDBKeyRange.bound = IDBKeyRange.bound
): ReturnType<typeof _search> {
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
  state: State,
  event: Event,
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
  state: State,
  id: number,
  event: Event,
  getDB: Function = _getDB,
  deleteOneFunc: Function = _deleteOne,
  getObjectStore: Function = _getObjectStore,
  deleteRecord: Function = _deleteRecord,
  updateRepositories: typeof _updateRepositories = _updateRepositories,
  updateCodeAndComments: typeof _updateCodeAndComments = _updateCodeAndComments
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
  state: State,
  repository: string,
  updateCodeAndComments = _updateCodeAndComments
) {
  updateCodeAndComments(repository)
  return {
    searchRepository: repository
  }
}


export type setCodeAndCommentsFunc = (repository: string) => ReturnType<typeof setCodeAndComments>


// Set Code and Comment record for editing.
// This is used by CodeAndCommentSelector.
async function changeCodeAndComment(
  state: State,
  id: number,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getRecord = _getRecord
) {
  if (state.loading) {
    return
  }
  const db = await getDB()
  // @ts-ignore
  const objectStore = await getObjectStore(db)
  const request = await getRecord(objectStore, id)
  // TODO error process
  // @ts-ignore
  if (request.target.result) {
    // @ts-ignore
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


function setIsSelectorOpen(state: State, isSelectorOpen: boolean) {
  return { isSelectorOpen }
}


async function getFile(
  state: State,
  url: string,
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

  const request = state.token ? fetch(apiUrl, { headers: { Authorization: `token ${state.token}` } }) : fetch(apiUrl)

  const data = await request
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


function setToken(
  state: State,
  token: string
): Pick<State, 'token'> {
  return {
    token,
  }
}


export default {
  getFile,
  setLoading,
  setToken,
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
