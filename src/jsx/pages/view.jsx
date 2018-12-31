import { h } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/view.jsx'
import CommentList from '../parts/comment-list.jsx'
import Line from '../parts/line.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'
import Loading from '../parts/loading.jsx'


function View({ lines, comments, path, edit, getFile }) {
  let content
  if (lines.length) {
    content = [
      (<Navigator
        key='navigator'
        leftLabel={ 'Edit' }
        leftClick={ edit }
      />),
      <div key='comment-list'><CommentList /></div>,
      <div key='path'>{ path }</div>,
      (<div key='file' className="file">
        { lines.map((code, index) => <Line
          key={ index }
          code={ code }
          comment={ comments[index + ''] }
          index={ index }
          editable={ false }/>
        ) }
      </div>)
    ]
    setTimeout(() => {
      document.querySelector('.comment').scrollIntoView({ block: 'center' })
    }, 0)
  }
  else {
    getFile(location.hash.substring(12))
    content = <Loading />
  }
  return (
    <div className="cc-view center">
      <Header />
      { content }
    </div>
  )
}


export default connect(['lines', 'comments', 'path'], actions)(View)
