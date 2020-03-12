import { h, Component, ComponentChildren, JSX } from 'preact'
import { connect } from 'unistore/preact'

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
    // @ts-ignore
    const { lineNumber } = event.currentTarget.closest('.cc-line').firstChild.dataset
    const { left, top, width } = event.currentTarget.getBoundingClientRect()
    this.props.setPopup(+lineNumber - 1, left, top, width)
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


export default connect<{}, State, {}, Props>([], actions)(Anchor)
