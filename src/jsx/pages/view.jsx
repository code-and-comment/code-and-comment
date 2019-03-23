import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/view.jsx'
import FileHeader from '../parts/file-header.jsx'
import FileBody from '../parts/file-body.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'
import Loading from '../parts/loading.jsx'


class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highlightLineNumber: 0
    }
    this.setHighlightLineNumber = this.setHighlightLineNumber.bind(this)
  }

  setHighlightLineNumber(event) {
    const highlightLineNumber = event.target.value - 0
    this.setState({ highlightLineNumber })
  }

  render({ lines, comments, path, edit, getFile }, { highlightLineNumber }) {
    let content
    if (lines.length) {
      content = [
        (<Navigator
          key="navigator"
          leftLabel="Edit"
          leftClick={ edit }
        />),
        (<FileHeader
          key="file-header"
          path={ path }
          setHighlightLineNumber={ this.setHighlightLineNumber }
        />),
        (<FileBody
          key="file-body"
          lines={ lines }
          comments={ comments }
          editable={ false }
          highlightLineNumber={ highlightLineNumber }
          setHighlightLineNumber={ this.setHighlightLineNumber }
        />)
      ]
    }
    else {
      getFile(location.hash.substring(12))
      content = <Loading />
    }
    return (
      <div className="cc-view">
        <Header />
        { content }
      </div>
    )
  }
}


export default connect(['lines', 'comments', 'path'], actions)(View)
