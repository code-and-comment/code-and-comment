import { BoundAction } from 'unistore'

// import { State } from '../store'


export interface ISetPopup extends BoundAction {
  (
    number: number,
    left: number,
    top: number,
    width: number
  ): void
}


export interface IClearPopup extends BoundAction {
  (): void
}
