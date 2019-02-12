import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit.jsx'
import CommentList from '../parts/comment-list.jsx'
import Line from '../parts/line.jsx'
import Navigator from '../parts/navigator.jsx'
import Button from '../parts/button.jsx'


function Controls({ cancel, deleteOne, deleting, isDeleting, list, toggleSelector, isSelectorOpen }) {
  if (isDeleting) {
    return (
      <div className="controls">
        <div className="message">This code and comment is removed.</div>
        <Button onClick={ deleteOne }>OK</Button>
        { ' ' }
        <Button onClick={ cancel }>Cancel</Button>
      </div>
    )
  }
  else {
    return (
      <div className="controls">
        <Button onClick={ toggleSelector }>{ isSelectorOpen ? 'Close' : 'Open' }</Button>
        { ' ' }
        <Button onClick={ deleting }>Delete</Button>
        { ' ' }
        <Button onClick={ list }>List</Button>
      </div>
    )
  }
}


class _RepositorySelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repository: ''
    }
    this.setCodeAndComments = this.setCodeAndComments.bind(this)
  }

  setCodeAndComments(event) {
    event.stopPropagation()
    const repository = event.currentTarget.dataset.repository
    this.props.setCodeAndComments(repository)
    this.setState({ repository })
  }

  render({ repositories }, { repository }) {
    return (
      <div className="repository-selector">
        {
          repositories.map((r) => {
            const className = r === repository ? 'repository selected' : 'repository'
            return (
              <div key={ r }  data-repository={ r } onClick={ this.setCodeAndComments } className={ className }>
                { r }
              </div>
            )
          })
        }
      </div>
    )
  }
}
const RepositorySelector = connect(['repositories'], actions)(_RepositorySelector)


class _CodeAndCommentSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.id
    }
    this.changeCodeAndComment = this.changeCodeAndComment.bind(this)
  }

  changeCodeAndComment(event) {
    event.stopPropagation()
    const id = event.currentTarget.dataset.id - 0
    this.props.changeCodeAndComment(id)
    this.setState({ id })
  }

  render({ codeAndComments }, { id }) {
    return (
      <div className="code-and-comment-selector">
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
const CodeAndCommentSelector = connect(['id', 'codeAndComments'], actions)(_CodeAndCommentSelector)


class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleting: false,
      isSelectorOpen: true,
    }
    this.deleting = this.deleting.bind(this)
    this.cancel = this.cancel.bind(this)
    this.deleteOne = props.deleteOne.bind(null, props.id)
    this.toggleSelector = this.toggleSelector.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.deleteOne = nextProps.deleteOne.bind(null, nextProps.id)
    this.cancel()
  }

  deleting() {
    this.setState({ isDeleting: true })
  }

  cancel() {
    this.setState({ isDeleting: false })
  }

  toggleSelector() {
    this.setState({
      isSelectorOpen: !this.state.isSelectorOpen
    })
  }

  render({
    id,
    title,
    lines,
    comments,
    path,
    updateComment,
    updateTitle,
    fileUrl,
    publish,
    list
  }, {
    isDeleting,
    isSelectorOpen
  }) {
    const selectorClassName = isSelectorOpen ? 'selectors' : 'selectors display-none'
    const mainClassName = isSelectorOpen ? 'main' : 'main margin-left-0'
    return (
      <div className="cc-edit">
        <div className={ selectorClassName }>
          <RepositorySelector />
          <CodeAndCommentSelector />
        </div>
        <div className={ mainClassName }>
          <Navigator
            leftLabel={ 'Url' }
            leftClick={ fileUrl }
            rightLabel={ 'Publish' }
            rightClick={ publish }
            rightDisabled={ Object.keys(comments).length < 1 }
          />
          { id && [
            (<Controls
              key="1"
              cancel={ this.cancel }
              deleting={ this.deleting }
              deleteOne={ this.deleteOne }
              isDeleting={ isDeleting }
              list={ list }
              toggleSelector={ this.toggleSelector }
              isSelectorOpen={ isSelectorOpen }
            />),
            (<div key="2">
              Click the line. Add the comment by Markdown. Click Publish button.
              When a line number is clicked, the comment is hidden.
            </div>),
            (<div key="3">
              Title: <input type="text" className="title" value={ title } onChange={ updateTitle } />
            </div>),
            <div key="4"><CommentList /></div>,
            <div key="5">{ path }</div>,
            (<div className="file" key="6">
              { lines.map((code, index) => <Line
                key={ index }
                code={ code }
                comment={ comments[index + ''] }
                index={ index }
                updateComment={ updateComment }
                editable={ true }/>
              ) }
            </div>)
          ] }
        </div>
      </div>
    )
  }
}


export default connect(['id', 'title', 'lines', 'comments', 'path'], actions)(Edit)
