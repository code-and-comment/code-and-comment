import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/search-code-and-comment.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'
import CommentCard from '../parts/comment-card.jsx'


class SearchComment extends Component {
  render({ codeAndComments, deleteOne, git, back, edit, home }) {
    const list = []
    codeAndComments.forEach((c) => {
        Object.values(c.comments).forEach((comment, i) => {
          list.push(<CommentCard key={ `${c.id}_${i}` } comment={ comment } codeAndComment={ c } edit={ edit } />)
          list.push(<hr />)
        })
    })
    list.pop()
    return (
      <div className="cc-search-comment center">
        <Header />
        <Navigator
          leftLabel={ '<-Home' }
          leftClick={ home }
        />
        <div className="list">
          { list.length ? list : 'There is no comment.' }
        </div>
      </div>
    )
  }
}


export default connect(['codeAndComments'], actions)(SearchComment)
