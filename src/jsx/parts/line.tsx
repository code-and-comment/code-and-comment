import { h, Component } from 'preact'

import Code from './code'
import Comment from './comment.jsx'


interface Props {
  id: number
  index: number
  code: string
  hiddenSignal: boolean
  comment: string
  editable: boolean
  isHighlight: boolean
  isMarked: boolean
  setMarkedLineNumber: Function
  scrollToMarkedLineNumber: Function
  updateComment: Function
}


interface State {
  isEditing: boolean
  isHidden: boolean
}


class Line extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isEditing: false,
      isHidden: false
    }
    this.edit = this.edit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.save = this._save.bind(this, props.index)
    this.delete = this.delete.bind(this, props.index)
    this.toggleHidden = this.toggleHidden.bind(this)
  }

  shouldComponentUpdate({ id, index, code, comment, isHighlight, isMarked }: Props, { isEditing, isHidden }: State) {
    return !(this.props.id === id
        && this.props.index === index
        && this.props.code === code
        && this.props.comment === comment
        && this.props.isHighlight === isHighlight
        && this.props.isMarked === isMarked
        && this.state.isEditing === isEditing
        && isEditing === false
        && this.state.isHidden === isHidden
        && isHidden === false)
  }

  componentWillReceiveProps({ id, comment, hiddenSignal }: Props) {
    if (this.props.id !== id) {
      this.setState({
        isEditing: false,
        isHidden: false
      })
    }
    if (comment && hiddenSignal) {
      this.setState({
        isHidden: true
      })
    }
  }

  toggleHidden(event: MouseEvent) {
    event.stopPropagation()
    this.setState({ isHidden: !this.state.isHidden })
  }

  edit() {
    // @ts-ignore
    if (window.getSelection().isCollapsed) {
      this.setState({ isEditing: true })
    }
  }

  cancel() {
    this.setState({ isEditing: false })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save(comment: string) {
  }

  _save(index: number, comment: string) {
    this.props.updateComment(index, comment)
    // @ts-ignore
    window.requestIdleCallback(() => {
      this.setState({ isEditing: false })
    })
  }

  delete(index: number) {
    this.props.updateComment(index, '')
    // @ts-ignore
    window.requestIdleCallback(() => {
      this.setState({ isEditing: false })
    })
  }

  render({
    id,
    index,
    code,
    comment,
    editable,
    isHighlight,
    isMarked,
    setMarkedLineNumber,
    scrollToMarkedLineNumber,
  }: Props,
  {
    isEditing,
    isHidden
  }: State) {
    let className = 'cc-line'
    if (isMarked) {
      className += ' cc-marked'
    }
    else if (isHighlight) {
      className += ' cc-highlight'
    }
    const lineNumber = index + 1
    return (
      <div className={ className }>
        <Code
          lineNumber={ lineNumber }
          content={ code }
          edit={ this.edit }
          editable={ editable }
          isHidden={ isHidden }
          toggleHidden={ comment ? this.toggleHidden : undefined }
          setMarkedLineNumber={ setMarkedLineNumber }
          scrollToMarkedLineNumber={ scrollToMarkedLineNumber }
        />
        { !isHidden && <Comment
          id={ id }
          lineNumber={ lineNumber }
          comment={ comment || '' }
          isEditing={ isEditing }
          cancel={ this.cancel }
          save={ this.save }
          delete={ this.delete }
        /> }
      </div>
    )
  }
}


export default Line
