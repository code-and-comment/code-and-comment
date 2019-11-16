import { h, Component } from 'preact'

import CommentList from '../parts/comment-list'


interface Props {
  path: string
  setHighlightLineNumber: (event: Event) => void
}


class FileHeader extends Component<Props> {

  shouldComponentUpdate({ path, setHighlightLineNumber }: Props) {
    return !(
      this.props.path === path
      && this.props.setHighlightLineNumber === setHighlightLineNumber
    )
  }

  render({ path, setHighlightLineNumber }: Props) {
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
