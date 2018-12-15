import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/search-code-and-comment.jsx'
import Header from '../parts/header.jsx'

class SearchCodeAndComment extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render({ codeAndComments }) {
    return (
      <div className="cc-search-code-and-comment center">
        <Header />
        SearchCodeAndComment
      </div>
    )
  }
}


export default connect(['codeAndComments'], actions)(SearchCodeAndComment)
