import { h, Component } from 'preact'

import Code from './code.jsx'
import Comment from './comment.jsx'


class Line extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      isHidden: false
    }
    this.edit = this.edit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.save = this.save.bind(this, props.index)
    this.delete = this.delete.bind(this, props.index)
    this.toggleHidden = this.toggleHidden.bind(this)
  }

  shouldComponentUpdate({ id, index, code, comment, isHighlight, isMarked }, { isEditing, isHidden }) {
    return !(this.props.id === id
        && this.props.index === index
        && this.props.code === code
        && this.props.comment === comment
        && this.props.isHighlight === isHighlight
        && this.props.isMarked === isMarked
        && this.state.isEditing === isEditing
        && isEditing === false
        && this.state.isHidden === isHidden
        && isHidden === false)
  }

  componentWillReceiveProps({ id, comment, hiddenSignal }) {
    if (this.props.id !== id) {
      this.setState({
        isEditing: false,
        isHidden: false
      })
    }
    if (comment && hiddenSignal) {
      this.setState({
        isHidden: true
      })
    }
  }

  toggleHidden(event) {
    event.stopPropagation()
    this.setState({ isHidden: !this.state.isHidden })
  }

  edit() {
    if (window.getSelection().isCollapsed) {
      this.setState({ isEditing: true })
    }
  }

  cancel() {
    this.setState({ isEditing: false })
  }

  save(index, comment) {
    this.props.updateComment(index, comment)
    window.requestIdleCallback(() => {
      this.setState({ isEditing: false })
    })
  }

  delete(index) {
    this.props.updateComment(index, '')
    window.requestIdleCallback(() => {
      this.setState({ isEditing: false })
    })
  }

  render({
    id,
    index,
    code,
    comment,
    editable,
    isHighlight,
    isMarked,
    setMarkedLineNumber,
    scrollToMarkedLineNumber,
  },
  {
    isEditing,
    isHidden
  }) {
    let className = 'cc-line'
    if (isMarked) {
      className += ' cc-marked'
    }
    else if (isHighlight) {
      className += ' cc-highlight'
    }
    const lineNumber = index + 1
    return (
      <div className={ className }>
        <Code
          lineNumber={ lineNumber }
          content={ code }
          edit={ this.edit }
          editable={ editable }
          isHidden={ isHidden }
          toggleHidden={ comment && this.toggleHidden }
          setMarkedLineNumber={ setMarkedLineNumber }
          scrollToMarkedLineNumber={ scrollToMarkedLineNumber }
        />
        { !isHidden && <Comment
          id={ id }
          lineNumber={ lineNumber }
          comment={ comment || '' }
          isEditing={ isEditing }
          cancel={ this.cancel }
          save={ this.save }
          delete={ this.delete }
        /> }
      </div>
    )
  }
}


export default Line
