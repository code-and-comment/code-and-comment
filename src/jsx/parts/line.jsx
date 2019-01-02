import { h, Component } from 'preact'
import marked from 'marked'

import CommentList from '../parts/comment-list.jsx'
import Button from '../parts/button.jsx'

marked.setOptions({
  sanitize: true
})


function Code({ number, content, edit, editable, isHidden, toggleHidden }) {
  const className = isHidden ? 'number hidden' : 'number'
  return (
    <div className="code">
      <span
        className={ className }
        onClick={ toggleHidden }
      >
        { number + 1 }
      </span>
      <span
        className="content"
        onClick={ editable ? edit : null }
      >
        { content }
      </span>
    </div>
  )
}


class Comment extends Component {
  constructor(props) {
    super(props)
    this.save = this.save.bind(this)
    this.textareaRef = this.textareaRef.bind(this)
  }

  textareaRef(textarea) {
    this.textarea = textarea
  }

  save() {
    const comment = this.textarea.value
    this.props.save(comment)
  }

  render({ comment, isEditing, cancel }) {
    if (comment && !isEditing) {
      const _comment = []
      comment.split('\n').forEach((c) => {
        _comment.push(c)
        _comment.push(<br/>)
      })
      _comment.pop()
      return (
        <div className="comment">
          <div className="display-markdown" dangerouslySetInnerHTML={ { __html: marked(comment) } } />
          <CommentList />
        </div>
      )
    }
    else if (isEditing) {
      return (
        <div className="comment">
          <div className="input">
            <textarea ref={ this.textareaRef }>{ comment }</textarea>
          </div>
          <div className="controls">
            <Button onClick={ cancel }>Cancel</Button>
            { ' ' }
            <Button onClick={ this.save }>Save</Button>
            { ' ' }
            <Button onClick={ this.props.delete }>Delete</Button>
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

  shouldComponentUpdate({ index, code, comment }, { isEditing, isHidden }) {
    return !(this.props.index === index
        && this.props.code === code
        && this.props.comment === comment
        && this.state.isEditing === isEditing
        && this.state.isHidden === isHidden)
  }

  toggleHidden() {
    this.setState({ isHidden: !this.state.isHidden })
  }

  edit() {
    this.setState({ isEditing: true })
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

  render({ index, code, comment, editable }, { isEditing, isHidden }) {
    return (
      <div className="cc-line">
        <Code
          number={ index }
          content={ code }
          edit={ this.edit }
          editable={ editable }
          isHidden={ isHidden }
          toggleHidden={ comment && this.toggleHidden }
        />
        { !isHidden && <Comment
          comment={ comment }
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
