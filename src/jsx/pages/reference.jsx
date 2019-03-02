import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/reference.jsx'
import Header from '../parts/header.jsx'
import Loading from '../parts/loading.jsx'


class Reference extends Component {
  constructor(props) {
    super(props)
    props.edit(props.id, props.lineNumber)
  }

  render() {
    return (
      <div className="cc-view">
        <Header />
        <Loading />
      </div>
    )
  }
}


export default connect([], actions)(Reference)
