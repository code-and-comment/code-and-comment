import { route as _route } from 'preact-router'

import { State } from '../store'
import {
  getDB as _getDB,
  getRecord as _getRecord,
  getObjectStore as _getObjectStore,
} from '../db'
import {
  updateRepositories as _updateRepositories,
  updateCodeAndComments as _updateCodeAndComments
} from '../worker'
import {
  edit as _edit,
  getRepository as _getRepository,
} from '../utils'


export function edit(
  state: State,
  id: string | number,
  highlightLineNumber: string | number,
  route: Function = _route,
  // @ts-ignore
  requestIdleCallback: Function = window.requestIdleCallback,
  getDB: Function = _getDB,
  getObjectStore: Function = _getObjectStore,
  getRecord: Function = _getRecord,
  getRepository: Function = _getRepository,
  updateRepositories: Function = _updateRepositories,
  updateCodeAndComments: Function = _updateCodeAndComments,
): ReturnType<typeof _edit> {
  return _edit(
    id,
    highlightLineNumber,
    route,
    requestIdleCallback,
    getDB,
    getObjectStore,
    getRecord,
    getRepository,
    updateRepositories,
    updateCodeAndComments,
  )
}


export interface editFunc{
  (
    id: string | number,
    highlightLineNumber: string | number
  ): ReturnType<typeof edit>
}


export default {
  edit,
}
