import { BoundAction } from 'unistore'

import { CodeAndComment, State, Popup } from '../store'
import {
  getDB,
  getRecord,
  getObjectStore,
} from '../db'


const NUMBER_OF_LINES = 10


export interface ISetPopup extends BoundAction {
  (
    index: number,
    left: number,
    top: number,
    width: number
  ): void
}


// index is index of lines
// left, top and width are anchor
async function setPopup(
  state: State,
  index: number,
  left: number,
  top: number,
  width: number
): Promise<{ popup: Popup | null }> {
  const id = state.id
  if (id === null) {
    return { popup: null }
  }
  const db = await getDB()
  // @ts-ignore
  const objectStore = await getObjectStore(db)
  const request = await getRecord(objectStore, id)
  // TODO error process
  // @ts-ignore
  if (request.target.result) {
    const lines = {}
    // @ts-ignore
    const codeAndComment: CodeAndComment = request.target.result
    codeAndComment.lines.slice(index, NUMBER_OF_LINES).forEach((code, index) => {
      // @ts-ignore
      lines[index + NUMBER_OF_LINES + ''] = code
    })
    return {
      popup: {
        left,
        top,
        width,
        lines
      }
    }
  }
  return { popup: null }
}


export interface IClearPopup extends BoundAction {
  (): void
}


function clearPopup() {
  return { popup: null }
}


export default {
  setPopup,
  clearPopup
}
