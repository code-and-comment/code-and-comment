import { Component, VNode, ComponentConstructor } from 'preact'


type Props = {
  type?: string
  trim?: boolean
  wrap?: boolean
  markup: string
  components?: Record<string, ComponentConstructor<any, any>> 
  onError?: Function
  'allow-scripts'?: boolean
}


class Markup extends Component<Props, {}> {
  render(props: Props, {}): VNode
}


export default Markup
