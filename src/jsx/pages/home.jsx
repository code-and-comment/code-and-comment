import { h, Component } from 'preact'
import { Link } from 'preact-router'
import { connect } from 'unistore/preact'

import actions from '../actions/home.jsx'
import Header from '../parts/header.jsx'


class Home extends Component {
  render({ search_comment, search_code_and_comment }) {
    return (
      <div className="cc-home">
        <Header />
        <div>
          The status of this application is pre-alpha.
        </div>
        <div className="links">
          <p><Link href="/start">Create Code and Comment</Link></p>
          <p><a onClick={ search_code_and_comment }>{ 'Search Code and Comment' }</a></p>
          <p><a onClick={ search_comment }>{ 'Search Comment' }</a></p>
        </div>
      </div>
    )
  }
}


export default connect(null, actions)(Home)
