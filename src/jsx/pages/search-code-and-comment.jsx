import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/search-code-and-comment.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'
import CodeAndCommentCard from '../parts/code-and-comment-card.jsx'


class SearchCodeAndComment extends Component {
  render({ codeAndComments, deleteOne, git, back, edit, home }) {
    const list = []
    codeAndComments.forEach((c) => {
      list.push(<CodeAndCommentCard key={ c.id } codeAndComment={ c } edit={ edit } deleteOne={ deleteOne } />)
      list.push(<hr />)
    })
    list.pop()
    return (
      <div className="cc-search-code-and-comment center">
        <Header />
        <Navigator
          leftLabel={ 'Home' }
          leftClick={ home }
          rightLabel={ 'Edit' }
          rightClick={ back }
          rightDisabled={ !git }
        />
        <div className="list">
          { list.length ? list : 'There is no Code and Comment.' }
        </div>
      </div>
    )
  }
}


export default connect(['git', 'codeAndComments'], actions)(SearchCodeAndComment)
