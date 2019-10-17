import { h, Component } from 'preact'

import Line from './line'
import { scrollIntoView } from '../utils'


type Props = {
  id: number
  lines: string[]
  comments: Record<string, string>
  updateComment: Function
  editable: boolean
  hiddenSignal: boolean
  highlightLineNumber: number
}


type State = {
  markedLineNumber: number
}


class FileBody extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      markedLineNumber: 0
    }
    this.setMarkedLineNumber = this.setMarkedLineNumber.bind(this)
    this.scrollToMarkedLineNumber = this.scrollToMarkedLineNumber.bind(this)
  }

  componentWillReceiveProps({ id }: Props) {
    if (this.props.id !== id) {
      this.setState({ markedLineNumber: 0 })
    }
  }

  setMarkedLineNumber(event: Event) {
    event.stopPropagation()
    // @ts-ignore
    const markedLineNumber = event.currentTarget.dataset.lineNumber - 0
    this.setState({ markedLineNumber })
  }

  scrollToMarkedLineNumber() {
    scrollIntoView(this.state.markedLineNumber)
  }

  render({
    id,
    lines,
    comments,
    updateComment,
    editable,
    hiddenSignal,
    highlightLineNumber,
  }: Props, {
    markedLineNumber
  }: State) {
    return (
      <div className="cc-file-body">
        { lines.map((code, index) => {
          return (<Line
            id={ id }
            key={ index }
            code={ code }
            comment={ comments[index + ''] }
            index={ index }
            updateComment={ updateComment }
            editable={ editable }
            hiddenSignal={ hiddenSignal }
            isHighlight={ highlightLineNumber === (index + 1) }
            isMarked={ markedLineNumber === (index + 1) }
            setMarkedLineNumber={ this.setMarkedLineNumber }
            scrollToMarkedLineNumber={ this.scrollToMarkedLineNumber }
          />)
        }
        ) }
      </div>
    )
  }
}

export default FileBody
