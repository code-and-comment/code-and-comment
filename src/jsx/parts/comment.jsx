import { h, Component } from 'preact'

import markdown from '../markdown.jsx'
import Button from './button.jsx'


class Comment extends Component {
  constructor(props) {
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

  componentWillReceiveProps({ comment }) {
    this.setState({
      comment,
      isPreview: false,
    })
  }

  setComment(event) {
    this.setState({
      comment: event.target.value
    })
  }

  cancel(event) {
    event.stopPropagation()
    this.setState({
      comment: this.props.comment
    })
    this.props.cancel()
  }

  save(event) {
    event.stopPropagation()
    window.requestIdleCallback(() => {
      this.props.save(this.state.comment)
    })
  }

  delete(event) {
    event.stopPropagation()
    this.setState({
      comment: ''
    })
    this.props.delete()
  }

  togglePreview(event) {
    event.stopPropagation()
    this.setState({ isPreview: !this.state.isPreview })
  }

  copyLink(event) {
    event.stopPropagation()
    const { id, lineNumber } = this.props
    const link = `#/r/${id}/${lineNumber}`
    window.navigator.clipboard.writeText(link)
  }

  render({ isEditing }, { comment, isPreview }) {
    if (comment && !isEditing) {
      return (
        <div className="cc-comment">
          <div className="display-markdown" dangerouslySetInnerHTML={ { __html: markdown(comment) } } />
        </div>
      )
    }
    else if (isEditing) {
      return (
        <div className="cc-comment editing">
          <div className="input">
            <div className="tab-navigator">
              <div className="tabs">
                <span className={ isPreview ? 'tab' : 'tab selected' } onClick={ isPreview && this.togglePreview }>Edit</span>
                <span className={ isPreview ? 'tab selected' : 'tab' } onClick={ !isPreview && this.togglePreview }>Preview</span>
              </div>
            </div>
            { !isPreview && <textarea onChange={ this.setComment }>{ comment }</textarea> }
            { isPreview && <div className="display-markdown" dangerouslySetInnerHTML={ { __html: markdown(comment) } } /> }
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
