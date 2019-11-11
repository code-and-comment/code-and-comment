import {
  getDB,
  getObjectStore,
  getAllRecords
} from './db'
import { search } from './utils'


self.addEventListener('message', async function(event) {
  const repository = event.data
  const codeAndComments = await search({ repository }, getDB, getObjectStore, getAllRecords)
  self.postMessage(codeAndComments)
}, false)
