import { route as _route } from 'preact-router'

import { getDB, getObjectStore, getAllRecords } from '../db.jsx'


const actions = () => ({
  async search_code_and_comment(state, event, route = _route) {
    route('/search_code_and_comment')
    const db = await getDB()
    const objectStore = await getObjectStore(db)
    const codeAndComments = await getAllRecords(objectStore) 
    return { codeAndComments }
  }
})


export default actions
