import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit.jsx'
import CommentList from '../parts/comment-list.jsx'
import Line from '../parts/line.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'
import Button from '../parts/button.jsx'


function Controls({ cancel, deleteOne, deleting, isDeleting, list }) {
  if (isDeleting) {
    return (
      <div className="controls">
        <div className="message">This code and comment is removed.</div>
        <Button onClick={ deleteOne }>OK</Button>
        { ' ' }
        <Button onClick={ cancel }>Cancel</Button>
      </div>
    )
  }
  else {
    return (
      <div className="controls">
        <Button onClick={ deleting }>Delete</Button>
        { ' ' }
        <Button onClick={ list }>List</Button>
      </div>
    )
  }
}


class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleting: false,
    }
    this.deleting = this.deleting.bind(this)
    this.cancel = this.cancel.bind(this)
    this.deleteOne = props.deleteOne.bind(null, props.id)
  }

  componentWillReceiveProps(nextProps) {
    this.deleteOne = nextProps.deleteOne.bind(null, nextProps.id)
  }

  deleting() {
    this.setState({ isDeleting: true })
  }

  cancel() {
    this.setState({ isDeleting: false })
  }

  render({
    title,
    lines,
    comments,
    path,
    updateComment,
    updateTitle,
    fileUrl,
    publish,
    list
  }, {
    isDeleting
  }) {
    return (
      <div className="cc-edit">
        <Header />
        <Navigator
          leftLabel={ 'Url' }
          leftClick={ fileUrl }
          rightLabel={ 'Publish' }
          rightClick={ publish }
          rightDisabled={ Object.keys(comments).length < 1 }
        />
        <div>
          Click the line. Add the comment by Markdown. Click Publish button.
          When a line number is clicked, the comment is hidden.
        </div>
        <div>
          Title: <input type="text" className="title" value={ title } onChange={ updateTitle } />
        </div>
        <div><CommentList /></div>
        <div>{ path }</div>
        <Controls cancel={ this.cancel } deleting={ this.deleting } deleteOne={ this.deleteOne } isDeleting={ isDeleting } list={ list } />
        <div className="file">
          { lines.map((code, index) => <Line
            key={ index }
            code={ code }
            comment={ comments[index + ''] }
            index={ index }
            updateComment={ updateComment }
            editable={ true }/>
          ) }
        </div>
      </div>
    )
  }
}


export default connect(['id', 'title', 'lines', 'comments', 'path'], actions)(Edit)
