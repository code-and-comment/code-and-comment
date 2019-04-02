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
    }
    this.creating = this.creating.bind(this)
    this.deleting = this.deleting.bind(this)
    this.cancel = this.cancel.bind(this)
    this.create = this.create.bind(this)
    this.setUrl = this.setUrl.bind(this)
  }

  componentWillReceiveProps({ id }) {
    if (this.props.id !== id) {
      this.cancel()
    }
  }

  shouldComponentUpdate({ id, loading, isSelectorOpen }, { isCreating, isDeleting }) {
    return !(this.props.id === id
        && this.props.loading === loading
        && this.props.isSelectorOpen === isSelectorOpen
        && this.state.isCreating === isCreating
        && this.state.isDeleting === isDeleting)
  }

  deleting(event) {
    event.stopPropagation()
    this.setState({ isDeleting: true })
  }

  creating(event) {
    event.stopPropagation()
    this.setState({ isCreating: true })
  }

  cancel() {
    this.setState({
      url: '',
      isDeleting: false,
      isCreating: false
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
    urlError
  }, {
    isCreating,
    isDeleting,
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
        <div className="cc-menu-bar creating">
          <p>Input the file url in Github.</p>
          <input type="text" className="url" onChange={ this.setUrl }/>
          <Button onClick={ this.create }>Create</Button>
          <Button onClick={ this.cancel }>Cancel</Button>
          { networkError && <div>The file data is not got.</div> }
          { urlError && <div>Url is invalid.</div> }
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
          { id && <span className="label" onClick={ this.deleting }>Delete</span> }
        </div>
      )
    }
  }
}


export default MenuBar
