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
  re: RegExp
  constructor(props: Props) {
    super(props)
    this.changeCodeAndComment = this.changeCodeAndComment.bind(this)
    this.re = /^\/\w*\/\w*\/\w*\/\w*/
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
            const path = codeAndComment.path.replace(this.re, '')
            const className = codeAndComment.id === id ? 'code-and-comment selected' : 'code-and-comment'
            return (
              <div
                key={ codeAndComment.id }
                data-id={ codeAndComment.id }
                onClick={ this.changeCodeAndComment }
                className={ className }
              >
                <div>{ codeAndComment.title }</div>
                <div>{ path }</div>
                <div>{ Object.keys(codeAndComment.comments).length } comments</div>
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
