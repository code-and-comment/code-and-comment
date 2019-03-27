import { h } from 'preact'

import Button from '../parts/button.jsx'


function MenuBar({
  cancel,
  deleteOne,
  deleting,
  fileUrl,
  isDeleting,
  searchCodeAndComment,
  searchComment,
  toggleSelector,
  isSelectorOpen
}) {
  if (isDeleting) {
    return (
      <div key="menu-bar" className="cc-menu-bar deleting">
        <div className="message">This code and comment is removed.</div>
        <Button onClick={ deleteOne }>OK</Button>
        { ' ' }
        <Button onClick={ cancel }>Cancel</Button>
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
        { deleting && <span className="label" onClick={ deleting }>Delete</span> }
      </div>
    )
  }
}


export default MenuBar
