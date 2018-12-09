import { h } from 'preact'
import { Link } from 'preact-router'

import Header from '../parts/header.jsx'

function Home() {
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
        <Link href="/start">Create Code and Comment</Link>
      </div>
    </div>
  )
}


export default Home
