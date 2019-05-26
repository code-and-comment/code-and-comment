import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit.jsx'
import { scrollIntoView } from '../utils.jsx'
import FileHeader from '../parts/file-header.jsx'
import FileBody from '../parts/file-body.jsx'
import Button from '../parts/button.jsx'
import CodeAndCommentSelector from '../parts/code-and-comment-selector.jsx'
import RepositorySelector from '../parts/repository-selector.jsx'
import MenuBar from '../parts/menu-bar.jsx'


class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hiddenSignal: false,
      highlightLineNumber: props.highlightLineNumber || 0
    }
    if (props.highlightLineNumber) {
      window.requestIdleCallback(() => {
        scrollIntoView(props.highlightLineNumber)
      })
    }
    this.deleteOne = props.deleteOne.bind(null, props.id)
    this.emitHiddenSignal = this.emitHiddenSignal.bind(this)
    this.toggleSelector = this.toggleSelector.bind(this)
    this.setHighlightLineNumber = this.setHighlightLineNumber.bind(this)
  }

  componentWillReceiveProps({ id, deleteOne }) {
    if (this.props.id !== id) {
      this.deleteOne = deleteOne.bind(null, id)
      this.setState({
        highlightLineNumber: 0
      })
    }
  }

  emitHiddenSignal() {
    this.setState({
      hiddenSignal: true
    })
    window.requestIdleCallback(() => {
      this.setState({
        hiddenSignal: false
      })
    })
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
    loading,
    comments,
    path,
    updateComment,
    updateTitle,
    searchCodeAndComment,
    searchComment,
    isSelectorOpen,
    setLoading,
    getFile,
    exportData,
    importData,
    clearErrors,
    networkError,
    urlError
  }, {
    hiddenSignal,
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
        <div className={ mainClassName }>
          <MenuBar
            id={ id }
            loading={ loading }
            deleteOne={ this.deleteOne }
            searchCodeAndComment={ searchCodeAndComment }
            searchComment={ searchComment }
            toggleSelector={ this.toggleSelector }
            isSelectorOpen={ isSelectorOpen }
            setLoading={ setLoading }
            getFile={ getFile }
            exportData={ exportData }
            importData={ importData }
            clearErrors={ clearErrors }
            networkError={ networkError }
            urlError={ urlError }
          />
          { !id && (
            <div className="body">
              <div>
                The status of this application is pre-alpha.<br />
                <br />
                Click { '"New"' }.<br />
                <br />
                Input the file url in Github.<br />
                Example:<br />
                https://github.com/developit/preact/blob/10.0.0-alpha.2/src/component.js<br />
                https://github.com/developit/preact/blob/c66ec75176ac5df60824adbe6152ed577fa7b74f/src/component.js<br />
                https://github.com/developit/preact/blob/master/src/component.js<br />
                <br />
                Click the line. Add the comment by Markdown.<br />
                When a line number is clicked, the comment is hidden.
              </div>
            </div>
          ) }
          { id && (
            <div className="body">
              <div>
                ID: { id } { ' ' }
                <input type="text" className="title" value={ title } onChange={ updateTitle } /> { ' ' }
                <Button onClick={ this.emitHiddenSignal }>Hide</Button>
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
                hiddenSignal={ hiddenSignal }
                highlightLineNumber={ highlightLineNumber }
                setHighlightLineNumber={ this.setHighlightLineNumber }
              />
            </div>
          ) }
        </div>
      </div>
    )
  }
}


const mapStateToProps = [
  'id',
  'title',
  'lines',
  'loading',
  'comments',
  'path',
  'isSelectorOpen',
  'highlightLineNumber',
  'networkError',
  'urlError',
]


export default connect(mapStateToProps, actions)(Edit)
