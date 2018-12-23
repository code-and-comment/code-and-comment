import { Base64 } from 'js-base64'
import { route as _route } from 'preact-router'

import { initialState } from '../store.jsx'
import { getDB, getObjectStore, getAllRecords } from '../db.jsx'


const actions = () => ({
  updateComment({comments}, index, comment) {
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
  async list(state, event, route = _route) {
    route('/search_code_and_comment')
    const db = await getDB()
    const objectStore = await getObjectStore(db)
    const codeAndComments = await getAllRecords(objectStore)
    return { codeAndComments }
  },
  publish(state, event, route = _route, location = window.location) {
    const data = {
      git: state.git,
      path: state.path,
      comments: state.comments,
    }
    const data_string = Base64.encodeURI(JSON.stringify(data))
    const viewUrl = `${location.origin}${location.pathname}#/view?data=${data_string}`
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
