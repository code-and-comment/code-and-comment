import { route as _route } from 'preact-router'

import { createViewUrl } from '../utils.jsx'
import { initialState } from '../store.jsx'
import { getDB as _getDB, getObjectStore as _getObjectStore, getAllRecords as _getAllRecords, putRecord as _putRecord } from '../db.jsx'
import { transfer, updateCodeAndComment } from '../utils.jsx'


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
  async updateTitle(
    state,
    event,
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
  },
  fileUrl(state, event, route = _route) {
    route('/start')
    return initialState()
  },
  list(
    state,
    event,
    route = _route,
    getDB = _getDB,
    getObjectStore = _getObjectStore,
    getAllRecords = _getAllRecords
  ) {
    return transfer('/search_code_and_comment', route, getDB, getObjectStore, getAllRecords)
  },
  publish(state, event, route = _route, location = window.location) {
    const viewUrl = createViewUrl(state.git, state.path, state.comments, location)
    route('/publish')
    return { viewUrl }
  },
})


export default actions
