import { h, Component } from 'preact'


class Code extends Component {
  constructor(props) {
    super(props)
    this.keydownHandler = this.keydownHandler.bind(this)
  }

  keydownHandler(event) {
    event.stopPropagation()
    if (event.keyCode === 71) {
      this.props.scrollToMarkedLineNumber()
    }
    else if (event.keyCode === 77) {
      this.props.setMarkedLineNumber(event)
    }
  }

  mouseoverHandler(event) {
    event.stopPropagation()
    event.currentTarget.focus()
  }

  mouseoutHandler(event) {
    event.stopPropagation()
    event.currentTarget.blur()
  }

  render({
    lineNumber,
    content,
    edit,
    editable,
    isHidden,
    toggleHidden
  }) {
    const numberClassName = isHidden ? 'number hidden' : 'number'
    return (
      <div
        tabIndex={ lineNumber }
        data-line-number={ lineNumber }
        className="code"
        onClick={ editable ? edit : null }
        onKeydown={ this.keydownHandler }
        onMouseover={ this.mouseoverHandler }
        onMouseout={ this.mouseoutHandler }
      >
        <span
          className={ numberClassName }
          onClick={ toggleHidden }
        >
          { lineNumber }
        </span>
        <span className="content">
          { content }
        </span>
      </div>
    )
  }
}

export default Code
