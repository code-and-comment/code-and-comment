import { h, Component, JSX } from 'preact'

import Button from '../parts/button'
import Loading from '../parts/loading'


export enum Mode {
  Initial,
  Delete,
  Create,
  Import,
  Export,
  Token
}


interface Props {
  id: number | null
  loading: boolean
  deleteOne: JSX.MouseEventHandler<Element>
  searchCodeAndComment: JSX.MouseEventHandler<Element>
  searchComment: JSX.MouseEventHandler<Element>
  toggleSelector: JSX.MouseEventHandler<Element>
  isSelectorOpen: boolean | undefined
  setLoading: Function
  setToken: Function
  getFile: Function
  exportData: Function
  importData: Function
  clearErrors: Function
  networkError: boolean
  urlError: boolean
}


interface State {
  url: string
  token: string
  exportFileName: string
  mode: Mode
}


export class MenuBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      url: '',
      token: '',
      exportFileName: 'code-and-comment.json',
      mode: Mode.Initial
    }
    this.creating = this.creating.bind(this)
    this.deleting = this.deleting.bind(this)
    this.importing = this.importing.bind(this)
    this.exporting = this.exporting.bind(this)
    this.tokenizing = this.tokenizing.bind(this)
    this.cancel = this.cancel.bind(this)
    this.create = this.create.bind(this)
    this.setUrl = this.setUrl.bind(this)
    this.setToken = this.setToken.bind(this)
    this.setExportFileName = this.setExportFileName.bind(this)
    this.import = this.import.bind(this)
    this.export = this.export.bind(this)
    this.tokenize = this.tokenize.bind(this)
  }

  componentWillReceiveProps({ id }: Props) {
    if (this.props.id !== id) {
      this.cancel()
    }
  }

  shouldComponentUpdate(
    { id, loading, isSelectorOpen, networkError, urlError }: Props,
    { mode }: State
  ) {
    return !(this.props.id === id
        && this.props.loading === loading
        && this.props.isSelectorOpen === isSelectorOpen
        && this.props.networkError === networkError
        && this.props.urlError === urlError
        && this.state.mode === mode)
  }

  deleting(event: Event) {
    event.stopPropagation()
    this.setState({ mode: Mode.Delete })
  }

  creating(event: Event) {
    event.stopPropagation()
    this.props.clearErrors()
    this.setState({ mode: Mode.Create })
  }

  importing(event: Event) {
    event.stopPropagation()
    this.setState({ mode: Mode.Import })
  }

  exporting(event: Event) {
    event.stopPropagation()
    this.setState({ mode: Mode.Export })
  }

  tokenizing(event: Event) {
    event.stopPropagation()
    this.setState({ mode: Mode.Token })
  }

  import(event: Event) {
    event.stopPropagation()
    // @ts-ignore
    const file = document.getElementById('code-and-comment-input-file').files[0]
    if (!file) {
      return
    }
    this.props.setLoading()
    this.cancel()
    const reader = new FileReader()
    reader.addEventListener('load',() => {
      // TODO add error process
      const data = JSON.parse(reader.result + '')
      this.props.importData(data)
    })
    reader.readAsText(file)
  }

  export(event: Event) {
    event.stopPropagation()
    if (!this.state.exportFileName) {
      return
    }
    this.cancel()
    this.props.exportData(this.state.exportFileName)
  }

  cancel(event?: Event) {
    if (event) {
      event.stopPropagation()
    }
    this.setState({
      url: '',
      mode: Mode.Initial
    })
  }

  setUrl(event: Event) {
    // @ts-ignore
    this.setState({ url: event.target.value.trim() })
  }

  setToken(event: Event) {
    // @ts-ignore
    this.setState({ token: event.target.value.trim() })
  }

  setExportFileName(event: Event) {
    // @ts-ignore
    this.setState({ exportFileName: event.target.value.trim() })
  }

  create(event: Event) {
    event.stopPropagation()
    this.props.setLoading()
    this.props.getFile(this.state.url)
  }

  tokenize(event: Event) {
    event.stopPropagation()
    this.props.setToken(this.state.token)
    this.cancel()
  }

  render({
    id,
    loading,
    deleteOne,
    searchCodeAndComment,
    searchComment,
    toggleSelector,
    isSelectorOpen,
    networkError,
    urlError
  }: Props, {
    exportFileName,
    mode,
  }: State) {
    if (loading) {
      return(
        <div className="cc-menu-bar loading">
          <Loading />
        </div>
      )
    }
    else if (mode === Mode.Delete) {
      return (
        <div className="cc-menu-bar deleting">
          <div className="message">This code and comment is removed.</div>
          <Button onClick={ deleteOne }>OK</Button>
          { ' ' }
          <Button onClick={ this.cancel }>Cancel</Button>
        </div>
      )
    }
    else if (mode === Mode.Create) {
      return (
        <div className="cc-menu-bar input creating">
          <p>Input a file url in Github. (The content of a file in Github is saved in browser.)</p>
          <input type="text" onChange={ this.setUrl }/>
          <Button onClick={ this.create }>Create</Button>
          <Button onClick={ this.cancel }>Cancel</Button>
          { networkError && <div>The file data is not got.</div> }
          { urlError && <div>Url is invalid.</div> }
        </div>
      )
    }
    else if (mode === Mode.Token) {
      return (
        <div className="cc-menu-bar input tokenizing">
          <p>Input a Github personal access token</p>
          <input type="text" onChange={ this.setToken }/>
          <Button onClick={ this.tokenize }>&nbsp;Set&nbsp;</Button>
          <Button onClick={ this.cancel }>Cancel</Button>
        </div>
      )
    }
    else if (mode === Mode.Export) {
      return (
        <div className="cc-menu-bar input exporting">
          <p>Input a file name.</p>
          <input type="text" value={ exportFileName } onChange={ this.setExportFileName }/>
          <Button onClick={ this.export }>Export</Button>
          <Button onClick={ this.cancel }>Cancel</Button>
        </div>
      )
    }
    else if (mode === Mode.Import) {
      return (
        <div className="cc-menu-bar input importing">
          <p>Input a file of Code and Comment.</p>
          <div className="message">Existing data is removed.</div>
          <div className="input-file">
            <input id="code-and-comment-input-file" type="file" />
          </div>
          <Button onClick={ this.import }>Import</Button>
          { ' ' }
          <Button onClick={ this.cancel }>Cancel</Button>
        </div>
      )
    }
    else {
      return (
        <div className="cc-menu-bar">
          <span className="label" onClick={ toggleSelector }>{ isSelectorOpen ? 'Close' : 'Open' }</span>
          <span className="label" onClick={ this.creating }>New</span>
          <span className="label" onClick={ searchCodeAndComment }>List</span>
          <span className="label" onClick={ searchComment }>Comments</span>
          <span className="label" onClick={ this.exporting }>Export</span>
          <span className="label" onClick={ this.importing }>Import</span>
          <span className="label" onClick={ this.tokenizing }>Token</span>
          { id && <span className="label" onClick={ this.deleting }>Delete</span> }
        </div>
      )
    }
  }
}


export default MenuBar
