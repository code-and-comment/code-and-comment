import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/view.jsx'
import CommentList from '../parts/comment-list.jsx'
import Line from '../parts/line.jsx'
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
          leftLabel={ 'Edit' }
          leftClick={ edit }
        />),
        (<div key="path">
          <a
            href={ `https://github.com${path}` }
            target="_blank"
            rel="noopener noreferrer"
          >
            { path }
          </a>
        </div>),
        <div key="comment-list"><CommentList handler={ this.setHighlightLineNumber } /></div>,
        (<div key="file" className="file">
          { lines.map((code, index) => {
            return (<Line
              key={ index }
              code={ code }
              comment={ comments[index + ''] }
              index={ index }
              editable={ false }
              isHighlight={ highlightLineNumber === (index + 1) }
              setHighlightLineNumber={ this.setHighlightLineNumber }
            />)
          }) }
        </div>)
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
