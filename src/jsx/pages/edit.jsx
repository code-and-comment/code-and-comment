import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit.jsx'
import { scrollIntoView } from '../utils.jsx'
import FileHeader from '../parts/file-header.jsx'
import FileBody from '../parts/file-body.jsx'
import CodeAndCommentSelector from '../parts/code-and-comment-selector.jsx'
import RepositorySelector from '../parts/repository-selector.jsx'
import MenuBar from '../parts/menu-bar.jsx'


class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleting: false,
      highlightLineNumber: props.highlightLineNumber || 0
    }
    if (props.highlightLineNumber) {
      window.setTimeout(() => {
        scrollIntoView(props.highlightLineNumber)
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
                Click { '"New"' }.<br />
                Click the line. Add the comment by Markdown.<br />
                When a line number is clicked, the comment is hidden.
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
                ID: { id } { ' ' } <input type="text" className="title" value={ title } onChange={ updateTitle } />
              </div>
              <FileHeader
                path={ path }
                setHighlightLineNumber={ this.setHighlightLineNumber }
              />
              <FileBody
                id={ id }
                lines={ lines }
                comments={ comments }
                updateComment={ updateComment }
                editable={ true }
                highlightLineNumber={ highlightLineNumber }
                setHighlightLineNumber={ this.setHighlightLineNumber }
              />
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
