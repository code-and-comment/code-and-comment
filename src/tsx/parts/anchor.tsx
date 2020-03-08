import { h, Component, ComponentChildren } from 'preact'
import { connect } from 'unistore/preact'

import actions, { IClearPopup, ISetPopup } from '../actions/anchor'


interface Props {
  href: string
  children: ComponentChildren
  clearPopup: IClearPopup
  setPopup: ISetPopup
}


class Anchor extends Component<Props> {
  render({ href, children }: Props) {
    return <a target="_blank" rel="noopener noreferrer" href={ href }>{ children }</a>
  }
}


export default connect<{}, {}, {}, Props>([], actions)(Anchor)
