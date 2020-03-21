import { h, FunctionalComponent } from 'preact'
import { connect } from 'unistore/preact'

import { Popup as P } from '../store'


const BORDER = 1
const PADDING = 18
const LINE = 18
const MARGIN = 27

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
    const top = 2 * BORDER + 2 * PADDING + LINE * Object.keys(popup.lines).length + MARGIN
    const style = {
      top: `${ popup.top - top }px`,
      left: `${ popup.left }px`,
    }
    const lineNumbers = Object.keys(popup.lines).map((n) => +n).sort((a, b) => a - b)
    return (<div className="cc-popup" style={ style }>
      { lineNumbers.map((n) => <Line lineNumber={ n + 1 } code={ popup.lines[n + ''] } key={ n }  />) }
    </div>)
  }
  return null
}


export default connect<{}, {}, {}, Props>(['popup'], {})(Popup)
