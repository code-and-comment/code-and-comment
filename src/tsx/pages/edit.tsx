import { h, Component, JSX } from 'preact'
import { connect } from 'unistore/preact'

import actions, {
  IUpdateComment, IUpdateTitle, IExportData } from '../actions/edit'
import { scrollIntoView } from '../utils'
import FileHeader from '../parts/file-header'
import FileBody from '../parts/file-body'
import Button from '../parts/button'
import CodeAndCommentSelector from '../parts/code-and-comment-selector'
import RepositorySelector from '../parts/repository-selector'
import MenuBar from '../parts/menu-bar'
import { State } from '../store'


interface S {
  hiddenSignal: boolean
  highlightLineNumber: number
}


interface A {
  deleteOne: Function
  setIsSelectorOpen: Function
  updateComment: IUpdateComment
  updateTitle: IUpdateTitle
  exportData: IExportData
  searchCodeAndComment: JSX.MouseEventHandler<Element>
  searchComment: JSX.MouseEventHandler<Element>
  isSelectorOpen: Function
  setLoading: Function
  setToken: Function
  getFile: Function
  importData: Function
  clearErrors: Function
}


type Props = A & Pick<State, 'id' | 'title' | 'lines' | 'loading' | 'comments' | 'path' | 'isSelectorOpen' | 'highlightLineNumber' | 'networkError' | 'urlError'>



class Edit extends Component<Props, S> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hiddenSignal: false,
      highlightLineNumber: props.highlightLineNumber || 0
    }
    if (props.highlightLineNumber) {
      // @ts-ignore
      window.requestIdleCallback(() => {
        scrollIntoView(props.highlightLineNumber)
      })
    }
    this.deleteOne = this.deleteOne.bind(this)
    this.emitHiddenSignal = this.emitHiddenSignal.bind(this)
    this.toggleSelector = this.toggleSelector.bind(this)
    this.setHighlightLineNumber = this.setHighlightLineNumber.bind(this)
  }

  componentWillReceiveProps({ id }: Props) {
    if (this.props.id !== id) {
      this.setState({
        highlightLineNumber: 0
      })
    }
  }

  deleteOne(event: MouseEvent) {
    this.props.deleteOne(this.props.id, event)
  }

  emitHiddenSignal() {
    this.setState({
      hiddenSignal: true
    })
    // @ts-ignore
    window.requestIdleCallback(() => {
      this.setState({
        hiddenSignal: false
      })
    })
  }

  toggleSelector() {
    this.props.setIsSelectorOpen(!this.props.isSelectorOpen)
  }

  setHighlightLineNumber(event: Event) {
    // @ts-ignore
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
    setToken,
    getFile,
    exportData,
    importData,
    clearErrors,
    networkError,
    urlError
  }: Props, {
    hiddenSignal,
    highlightLineNumber
  }: S) {
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
            setToken={ setToken }
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
                Click code. Add the comment by Markdown.<br />
                When a line number is clicked, the comment is hidden.<br />
                <br />
                <br />
                Link for a line<br />
                #/r/:id/:line_number<br />
                <br />
                <br />
                Keyboard shortcuts<br />
                <br />
                On code<br />
                <kbd>m</kbd>: marking to line<br />
                <kbd>g</kbd>: scrolling to marked line
              </div>
            </div>
          ) }
          { id && (
            <div className="body">
              <div>
                ID: { id } { ' ' }
                <input type="text" className="title" value={ title } onChange={ updateTitle } /> { ' ' }
                <Button onClick={ this.emitHiddenSignal }>Hide all comments</Button>
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


export default connect<{}, S, State, Props>(mapStateToProps, actions)(Edit)
