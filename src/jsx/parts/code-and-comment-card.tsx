import { h, Component } from 'preact'

import Button from './button'
import { CodeAndComment } from '../store'


type Props = {
  codeAndComment: CodeAndComment
  deleteOne: Function
  edit: Function
}


type State = {
  isDeleting: boolean
}


class CodeAndCommentCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { isDeleting: false }
    this.deleting = this.deleting.bind(this)
    this.cancel = this.cancel.bind(this)
    // @ts-ignore
    this.deleteOne = props.deleteOne.bind(null, props.codeAndComment.id)
    // @ts-ignore
    this.edit = props.edit.bind(null, props.codeAndComment.id, 0)
  }

  deleting(event: Event) {
    event.stopPropagation()
    this.setState({ isDeleting: true })
  }

  cancel(event: Event) {
    event.stopPropagation()
    this.setState({ isDeleting: false })
  }

  shouldComponentUpdate({ codeAndComment }: Props, { isDeleting }: State) {
    return !(
      this.state.isDeleting === isDeleting
      && this.props.codeAndComment.id === codeAndComment.id
      && this.props.codeAndComment.updated_at.getTime() === codeAndComment.updated_at.getTime()
    )
  }

  render({ codeAndComment }: Props, { isDeleting }: State) {
    let controls
    if (isDeleting) {
      controls = (
        <div className="controls">
          <div className="message">This code and comment is removed.</div>
          // @ts-ignore
          <Button onClick={ this.deleteOne }>OK</Button>
          { ' ' }
          <Button onClick={ this.cancel }>Cancel</Button>
        </div>
      )
    }
    else {
      controls = (
        <div className="controls">
          // @ts-ignore
          <Button onClick={ this.edit }>Edit</Button>
          { ' ' }
          <Button onClick={ this.deleting }>Delete</Button>
        </div>
      )
    }
    return (
      <div className="cc-code-and-comment-card">
        <div>ID: { codeAndComment.id }</div>
        <div>{ codeAndComment.repository }</div>
        <div>
          <a
            href={ `https://github.com${codeAndComment.path}` }
            target="_blank"
            rel="noopener noreferrer"
          >
            { codeAndComment.path }
          </a>
        </div>
        <div>{ codeAndComment.title }</div>
        <div>{ codeAndComment.updated_at.toLocaleString() }</div>
        { controls }
      </div>
    )
  }
}


export default CodeAndCommentCard
