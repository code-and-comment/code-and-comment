import { h, Component } from 'preact'

import markdown from '../markdown.jsx'
import CommentList from './comment-list.jsx'
import Button from './button.jsx'


function Code({
  number,
  content,
  edit,
  editable,
  isHidden,
  isHighlight,
  toggleHidden
}) {
  const numberClassName = isHidden ? 'number hidden' : 'number'
  const contentClassName = isHighlight ? 'content highlight' : 'content'
  return (
    <div
      className="code"
      onClick={ editable ? edit : null }
    >
      <span
        className={ numberClassName }
        onClick={ toggleHidden }
      >
        { number + 1 }
      </span>
      <span className={ contentClassName }>
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

  shouldComponentUpdate({ index, code, comment, isHighlight }, { isEditing, isHidden }) {
    return !(this.props.index === index
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

  render({ index, code, comment, editable, isHighlight, setHighlightLineNumber }, { isEditing, isHidden }) {
    return (
      <div className="cc-line">
        <Code
          number={ index }
          content={ code }
          edit={ this.edit }
          editable={ editable }
          isHidden={ isHidden }
          isHighlight={ isHighlight }
          toggleHidden={ comment && this.toggleHidden }
        />
        { !isHidden && <Comment
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
