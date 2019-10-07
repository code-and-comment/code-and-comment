import { h, Component } from 'preact'

import Line from './line'
import { scrollIntoView } from '../utils'


class FileBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markedLineNumber: 0
    }
    this.setMarkedLineNumber = this.setMarkedLineNumber.bind(this)
    this.scrollToMarkedLineNumber = this.scrollToMarkedLineNumber.bind(this)
  }

  componentWillReceiveProps({ id }) {
    if (this.props.id !== id) {
      this.setState({ markedLineNumber: 0 })
    }
  }

  setMarkedLineNumber(event) {
    event.stopPropagation()
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
  }, {
    markedLineNumber
  }) {
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
