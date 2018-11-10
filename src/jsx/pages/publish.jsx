import { h } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/publish.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'


function Publish({ viewUrl, back }) {
  return (
    <div className="publish center">
      <Header />
      <div>
        Save url.
        Click View button.
      </div>
      <Navigator
        leftLabel={'<-Back'}
        leftClick={back}
        rightLabel={'View->'}
        rightUrl={viewUrl}
      />
      <div className="url">
        <textarea>{ viewUrl }</textarea>
      </div>
    </div>
  )
}


export default connect(['viewUrl', 'edit'], actions)(Publish)
