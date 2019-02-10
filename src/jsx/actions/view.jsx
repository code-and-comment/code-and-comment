import { Base64 } from 'js-base64'
import { route as _route } from 'preact-router'

import { getDB as _getDB, getObjectStore as _getObjectStore, addRecord as _addRecord } from '../db.jsx'
import { saveCodeAndComment as _saveCodeAndComment } from '../utils.jsx'
import { updateRepositories as _updateRepositories } from '../worker.jsx'


async function edit(
  state,
  event,
  route = _route,
  saveCodeAndComment = _saveCodeAndComment,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  addRecord = _addRecord,
  setTimeout = window.setTimeout,
  updateRepositories = _updateRepositories
) {
  const title = 'New Code and Comment'
  const { git, path, lines, comments } = state
  const _state = { title, git, path, lines, comments }
  const id = await saveCodeAndComment(_state, getDB, getObjectStore, addRecord)
  updateRepositories()
  setTimeout(() => {
    route('/edit')
  }, 0)
  return { id }
}


async function getFile(state, paramJson, route = _route, fetch = window.fetch) {
  let param
  try {
    if (paramJson) {
      param = JSON.parse(Base64.decode(paramJson))
    }
  }
  catch(e) {
    return route('/start')
  }

  if (!param || !param.git || !param.path) {
    return route('/start')
  }

  const data = await fetch(param.git)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return null
    })

  if (data) {
    const { git, path, comments } = param
    const lines = Base64.decode(data.content).split('\n')
    return {
      git,
      path,
      lines,
      comments,
      networkError: false,
      urlError: false
    }
  }

  route('/start')
}


const actions = () => ({
  edit,
  getFile,
})


export default actions
