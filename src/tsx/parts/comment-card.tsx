import { h, Component } from 'preact'
// @ts-ignore
import Markup from 'preact-markup'

import markdown from '../markdown'
import Anchor from './anchor'
import Button from './button'


interface Props {
  id: number
  lineNumber: number
  code: string
  comment: string
  path: string
  title: string
  repository: string
  updated_at: Date
  edit: Function
}


class CommentCard extends Component<Props> {
  edit: (event: MouseEvent) => any
  constructor(props: Props) {
    super(props)
    // @ts-ignore
    this.edit = props.edit.bind(null, props.id, props.lineNumber)
  }

  shouldComponentUpdate({ id, code, comment, updated_at, lineNumber }: Props) {
    return !(
      this.props.lineNumber === lineNumber
      && this.props.code === code
      && this.props.comment === comment
      && this.props.id === id
      && this.props.updated_at.getTime() === updated_at.getTime()
    )
  }

  render({ id, code, comment, path, title, lineNumber, repository, updated_at }: Props) {
    return (
      <div className="cc-comment-card">
        <div>ID: { id }</div>
        <div className="line">
          <span className="number">{ lineNumber }</span>
          <span className="content">{ code }</span>
        </div>
        <div className="comment">
          <Markup markup={ markdown(comment) } components={ { Anchor } } />
        </div>
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
