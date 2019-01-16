import { route as _route } from 'preact-router'

import { getDB as _getDB, getObjectStore as _getObjectStore, addRecord as _addRecord } from '../db.jsx'
import { saveCodeAndComment } from '../utils.jsx'


const actions = () => ({
  edit(state, event, route = _route) {
    route('/edit')
  },
  save(
    state,
    title,
    getDB = _getDB,
    getObjectStore = _getObjectStore,
    addRecord = _addRecord
  ) {
    title = title.trim()
    if (title) {
      return saveCodeAndComment(state, title, getDB, getObjectStore, addRecord)
    }
  }
})


export default actions
