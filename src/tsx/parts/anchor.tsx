import { h, Component, ComponentChildren } from 'preact'


interface Props {
  href: string
  children: ComponentChildren
}


class Anchor extends Component<Props> {
  render({ href, children }: Props) {
    return <a target="_blank" rel="noopener noreferrer" href={ href }>{ children }</a>
  }
}


export default Anchor
