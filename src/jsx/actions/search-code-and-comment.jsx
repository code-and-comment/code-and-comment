import { route as _route } from 'preact-router'

import { getDB, getObjectStore, deleteRecord, getAllRecords } from '../db.jsx'


const actions = () => ({
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
    route('/edit')
  },
})


export default actions
