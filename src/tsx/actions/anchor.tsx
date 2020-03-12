import { BoundAction } from 'unistore'
import { getCurrentUrl } from 'preact-router'

import { CodeAndComment, State, Popup } from '../store'
import {
  getDB,
  getRecord,
  getObjectStore,
} from '../db'


const NUMBER_OF_LINES = 10
const EDIT_PATH = '/'


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
  if (getCurrentUrl() === EDIT_PATH) {
    return { popup: null }
  }
  const id = state.id
  const db = await getDB()
  // @ts-ignore
  const objectStore = await getObjectStore(db)
  const request = await getRecord(objectStore, id!)
  // TODO error process
  // @ts-ignore
  if (request.target.result) {
    const lines = {}
    // @ts-ignore
    const codeAndComment: CodeAndComment = request.target.result
    codeAndComment.lines.slice(index, index + NUMBER_OF_LINES).forEach((code, i) => {
      // @ts-ignore
      lines[index + i + ''] = code
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
