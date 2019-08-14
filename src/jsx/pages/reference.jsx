import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/reference'
import Header from '../parts/header'
import Loading from '../parts/loading'


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
