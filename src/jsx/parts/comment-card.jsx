import { h, Component } from 'preact'

import markdown from '../markdown.jsx'
import Button from './button.jsx'


class CommentCard extends Component {
  constructor(props) {
    super(props)
    this.edit = props.edit.bind(null, props.codeAndComment.id)
  }

  shouldComponentUpdate({ comment, codeAndComment }) {
    return !(
      this.props.comment === comment
      && this.props.codeAndComment.id === codeAndComment.id
      && this.props.codeAndComment.updated_at.getTime() === codeAndComment.updated_at.getTime()
    )
  }

  render({ comment, codeAndComment }) {
    return (
      <div className="cc-comment-card">
        <div className="comment" dangerouslySetInnerHTML={ { __html: markdown(comment) } } />
        <div>{ codeAndComment.repository }</div>
        <div>{ codeAndComment.path }</div>
        <div>{ codeAndComment.title }</div>
        <div>{ codeAndComment.updated_at.toLocaleString() }</div>
        <div className="controls">
          <Button onClick={ this.edit }>Edit</Button>
        </div>
      </div>
    )
  }
}


export default CommentCard
