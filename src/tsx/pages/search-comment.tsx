import { h, Component, ComponentChild } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/search-code-and-comment'
import Navigator from '../parts/navigator'
import CommentCard from '../parts/comment-card'
import Button from '../parts/button'
import RepositoriesDatalist from '../parts/repositories-datalist'
import { State, CodeAndComment } from '../store'


type SearchProps = {
  search: Function
  searchRepository: string
}


interface SearchState {
  repository: string
  comment: string
}


class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props)
    this.state = {
      repository: props.searchRepository,
      comment: ''
    }
    this.search = this.search.bind(this)
    this.setRepository = this.setRepository.bind(this)
    this.setComment = this.setComment.bind(this)
  }
  setRepository(event: Event) {
    this.setState({
      // @ts-ignore
      repository: event.target.value
    })
  }
  setComment(event: Event) {
    this.setState({
      // @ts-ignore
      comment: event.target.value
    })
  }
  search() {
    const { repository, comment } = this.state
    this.props.search(repository, comment)
  }
  render(_: SearchProps, { repository, comment }: SearchState) {
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


interface Props {
  codeAndComments: CodeAndComment[]
  commentPattern: string
  edit: Function
}


function CommentList({ codeAndComments, commentPattern, edit }: Props) {
  const list: ComponentChild[] = []
  let re: RegExp
  if (commentPattern) {
    re = new RegExp(commentPattern)
  }
  codeAndComments.forEach((c) => {
    Object.keys(c.comments).forEach((key) => {
      const comment = c.comments[key]
      // @ts-ignore
      const code = c.lines[key - 0]
      // @ts-ignore
      const lineNumber = key - 0 + 1
      if (re && !comment.match(re)) {
        return
      }
      list.push(<CommentCard
        key={ `${c.id}_${key}` }
        id={ c.id }
        path={ c.path }
        title={ c.title }
        code={ code }
        comment={ comment }
        repository={ c.repository }
        lineNumber={ lineNumber }
        updated_at={ c.updated_at }
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


interface I {
  back: (event: MouseEvent) => any
  codeAndComments: CodeAndComment[]
  edit: Function
  search: Function
  searchRepository: string
}


interface S {
  comment: string
}


class SearchComment extends Component<I, S> {
  constructor(props: I) {
    super(props)
    this.state = {
      comment: ''
    }
    this.search = this.search.bind(this)
  }
  search(repository: string, comment: string) {
    this.setState({
      comment
    })
    this.props.search({ repository })
  }
  render({ back, codeAndComments, edit, searchRepository }: I, { comment }: S) {
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


export default connect<{}, S, State, I>(['codeAndComments', 'searchRepository'], actions)(SearchComment)
