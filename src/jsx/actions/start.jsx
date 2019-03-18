import { Base64 } from 'js-base64'
import { route as _route } from 'preact-router'

import { getDB as _getDB, getObjectStore as _getObjectStore, addRecord as _addRecord } from '../db.jsx'
import { saveCodeAndComment as _saveCodeAndComment } from '../utils.jsx'
import { updateRepositories as _updateRepositories } from '../worker.jsx'


function back(state, event, route = _route) {
  route('/edit')
}


async function getFile(
  state,
  url,
  route = _route,
  fetch = window.fetch,
  setTimeout = window.setTimeout,
  saveCodeAndComment = _saveCodeAndComment,
  getDB = _getDB,
  getObjectStore = _getObjectStore,
  addRecord = _addRecord,
  updateRepositories = _updateRepositories
) {
  url = url.trim()
  const re = /^https:\/\/github.com\/(.+)\/blob\/([^/]+)\/(.+)/
  const matches = url.match(re)

  if (!matches) {
    return {
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
    const lines = Base64.decode(data.content).split('\n')
    const comments = {}
    const title = 'New Code and Comment'
    const state = { title, git, path, lines, comments }
    const id = await saveCodeAndComment(state, getDB, getObjectStore, addRecord)
    updateRepositories()
    setTimeout(() => {
      route('/edit')
    }, 0)
    return {
      id,
      title,
      git,
      path,
      lines,
      comments,
      codeAndComments: [],
      networkError: false,
      urlError: false
    }
  }

  return {
    networkError: true,
    urlError: false
  }
}


export default function actions() {
  return {
    back,
    getFile,
  }
}
