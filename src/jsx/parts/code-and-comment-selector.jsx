import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit'


class CodeAndCommentSelector extends Component {
  constructor(props) {
    super(props)
    this.changeCodeAndComment = this.changeCodeAndComment.bind(this)
  }

  changeCodeAndComment(event) {
    event.stopPropagation()
    const id = event.currentTarget.dataset.id - 0
    this.props.changeCodeAndComment(id)
  }

  shouldComponentUpdate({ id, codeAndComments }) {
    return !(
      this.props.id === id
        && this.props.codeAndComments === codeAndComments)
  }

  render({ id, codeAndComments }) {
    return (
      <div className="cc-code-and-comment-selector">
        {
          codeAndComments.map((codeAndComment) => {
            const className = codeAndComment.id === id ? 'code-and-comment selected' : 'code-and-comment'
            return (
              <div
                key={ codeAndComment.id }
                data-id={ codeAndComment.id }
                onClick={ this.changeCodeAndComment }
                className={ className }
              >
                <div>ID: { codeAndComment.id }</div>
                <div>{ codeAndComment.title }</div>
                <div>{ codeAndComment.path }</div>
                <div>{ codeAndComment.updated_at.toLocaleString() }</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}


export default connect(['id', 'codeAndComments'], actions)(CodeAndCommentSelector)
