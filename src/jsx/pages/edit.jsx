import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit.jsx'
import CommentList from '../parts/comment-list.jsx'
import Line from '../parts/line.jsx'
import Button from '../parts/button.jsx'
import CodeAndCommentSelector from '../parts/code-and-comment-selector.jsx'
import RepositorySelector from '../parts/repository-selector.jsx'


function MenuBar({
  cancel,
  deleteOne,
  deleting,
  fileUrl,
  publish,
  publishDisabled,
  isDeleting,
  searchCodeAndComment,
  searchComment,
  toggleSelector,
  isSelectorOpen
}) {
  if (isDeleting) {
    return (
      <div className="menu-bar deleting">
        <div className="message">This code and comment is removed.</div>
        <Button onClick={ deleteOne }>OK</Button>
        { ' ' }
        <Button onClick={ cancel }>Cancel</Button>
      </div>
    )
  }
  else {
    return (
      <div className="menu-bar">
        <span className="label" onClick={ toggleSelector }>{ isSelectorOpen ? 'Close' : 'Open' }</span>
        <span className="label" onClick={ fileUrl }>New</span>
        <span className="label" onClick={ searchCodeAndComment }>List</span>
        <span className="label" onClick={ searchComment }>Comments</span>
        { deleting && <span className="label" onClick={ deleting }>Delete</span> }
        { publish && !publishDisabled && <span className="label" onClick={ publish }>Publish</span> }
      </div>
    )
  }
}


class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleting: false,
      highlightLineNumber: props.highlightLineNumber || 0
    }
    if (props.highlightLineNumber) {
      window.setTimeout(() => {
        const selector = `.cc-line:nth-child(${props.highlightLineNumber})`
        document.querySelector(selector).scrollIntoView({ center: true })
      })
    }
    this.deleting = this.deleting.bind(this)
    this.cancel = this.cancel.bind(this)
    this.deleteOne = props.deleteOne.bind(null, props.id)
    this.toggleSelector = this.toggleSelector.bind(this)
    this.setHighlightLineNumber = this.setHighlightLineNumber.bind(this)
  }

  componentWillReceiveProps({ id, deleteOne }) {
    if (this.props.id !== id) {
      this.deleteOne = deleteOne.bind(null, id)
      this.setState({
        highlightLineNumber: 0
      })
      this.cancel()
    }
  }

  deleting() {
    this.setState({ isDeleting: true })
  }

  cancel() {
    this.setState({ isDeleting: false })
  }

  toggleSelector() {
    this.props.setIsSelectorOpen(!this.props.isSelectorOpen)
  }

  setHighlightLineNumber(event) {
    const highlightLineNumber = event.target.value - 0
    this.setState({ highlightLineNumber })
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
    searchCodeAndComment,
    searchComment,
    isSelectorOpen
  }, {
    isDeleting,
    highlightLineNumber
  }) {
    const selectorClassName = isSelectorOpen ? 'selectors' : 'selectors display-none'
    const mainClassName = isSelectorOpen ? 'main' : 'main margin-left-0'
    return (
      <div className="cc-edit">
        <div className={ selectorClassName }>
          <RepositorySelector />
          <CodeAndCommentSelector />
        </div>
        { !id && (
          <div className={ mainClassName }>
            <MenuBar
              searchCodeAndComment={ searchCodeAndComment }
              searchComment={ searchComment }
              toggleSelector={ this.toggleSelector }
              isSelectorOpen={ isSelectorOpen }
              fileUrl={ fileUrl }
            />
            <div className="body">
              <div>
                The status of this application is pre-alpha.<br />
                Click { '"New"' }.
              </div>
            </div>
          </div>
        ) }
        { id && (
          <div className={ mainClassName }>
            <MenuBar
              cancel={ this.cancel }
              deleting={ this.deleting }
              deleteOne={ this.deleteOne }
              isDeleting={ isDeleting }
              searchCodeAndComment={ searchCodeAndComment }
              searchComment={ searchComment }
              toggleSelector={ this.toggleSelector }
              isSelectorOpen={ isSelectorOpen }
              fileUrl={ fileUrl }
              publish={ publish }
              publishDisabled={ Object.keys(comments).length < 1 }
            />
            <div className="body">
              <div>
              The status of this application is pre-alpha.<br />
              Click the line. Add the comment by Markdown.
              When a line number is clicked, the comment is hidden.
              </div>
              <div>
              ID: { id }<br />
              Title: <input type="text" className="title" value={ title } onChange={ updateTitle } />
              </div>
              <div>
                <a
                  href={ `https://github.com${path}` }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  { path }
                </a>
              </div>
              <div>
                <CommentList handler={ this.setHighlightLineNumber } />
              </div>
              <div className="file">
                { lines.map((code, index) => {
                  return (<Line
                    id={ id }
                    key={ index }
                    code={ code }
                    comment={ comments[index + ''] }
                    index={ index }
                    updateComment={ updateComment }
                    editable={ true }
                    isHighlight={ highlightLineNumber === (index + 1) }
                    setHighlightLineNumber={ this.setHighlightLineNumber }
                  />)
                }
                ) }
              </div>
            </div>
          </div>
        ) }
      </div>
    )
  }
}


const mapStateToProps = [
  'id',
  'title',
  'lines',
  'comments',
  'path',
  'isSelectorOpen',
  'highlightLineNumber'
]


export default connect(mapStateToProps, actions)(Edit)
