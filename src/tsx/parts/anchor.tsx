import { h, ComponentChildren } from 'preact'
import { connect } from 'unistore/preact'

import actions, { IClearPopup, ISetPopup } from '../actions/anchor'


const RE = /^#\/r\/(?<id>\d+)\/(?<number>\d+)/

export function getIdAndNumber(url: string): { id: string, number: string } | null {
  const result = RE.exec(url)
  return result ? result.groups as { id: string, number: string } : null
}

interface Props {
  href: string
  children: ComponentChildren
  clearPopup: IClearPopup
  setPopup: ISetPopup
}


function Anchor({ href, children }: Props) {
  return <a target="_blank" rel="noopener noreferrer" href={ href }>{ children }</a>
}


export default connect<{}, {}, {}, Props>([], actions)(Anchor)
