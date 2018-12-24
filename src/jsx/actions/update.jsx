import { route as _route } from 'preact-router'

import { getDB, getObjectStore, putRecord } from '../db.jsx'


const actions = () => ({
  edit(state, event, route = _route) {
    route('/edit')
  },
  async update(state, title) {
    title = title.trim()
    if (title) {
      const db = await getDB()
      const objectStore = await getObjectStore(db)
      const parts = state.path.split('/')
      // TODO add error process
      await putRecord(objectStore, {
        id: state.id,
        title,
        git: state.git,
        path: state.path,
        lines: state.lines,
        comments: state.comments,
        repository: `${parts[1]}/${parts[2]}`,
      })
      return {
        title,
        updated: true
      }
    }
  }
})


export default actions
