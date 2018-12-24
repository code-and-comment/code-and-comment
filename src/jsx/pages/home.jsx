import { h, Component } from 'preact'
import { Link } from 'preact-router'
import { connect } from 'unistore/preact'

import actions from '../actions/home.jsx'
import Header from '../parts/header.jsx'


class Home extends Component {
  render({ search_comment, search_code_and_comment }) {
    return (
      <div className="cc-home center">
        <Header />
        <div>
          The status of this application is pre-alpha.<br/>
          Many breaking changes will be added to this application.<br/>
          This is demo site.<br/>
          If you want to use this application as product, you should host this application.<br/>
        </div>
        <div className="links">
          <p><Link href="/start">Create Code and Comment</Link></p>
          <p><a onClick={ search_code_and_comment }>Code and Comment List</a></p>
          <p><a onClick={ search_comment }>Comment List</a></p>
        </div>
      </div>
    )
  }
}


export default connect(null, actions)(Home)
