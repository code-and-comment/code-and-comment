import { route as _route } from 'preact-router'

import { getDB, getObjectStore, getRecord, deleteRecord, getAllRecords } from '../db.jsx'


const actions = () => ({
  back(state, event, route = _route) {
    route('/edit')
  },
  home(state, event, route = _route) {
    route('/home')
  },
  async deleteOne(state, id) {
    const db = await getDB()
    const objectStore = await getObjectStore(db)
    await deleteRecord(objectStore, id) 
    const codeAndComments = await getAllRecords(objectStore) 
    return { codeAndComments }
  },
  async edit(state, id, event, route = _route) {
    const db = await getDB()
    const objectStore = await getObjectStore(db)
    const request = await getRecord(objectStore, id)
    if (request.target.result) {
      const codeAndComment = request.target.result
      route('/edit')
      return {
        id: codeAndComment.id,
        title: codeAndComment.title,
        git: codeAndComment.git,
        path: codeAndComment.path,
        lines: codeAndComment.lines,
        comments: codeAndComment.comments,
      }
    }
  },
})


export default actions
