import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/search-code-and-comment.jsx'
import Navigator from '../parts/navigator.jsx'
import CodeAndCommentCard from '../parts/code-and-comment-card.jsx'
import Button from '../parts/button.jsx'
import RepositoriesDatalist from '../parts/repositories-datalist.jsx'


class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repository: '',
    }
    this.setRepository = this.setRepository.bind(this)
    this.search = this.search.bind(this)
  }
  setRepository(event) {
    this.setState({
      repository: event.target.value
    })
  }
  search() {
    this.props.search(this.state)
  }
  render(_, { repository }) {
    return (
      <div className="search">
        <div>
          <span className="label">
            Repository
          </span>
          <input type="text" list="repositories" value={ repository } onChange={ this.setRepository } />
          <RepositoriesDatalist />
        </div>
        <div className="controls">
          <span className="label"></span>
          <Button onClick={ this.search } >Search</Button>
        </div>
      </div>
    )
  }
}


class SearchCodeAndComment extends Component {
  render({ codeAndComments, deleteOne, search, git, back, edit, home }) {
    const list = []
    codeAndComments.forEach((c) => {
      list.push(<CodeAndCommentCard key={ c.id } codeAndComment={ c } edit={ edit } deleteOne={ deleteOne } />)
      list.push(<hr />)
    })
    list.pop()
    return (
      <div className="cc-search-code-and-comment">
        <Navigator
          leftLabel={ 'Home' }
          leftClick={ home }
          rightLabel={ 'Edit' }
          rightClick={ back }
          rightDisabled={ !git }
        />
        <Search search={ search } />
        <div className="list">
          { list.length ? list : 'There is no Code and Comment.' }
        </div>
      </div>
    )
  }
}


export default connect(['git', 'codeAndComments'], actions)(SearchCodeAndComment)
