import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions, { editFunc } from '../actions/reference'
import Header from '../parts/header'
import Loading from '../parts/loading'
import { State } from '../store'


interface Props {
  id: string | number
  lineNumber: string | number
  edit: editFunc
}


class Reference extends Component<Props> {
  constructor(props: Props) {
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


export default connect<Pick<Props, 'id' | 'lineNumber'>, {}, State, Pick<Props, 'edit'>>([], actions)(Reference)
