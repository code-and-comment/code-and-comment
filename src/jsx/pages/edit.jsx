import { h } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit.jsx'
import Line from '../parts/line.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'


function Edit({ lines, comments, path, updateComment, back, publish }) {
  return (
    <div className="edit center">
      <Header />
      <div>
        Click the line. Add the comment by Markdown. Click Publish button.
      </div>
      <Navigator
        leftLabel={'<-Back'}
        leftClick={back}
        rightLabel={'Publish->'}
        rightClick={publish}
        rightDisabled={!comments.length && !Object.values(comments).some(c => c)}
      />
      <div>{ path }</div>
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


export default connect(['lines', 'comments', 'path'], actions)(Edit)
