import { h, Component, ComponentChildren, JSX } from 'preact'
import { connect } from 'unistore/preact'

import { State as S } from '../store'
import actions, { IClearPopup, ISetPopup } from '../actions/anchor'


const RE = /^#\/r\/(?<id>\d+)\/(?<number>\d+)/


export function getIdAndIndex(href: string): { id: number, index: number } | null {
  const result = RE.exec(href)
  return result ? { id: +result!.groups!.id, index: +result!.groups!.number - 1 } : null
}


interface Props {
  href: string
  children: ComponentChildren
  clearPopup: IClearPopup
  setPopup: ISetPopup
}


interface State {
  id: number | null
  index: number | null
}


class Anchor extends Component<Props, State> {
  onMouseEnter: (event: JSX.TargetedEvent<HTMLAnchorElement, Event>) => void
  onMouseLeave: (event: JSX.TargetedEvent<HTMLAnchorElement, Event>) => void

  constructor(props: Props) {
    super(props)
    const idAndIndex = getIdAndIndex(this.props.href)
    if (idAndIndex === null) {
      this.state = {
        id: null,
        index: null
      }
    }
    else {
      this.state = idAndIndex
    }
    this.onMouseEnter = this._onMouseEnter.bind(this)
    this.onMouseLeave = this._onMouseLeave.bind(this)
  }

  _onMouseEnter(event: JSX.TargetedEvent<HTMLAnchorElement, Event>) {
    event.stopPropagation()
    const { id, index } = this.state
    if (id !== null) {
      const { left, top, width } = event.currentTarget.getBoundingClientRect()
      this.props.setPopup(id, index, left + window.scrollX, top + window.scrollY, width)
    }
  }

  _onMouseLeave(event: JSX.TargetedEvent<HTMLAnchorElement, Event>) {
    event.stopPropagation()
    this.props.clearPopup()
  }

  render({ href, children }: Props, { id }: State) {
    if (id === null) {
      return <a target="_blank" rel="noopener noreferrer" href={ href }>{ children }</a>
    }
    return <a target="_blank" rel="noopener noreferrer" href={ href } onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseLeave }>{ children }</a>
  }
}


export default connect<Pick<Props, 'href' | 'children'>, State, S, Props>([], actions)(Anchor)
