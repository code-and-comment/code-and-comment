import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/search-code-and-comment'
import Navigator from '../parts/navigator'
import CodeAndCommentCard from '../parts/code-and-comment-card'
import Button from '../parts/button'
import RepositoriesDatalist from '../parts/repositories-datalist'


class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repository: props.searchRepository,
    }
    this.setRepository = this.setRepository.bind(this)
    this.search = this.search.bind(this)
  }
  setRepository(event) {
    this.setState({
      repository: event.target.value
    })
  }
  search(event) {
    event.stopPropagation()
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
  render({ codeAndComments, deleteOne, search, back, edit, searchRepository }) {
    const list = []
    codeAndComments.forEach((c) => {
      list.push(<CodeAndCommentCard key={ c.id } codeAndComment={ c } edit={ edit } deleteOne={ deleteOne } />)
      list.push(<hr />)
    })
    list.pop()
    return (
      <div className="cc-search-code-and-comment">
        <Navigator
          rightLabel={ 'Edit' }
          rightClick={ back }
        />
        <Search search={ search } searchRepository={ searchRepository } />
        <div className="list">
          { list.length ? list : 'There is no Code and Comment.' }
        </div>
      </div>
    )
  }
}


export default connect(['codeAndComments', 'searchRepository'], actions)(SearchCodeAndComment)
