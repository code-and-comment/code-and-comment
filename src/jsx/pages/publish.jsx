import { h } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/publish.jsx'
import Navigator from '../parts/navigator.jsx'


function Publish({ viewUrl, back }) {
  return (
    <div className="cc-publish">
      <Navigator
        leftLabel="Back"
        leftClick={ back }
        rightLabel="View"
        rightUrl={ viewUrl }
      />
      <div>
        Save url.
        Click View button.
      </div>
      <div className="url">
        <textarea>{ viewUrl }</textarea>
      </div>
    </div>
  )
}


export default connect(['viewUrl', 'edit'], actions)(Publish)
