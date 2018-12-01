import { h, Component } from 'preact'
import marked from 'marked'

import CommentList from '../parts/comment-list.jsx'

marked.setOptions({
  sanitize: true
})


function Code({ number, content, edit, editable }) {
  return (
    <div className="code" onClick={editable ? edit : null}>
      <span className="number">{number + 1}</span>
      <span className="content">{content}</span>
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
          <div className="display" dangerouslySetInnerHTML={ { __html: marked(comment) }} />
          <CommentList />
        </div>
      )
    }
    else if (isEditing) {
      return (
        <div className="comment">
          <div className="input">
            <textarea ref={this.textareaRef}>{comment}</textarea>
          </div>
          <div>
            <button onClick={cancel}>Cancel</button>
            {' '}
            <button onClick={this.save}>Save</button>
            {' '}
            <button onClick={this.props.delete}>Delete</button>
          </div>
        </div>
      )
    }
  }
}


class Line extends Component {
  constructor(props) {
    super(props)
    this.state = { isEditing: false }
    this.edit = this.edit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.save = this.save.bind(this, props.index)
    this.delete = this.delete.bind(this, props.index)
  }

  shouldComponentUpdate({ index, code, comment }, { isEditing }) {
    return !(this.props.index === index
        && this.props.code === code
        && this.props.comment === comment
        && this.state.isEditing === isEditing)
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

  render({ index, code, comment, editable }, { isEditing }) {
    return (
      <div className="cc-line">
        <Code number={index} content={code} edit={this.edit} editable={editable}/>
        <Comment
          comment={comment}
          isEditing={ isEditing }
          cancel={this.cancel}
          save={this.save}
          delete={this.delete}
        />
      </div>
    )
  }
}


export default Line
