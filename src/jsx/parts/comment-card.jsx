import { h, Component } from 'preact'
import marked from 'marked'

marked.setOptions({
  sanitize: true
})


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
        <div className="display" dangerouslySetInnerHTML={ { __html: marked(comment) } } />
        <div>{ codeAndComment.repository }</div>
        <div>{ codeAndComment.path }</div>
        <div>{ codeAndComment.title }</div>
        <div>{ codeAndComment.updated_at.toLocaleString() }</div>
        <div>
          <button onClick={ this.edit }>Edit</button>
        </div>
      </div>
    )
  }
}


export default CommentCard
