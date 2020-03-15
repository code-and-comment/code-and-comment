import { h, FunctionalComponent } from 'preact'

import { Popup as P } from '../store'


interface LineProps {
  key: number
  lineNumber: number
  code: string
}


const Line: FunctionalComponent<LineProps> = function ({ lineNumber, code }: LineProps) {
  return (<div className="line">
    <span className="number">{ lineNumber }</span>
    <span className="content">{ code }</span>
  </div>)
}


interface Props {
  popup: P | null
}


const Popup: FunctionalComponent<Props> = function ({ popup }: Props) {
  if (popup) {
    const style = {
      top: popup.top - 300 + 'px',
      left: popup.left,
    }
    const lineNumbers = Object.keys(popup.lines).map((n) => {
      return +n
    }).sort()
    return (<div className="cc-popup" style={ style }>
      { lineNumbers.map((n) => <Line lineNumber={ n + 1 } code={ popup.lines[n + ''] } key={ n }  />) }
    </div>)
  }
  return null
}


export default Popup
