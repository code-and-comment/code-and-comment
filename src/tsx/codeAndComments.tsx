import {
  getDB,
  getObjectStore,
  getAllRecords
} from './db'
import { search } from './utils'


self.addEventListener('message', async function(event: MessageEvent) {
  const repository = event.data
  const codeAndComments = await search({ repository }, getDB, getObjectStore, getAllRecords)
  const w: Worker = self as any
  w.postMessage(codeAndComments)
}, false)
