import { h } from 'preact'
import { Link } from 'preact-router'
import { connect } from 'unistore/preact'

import actions from '../actions/home.jsx'
import Header from '../parts/header.jsx'


function Home({ searchComment, searchCodeAndComment }) {
  return (
    <div className="cc-home">
      <Header />
      <div className="message">
        The status of this application is pre-alpha.
      </div>
      <div className="links">
        <p><Link href="/start">Create Code and Comment</Link></p>
        <p><a onClick={ searchCodeAndComment }>{ 'Search Code and Comment' }</a></p>
        <p><a onClick={ searchComment }>{ 'Search Comment' }</a></p>
      </div>
    </div>
  )
}


export default connect(null, actions)(Home)
