import { h, Component } from 'preact'

import markdown from '../markdown.jsx'
import CommentList from './comment-list.jsx'
import Button from './button.jsx'


function Code({
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
      className="code"
      onClick={ editable ? edit : null }
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


class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: props.comment,
      isPreview: false,
    }
    this.cancel = this.cancel.bind(this)
    this.save = this.save.bind(this)
    this.delete = this.delete.bind(this)
    this.setComment = this.setComment.bind(this)
    this.togglePreview = this.togglePreview.bind(this)
    this.copyLink = this.copyLink.bind(this)
  }

  componentWillReceiveProps({ comment }) {
    this.setState({
      comment,
      isPreview: false,
    })
  }

  setComment(event) {
    this.setState({
      comment: event.target.value
    })
  }

  cancel() {
    this.setState({
      comment: this.props.comment
    })
    this.props.cancel()
  }

  save() {
    this.props.save(this.state.comment)
  }

  delete() {
    this.setState({
      comment: ''
    })
    this.props.delete()
  }

  togglePreview(event) {
    event.stopPropagation()
    this.setState({ isPreview: !this.state.isPreview })
  }

  copyLink() {
    const { id, lineNumber } = this.props
    const link = `#/r/${id}/${lineNumber}`
    window.navigator.clipboard.writeText(link)
  }

  render({ isEditing, setHighlightLineNumber }, { comment, isPreview }) {
    if (comment && !isEditing) {
      return (
        <div className="comment">
          <div className="display-markdown" dangerouslySetInnerHTML={ { __html: markdown(comment) } } />
          <CommentList handler={ setHighlightLineNumber } />
        </div>
      )
    }
    else if (isEditing) {
      return (
        <div className="comment">
          <div className="input">
            <div className="tab-navigator">
              <div className="tabs">
                <span className={ isPreview ? 'tab' : 'tab selected' } onClick={ isPreview && this.togglePreview }>Edit</span>
                <span className={ isPreview ? 'tab selected' : 'tab' } onClick={ !isPreview && this.togglePreview }>Preview</span>
              </div>
            </div>
            { !isPreview && <textarea onChange={ this.setComment }>{ comment }</textarea> }
            { isPreview && <div className="display-markdown" dangerouslySetInnerHTML={ { __html: markdown(comment) } } /> }
          </div>
          <div className="controls">
            <Button onClick={ this.cancel }>Cancel</Button>
            { ' ' }
            <Button onClick={ this.save }>Save</Button>
            { ' ' }
            <Button onClick={ this.delete }>Delete</Button>
            { ' ' }
            <Button onClick={ this.copyLink }>Link</Button>
          </div>
        </div>
      )
    }
  }
}


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

  shouldComponentUpdate({ id, index, code, comment, isHighlight }, { isEditing, isHidden }) {
    return !(this.props.id === id
        && this.props.index === index
        && this.props.code === code
        && this.props.comment === comment
        && this.props.isHighlight === isHighlight
        && this.state.isEditing === isEditing
        && isEditing === false
        && this.state.isHidden === isHidden
        && isHidden === false)
  }

  componentWillReceiveProps({ id }) {
    if (this.props.id !== id) {
      this.setState({
        isEditing: false,
        isHidden: false
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
    this.setState({ isEditing: false })
    this.props.updateComment(index, comment)
  }

  delete(index) {
    this.setState({ isEditing: false })
    this.props.updateComment(index, '')
  }

  render({ id, index, code, comment, editable, isHighlight, setHighlightLineNumber }, { isEditing, isHidden }) {
    const className = isHighlight ? 'cc-line cc-highlight' : 'cc-line'
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
        />
        { !isHidden && <Comment
          id={ id }
          lineNumber={ lineNumber }
          comment={ comment || '' }
          isEditing={ isEditing }
          cancel={ this.cancel }
          save={ this.save }
          delete={ this.delete }
          setHighlightLineNumber={ setHighlightLineNumber }
        /> }
      </div>
    )
  }
}


export default Line
