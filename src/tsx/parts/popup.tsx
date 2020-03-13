import { h, FunctionalComponent } from 'preact'

import { Popup as P, State as S } from '../store'


interface Props {
  popup: P
}


const Popup: FunctionalComponent<Props> = function ({ popup }: Props) {
  return <div>{ popup }</div>
}

export default connect<Props, {}, S, Props>([], {})(Popup)
