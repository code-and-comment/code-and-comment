import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/search-code-and-comment.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'
import CommentCard from '../parts/comment-card.jsx'
import Button from '../parts/button.jsx'


class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repository: '',
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
          <input type="text" value={ repository } onChange={ this.setRepository } />
        </div>
        <div>
          <span className="label">
            Comment
          </span>
          <input type="text" value={ comment } onChange={ this.setComment } />
        </div>
        <div className="controls">
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
    Object.values(c.comments).forEach((comment, i) => {
      if (re && !comment.match(re)) {
        return
      }
      list.push(<CommentCard key={ `${c.id}_${i}` } comment={ comment } codeAndComment={ c } edit={ edit } />)
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
  render({ codeAndComments, edit, home }, { comment }) {
    return (
      <div className="cc-search-comment center">
        <Header />
        <Navigator leftLabel={ 'Home' } leftClick={ home } />
        <Search search= { this.search } />
        <CommentList codeAndComments={ codeAndComments } commentPattern={ comment } edit={ edit } />
      </div>
    )
  }
}


export default connect(['codeAndComments'], actions)(SearchComment)
