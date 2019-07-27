import { h, Component } from 'preact'

import markdown from '../markdown'
import Button from './button'


class CommentCard extends Component {
  constructor(props) {
    super(props)
    this.edit = props.edit.bind(null, props.id, props.lineNumber)
  }

  shouldComponentUpdate({ id, comment, updated_at, lineNumber }) {
    return !(
      this.props.lineNumber === lineNumber
      && this.props.comment === comment
      && this.props.id === id
      && this.props.updated_at.getTime() === updated_at.getTime()
    )
  }

  render({ id, comment, path, title, repository, updated_at }) {
    return (
      <div className="cc-comment-card">
        <div>ID: { id }</div>
        <div className="comment" dangerouslySetInnerHTML={ { __html: markdown(comment) } } />
        <div>{ repository }</div>
        <div>
          <a
            href={ `https://github.com${path}` }
            target="_blank"
            rel="noopener noreferrer"
          >
            { path }
          </a>
        </div>
        <div>{ title }</div>
        <div>{ updated_at.toLocaleString() }</div>
        <div className="controls">
          <Button onClick={ this.edit }>Edit</Button>
        </div>
      </div>
    )
  }
}


export default CommentCard
