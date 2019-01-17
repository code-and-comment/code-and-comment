import { route as _route } from 'preact-router'

import { getDB as _getDB, getObjectStore as _getObjectStore, putRecord as _putRecord } from '../db.jsx'
import { updateCodeAndComment } from '../utils.jsx'


const actions = () => ({
  edit(state, event, route = _route) {
    route('/edit')
  },
  async update(state, title, getDB = _getDB, getObjectStore = _getObjectStore, putRecord = _putRecord) {
    title = title.trim()
    if (title) {
      return updateCodeAndComment(state, title, getDB, getObjectStore, putRecord)
    }
  }
})


export default actions
