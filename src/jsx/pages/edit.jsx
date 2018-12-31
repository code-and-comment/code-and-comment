import { h } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit.jsx'
import CommentList from '../parts/comment-list.jsx'
import Line from '../parts/line.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'
import Button from '../parts/button.jsx'


function Edit({
  id,
  title,
  lines,
  comments,
  path,
  updateComment,
  fileUrl,
  publish,
  save,
  update,
  list
}) {
  return (
    <div className="cc-edit center">
      <Header />
      <Navigator
        leftLabel={ '<-Url' }
        leftClick={ fileUrl }
        rightLabel={ 'Publish->' }
        rightClick={ publish }
        rightDisabled={ Object.keys(comments).length < 1 }
      />
      <div>
        Click the line. Add the comment by Markdown. Click Publish button.
      </div>
      <div>Title: { title }</div>
      <div><CommentList /></div>
      <div>{ path }</div>
      <div className="controls">
        <Button onClick={ save }>Save</Button>
        { ' ' }
        <Button onClick={ update } disabled={ !id }>Update</Button>
        { ' ' }
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


export default connect(['id', 'title', 'lines', 'comments', 'path'], actions)(Edit)
