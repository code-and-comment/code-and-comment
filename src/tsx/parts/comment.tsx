import { h, Component } from 'preact'
// @ts-ignore
import Markup from 'preact-markup'

import markdown from '../markdown'
import Button from './button'


interface Props {
  id: number
  lineNumber: number
  comment: string
  isEditing: boolean
  cancel: Function
  save: Function
  delete: Function
}


interface State {
  comment: string
  isPreview: boolean
}


class Comment extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      comment: props.comment,
      isPreview: false,
    }
    this.cancel = this.cancel.bind(this)
    this.save = this.save.bind(this)
    this.delete = this.delete.bind(this)
    this.setComment = this.setComment.bind(this)
    this.togglePreview = this.togglePreview.bind(this)
    this.copyLink = this.copyLink.bind(this)
  }

  componentWillReceiveProps({ comment }: Props) {
    this.setState({
      comment,
      isPreview: false,
    })
  }

  setComment(event: Event) {
    this.setState({
      // @ts-ignore
      comment: event.target.value
    })
  }

  cancel(event: Event) {
    event.stopPropagation()
    this.setState({
      comment: this.props.comment
    })
    this.props.cancel()
  }

  save(event: Event) {
    event.stopPropagation()
    // @ts-ignore
    window.requestIdleCallback(() => {
      this.props.save(this.state.comment)
    })
  }

  delete(event: Event) {
    event.stopPropagation()
    this.setState({
      comment: ''
    })
    this.props.delete()
  }

  togglePreview(event: Event) {
    event.stopPropagation()
    this.setState({ isPreview: !this.state.isPreview })
  }

  copyLink(event: Event) {
    event.stopPropagation()
    const { id, lineNumber } = this.props
    const link = `#/r/${id}/${lineNumber}`
    window.navigator.clipboard.writeText(link)
  }

  render({ isEditing }: Props, { comment, isPreview }: State) {
    if (comment && !isEditing) {
      return (
        <div className="cc-comment">
          <div className="display-markdown"><Markup markup={ markdown(comment) } /></div>
        </div>
      )
    }
    else if (isEditing) {
      return (
        <div className="cc-comment editing">
          <div className="input">
            <div className="tab-navigator">
              <div className="tabs">
                <span className={ isPreview ? 'tab' : 'tab selected' } onClick={ isPreview ? this.togglePreview : undefined }>Edit</span>
                <span className={ isPreview ? 'tab selected' : 'tab' } onClick={ !isPreview ? this.togglePreview : undefined }>Preview</span>
              </div>
            </div>
            { !isPreview && <textarea onChange={ this.setComment }>{ comment }</textarea> }
            { isPreview && <div className="display-markdown"><Markup markup={ markdown(comment) } /></div> }
          </div>
          <div className="controls">
            <Button onClick={ this.cancel }>Cancel</Button>
            { ' ' }
            <Button onClick={ this.save }>Save</Button>
            { ' ' }
            <Button onClick={ this.delete }>Delete</Button>
            { ' ' }
            <Button onClick={ this.copyLink }>Link</Button>
          </div>
        </div>
      )
    }
  }
}

export default Comment
