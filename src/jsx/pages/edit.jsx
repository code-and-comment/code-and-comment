import { h } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit.jsx'
import CommentList from '../parts/comment-list.jsx'
import Line from '../parts/line.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'


function Edit({
  title,
  lines,
  comments,
  path,
  updateComment,
  back,
  publish,
  save
}) {
  return (
    <div className="cc-edit center">
      <Header />
      <div>
        Click the line. Add the comment by Markdown. Click Publish button.
      </div>
      <Navigator
        leftLabel={'<-Back'}
        leftClick={back}
        rightLabel={'Publish->'}
        rightClick={publish}
        rightDisabled={Object.keys(comments).length < 1}
      />
      <div>Title: { title }</div>
      <div><CommentList /></div>
      <div>{ path }</div>
      <div><button onClick={save}>Save</button></div>
      <div className="file">
        {lines.map((code, index) => <Line 
          key={index}
          code={code}
          comment={comments[index + '']}
          index={index}
          updateComment={updateComment}
          editable={true}/>
        )}
      </div>
    </div>
  )
}


export default connect(['title', 'lines', 'comments', 'path'], actions)(Edit)
