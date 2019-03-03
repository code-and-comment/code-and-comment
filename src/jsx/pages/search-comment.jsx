import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/search-code-and-comment.jsx'
import Navigator from '../parts/navigator.jsx'
import CommentCard from '../parts/comment-card.jsx'
import Button from '../parts/button.jsx'
import RepositoriesDatalist from '../parts/repositories-datalist.jsx'


class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repository: props.searchRepository,
      comment: ''
    }
    this.search = this.search.bind(this)
    this.setRepository = this.setRepository.bind(this)
    this.setComment = this.setComment.bind(this)
  }
  setRepository(event) {
    this.setState({
      repository: event.target.value
    })
  }
  setComment(event) {
    this.setState({
      comment: event.target.value
    })
  }
  search() {
    const { repository, comment } = this.state
    this.props.search(repository, comment)
  }
  render(_, { repository, comment }) {
    return (
      <div className="search">
        <div>
          <span className="label">
            Repository
          </span>
          <input type="text" list="repositories" value={ repository } onChange={ this.setRepository } />
          <RepositoriesDatalist />
        </div>
        <div>
          <span className="label">
            Comment
          </span>
          <input type="text" value={ comment } onChange={ this.setComment } />
        </div>
        <div className="controls">
          <span className="label"></span>
          <Button onClick={ this.search } >Search</Button>
        </div>
      </div>
    )
  }
}


function CommentList({ codeAndComments, commentPattern, edit }) {
  const list = []
  let re
  if (commentPattern) {
    re = new RegExp(commentPattern)
  }
  codeAndComments.forEach((c) => {
    Object.keys(c.comments).forEach((key) => {
      const comment = c.comments[key]
      const lineNumber = key - 0 + 1
      if (re && !comment.match(re)) {
        return
      }
      list.push(<CommentCard
        key={ `${c.id}_${key}` }
        lineNumber={ lineNumber }
        comment={ comment }
        codeAndComment={ c }
        edit={ edit }
      />)
      list.push(<hr />)
    })
  })
  list.pop()
  return (
    <div className="comment-list">
      { list.length ? list : 'There is no comment.' }
    </div>
  )
}


class SearchComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
    this.search = this.search.bind(this)
  }
  search(repository, comment) {
    this.setState({
      comment
    })
    this.props.search({ repository })
  }
  render({ back, codeAndComments, edit, searchRepository }, { comment }) {
    return (
      <div className="cc-search-comment">
        <Navigator
          rightLabel={ 'Edit' }
          rightClick={ back }
        />
        <Search search={ this.search } searchRepository={ searchRepository } />
        <CommentList codeAndComments={ codeAndComments } commentPattern={ comment } edit={ edit } />
      </div>
    )
  }
}


export default connect(['codeAndComments', 'searchRepository'], actions)(SearchComment)
