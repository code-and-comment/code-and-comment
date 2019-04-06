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
  getRepository,
} from '../utils.jsx'


export async function edit(
  state,
  id,
  highlightLineNumber,
  route = _route,
  setTimeout = window.setTimeout,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  getRecord = _getRecord,
  updateRepositories = _updateRepositories,
  updateCodeAndComments = _updateCodeAndComments,
) {
  id -= 0
  highlightLineNumber -= 0
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const request = await getRecord(objectStore, id)
  // TODO error process
  if (request.target.result) {
    const codeAndComment = request.target.result
    const repository = getRepository(codeAndComment.path)
    setTimeout(() => {
      updateRepositories()
      updateCodeAndComments(repository)
      route('/edit')
    })
    return {
      id: codeAndComment.id,
      highlightLineNumber,
      title: codeAndComment.title,
      git: codeAndComment.git,
      path: codeAndComment.path,
      lines: codeAndComment.lines,
      comments: codeAndComment.comments,
      codeAndComments: [],
      searchRepository: repository,
    }
  }
  route('/edit')
}

export default function actions() {
  return {
    edit,
  }
}
