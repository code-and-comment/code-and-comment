import { h, Component } from 'preact'

import Button from '../parts/button.jsx'


class MenuBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleting: false,
    }
    this.deleting = this.deleting.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  componentWillReceiveProps({ id }) {
    if (this.props.id !== id) {
      this.cancel()
    }
  }

  shouldComponentUpdate({ id, isSelectorOpen }, { isDeleting }) {
    return !(this.props.id === id
        && this.props.isSelectorOpen === isSelectorOpen
        && this.state.isDeleting === isDeleting)
  }

  deleting() {
    this.setState({ isDeleting: true })
  }

  cancel() {
    this.setState({ isDeleting: false })
  }

  render({
    id,
    cancel,
    deleteOne,
    deleting,
    fileUrl,
    searchCodeAndComment,
    searchComment,
    toggleSelector,
    isSelectorOpen
  }, {
    isDeleting,
  }) {
    if (isDeleting) {
      return (
        <div key="menu-bar" className="cc-menu-bar deleting">
          <div className="message">This code and comment is removed.</div>
          <Button onClick={ deleteOne }>OK</Button>
          { ' ' }
          <Button onClick={ this.cancel }>Cancel</Button>
        </div>
      )
    }
    else {
      return (
        <div key="menu-bar" className="cc-menu-bar">
          <span className="label" onClick={ toggleSelector }>{ isSelectorOpen ? 'Close' : 'Open' }</span>
          <span className="label" onClick={ fileUrl }>New</span>
          <span className="label" onClick={ searchCodeAndComment }>List</span>
          <span className="label" onClick={ searchComment }>Comments</span>
          { id && <span className="label" onClick={ this.deleting }>Delete</span> }
        </div>
      )
    }
  }
}


export default MenuBar
