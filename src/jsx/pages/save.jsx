import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/save.jsx'
import Header from '../parts/header.jsx'

class Save extends Component {
  render({ saved }, { url }) {
    return (
      <div className="cc-save center">
        <Header />
        <div>
          If you want to save the code and comment,<br/>
          Please input the title for code and comment.
        </div>
      </div>
    )
  }
}


export default connect(['saved'], actions)(Save)
