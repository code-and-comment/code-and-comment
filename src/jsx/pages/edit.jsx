import { h } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit.jsx'
import CommentList from '../parts/comment-list.jsx'
import Line from '../parts/line.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'
import Button from '../parts/button.jsx'


function Edit({
  title,
  lines,
  comments,
  path,
  updateComment,
  updateTitle,
  fileUrl,
  publish,
  list
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
      <div className="controls">
        <Button onClick={ list }>List</Button>
      </div>
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


export default connect(['title', 'lines', 'comments', 'path'], actions)(Edit)
