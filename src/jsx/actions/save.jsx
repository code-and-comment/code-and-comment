import { route as _route } from 'preact-router'

import { getDB as _getDB, getObjectStore as _getObjectStore, addRecord as _addRecord } from '../db.jsx'
import { createViewUrl } from '../utils.jsx'


const actions = () => ({
  edit(state, event, route = _route) {
    route('/edit')
  },
  async save(
    state,
    title,
    getDB = _getDB,
    getObjectStore = _getObjectStore,
    addRecord = _addRecord
  ) {
    title = title.trim()
    if (title) {
      const db = await getDB()
      const objectStore = await getObjectStore(db)
      const parts = state.path.split('/')
      const viewUrl = createViewUrl(state.git, state.path, state.comments)
      // TODO add error process
      const event = await addRecord(objectStore, {
        title,
        git: state.git,
        path: state.path,
        lines: state.lines,
        comments: state.comments,
        repository: `${parts[1]}/${parts[2]}`,
        viewUrl
      })
      return {
        id: event.target.result,
        title,
        saved: true
      }
    }
  }
})


export default actions
