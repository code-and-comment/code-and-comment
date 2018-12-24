import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/search-code-and-comment.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'
import CodeAndCommentCard from '../parts/code-and-comment-card.jsx'


class SearchCodeAndComment extends Component {
  render({ codeAndComments, deleteOne, git, back, edit, home }) {
    const length = codeAndComments.length - 1
    const list =  codeAndComments.map((c, i) => {
      if (length == i) {
        return <CodeAndCommentCard key={ c.id } codeAndComment={ c } edit={ edit } deleteOne={ deleteOne } />
      }
      return [<CodeAndCommentCard key={ c.id } codeAndComment={ c } edit={ edit } deleteOne={ deleteOne } />, <hr/>]
    })
    return (
      <div className="cc-search-comment center">
        <Header />
        <Navigator
          leftLabel={ '<-Home' }
          leftClick={ home }
          rightLabel={ 'Edit->' }
          rightClick={ back }
          rightDisabled={ !git }
        />
        <div className="list">
          { list }
        </div>
      </div>
    )
  }
}


export default connect(['git', 'codeAndComments'], actions)(SearchCodeAndComment)
