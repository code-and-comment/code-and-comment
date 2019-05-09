import { h, Component } from 'preact'

import Button from '../parts/button.jsx'
import Loading from '../parts/loading.jsx'


class MenuBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      isDeleting: false,
      isCreating: false,
      isImporting: false,
    }
    this.creating = this.creating.bind(this)
    this.deleting = this.deleting.bind(this)
    this.importing = this.importing.bind(this)
    this.cancel = this.cancel.bind(this)
    this.create = this.create.bind(this)
    this.setUrl = this.setUrl.bind(this)
  }

  componentWillReceiveProps({ id }) {
    if (this.props.id !== id) {
      this.cancel()
    }
  }

  shouldComponentUpdate({ id, loading, isSelectorOpen, networkError, urlError }, { isCreating, isDeleting, isImporting }) {
    return !(this.props.id === id
        && this.props.loading === loading
        && this.props.isSelectorOpen === isSelectorOpen
        && this.props.networkError === networkError
        && this.props.urlError === urlError
        && this.state.isCreating === isCreating
        && this.state.isDeleting === isDeleting
        && this.state.isImporting === isImporting)
  }

  deleting(event) {
    event.stopPropagation()
    this.setState({ isDeleting: true })
  }

  creating(event) {
    event.stopPropagation()
    this.props.clearErrors()
    this.setState({ isCreating: true })
  }

  importing(event) {
    event.stopPropagation()
    this.setState({ isImporting: true })
  }

  import(event) {
    event.stopPropagation()
    const reader = new FileReader()
    reader.addEventListener('load',() => {
      // TODO add error process
      const data = JSON.parse(reader.result + '')
      console.dir(data)
    })
    reader.readAsText(event.target.files[0])
  }

  cancel(event) {
    if (event) {
      event.stopPropagation()
    }
    this.setState({
      url: '',
      isDeleting: false,
      isCreating: false,
      isImporting: false,
    })
  }

  setUrl(event) {
    this.setState({ url: event.target.value })
  }

  create(event) {
    event.stopPropagation()
    this.props.setLoading()
    this.props.getFile(this.state.url)
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
    exportData,
    urlError
  }, {
    isCreating,
    isDeleting,
    isImporting,
  }) {
    if (loading) {
      return(
        <div className="cc-menu-bar loading">
          <Loading />
        </div>
      )
    }
    else if (isDeleting) {
      return (
        <div className="cc-menu-bar deleting">
          <div className="message">This code and comment is removed.</div>
          <Button onClick={ deleteOne }>OK</Button>
          { ' ' }
          <Button onClick={ this.cancel }>Cancel</Button>
        </div>
      )
    }
    else if (isCreating) {
      return (
        <div className="cc-menu-bar input creating">
          <p>Input the file url in Github.</p>
          <input type="text" className="url" onChange={ this.setUrl }/>
          <Button onClick={ this.create }>Create</Button>
          <Button onClick={ this.cancel }>Cancel</Button>
          { networkError && <div>The file data is not got.</div> }
          { urlError && <div>Url is invalid.</div> }
        </div>
      )
    }
    else if (isImporting) {
      return (
        <div className="cc-menu-bar input importing">
          <p>Input a file of Code and Comment.</p>
          <div className="message">Existing data is removed.</div>
          <div className="input-file">
            <input type="file" onChange={ this.import } />
          </div>
          <Button >Import</Button>
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
          <span className="label" onClick={ exportData }>Export</span>
          <span className="label" onClick={ this.importing }>Import</span>
          { id && <span className="label" onClick={ this.deleting }>Delete</span> }
        </div>
      )
    }
  }
}


export default MenuBar
