import { h, Component } from 'preact'

import CommentList from '../parts/comment-list'


class FileHeader extends Component {

  shouldComponentUpdate({ path, setHighlightLineNumber }) {
    return !(
      this.props.path === path
      && this.props.setHighlightLineNumber === setHighlightLineNumber
    )
  }

  render({ path, setHighlightLineNumber }) {
    return (
      <div className="cc-file-header">
        <div>
          <a
            href={ `https://github.com${path}` }
            target="_blank"
            rel="noopener noreferrer"
          >
            { path }
          </a>
        </div>
        <div>
          <CommentList handler={ setHighlightLineNumber } />
        </div>
      </div>
    )
  }
}


export default FileHeader
