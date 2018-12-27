import { route as _route } from 'preact-router'

import { createViewUrl } from '../utils.jsx'
import { initialState } from '../store.jsx'
import { getDB as _getDB, getObjectStore as _getObjectStore, getAllRecords as _getAllRecords } from '../db.jsx'


const actions = () => ({
  updateComment({ comments }, index, comment) {
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
    return {
      comments: Object.assign({}, comments)
    }
  },
  fileUrl(state, event, route = _route) {
    route('/start')
    return initialState()
  },
  async list(
    state,
    event,
    route = _route,
    getDB = _getDB,
    getObjectStore = _getObjectStore,
    getAllRecords = _getAllRecords
  ) {
    route('/search_code_and_comment')
    const db = await getDB()
    const objectStore = await getObjectStore(db)
    const codeAndComments = await getAllRecords(objectStore)
    return { codeAndComments }
  },
  publish(state, event, route = _route, location = window.location) {
    const viewUrl = createViewUrl(state.git, state.path, state.comments, location)
    route('/publish')
    return { viewUrl }
  },
  save(state, event, route = _route) {
    route('/save')
    return { saved: false }
  },
  update(state, event, route = _route) {
    route('/update')
    return { updated: false }
  }
})


export default actions
