import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions, { IChangeCodeAndComment } from '../actions/edit'
import { CodeAndComment, State } from '../store'


interface Props {
  id: number
  codeAndComments: CodeAndComment[]
  changeCodeAndComment: IChangeCodeAndComment
}


class CodeAndCommentSelector extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.changeCodeAndComment = this.changeCodeAndComment.bind(this)
  }

  changeCodeAndComment(event: Event) {
    event.stopPropagation()
    // @ts-ignore
    const id = event.currentTarget.dataset.id - 0
    this.props.changeCodeAndComment(id)
  }

  shouldComponentUpdate({ id, codeAndComments }: Props) {
    return !(
      this.props.id === id
        && this.props.codeAndComments === codeAndComments)
  }

  render({ id, codeAndComments }: Props) {
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


export default connect<{}, {}, State, Props>(['id', 'codeAndComments'], actions)(CodeAndCommentSelector)
