import { h, Component, ComponentChild } from 'preact'
import { connect } from 'unistore/preact'

import actions, { IDeleteOne, IBack, ISearch, IEdit } from '../actions/search-code-and-comment'
import Navigator from '../parts/navigator'
import CodeAndCommentCard from '../parts/code-and-comment-card'
import Button from '../parts/button'
import RepositoriesDatalist from '../parts/repositories-datalist'
import { State, CodeAndComment } from '../store'


type SearchProps = {
  search: ISearch
  searchRepository: string
}


interface SearchState {
  repository: string
}


class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props)
    this.state = {
      repository: props.searchRepository,
    }
    this.setRepository = this.setRepository.bind(this)
    this.search = this.search.bind(this)
  }
  setRepository(event: Event) {
    this.setState({
      // @ts-ignore
      repository: event.target.value
    })
  }
  search(event: Event) {
    event.stopPropagation()
    this.props.search(this.state)
  }
  render(_: SearchProps, { repository }: SearchState) {
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
          <Button onClick={ this.search }>Search</Button>
        </div>
      </div>
    )
  }
}


interface I {
  codeAndComments: CodeAndComment[]
  deleteOne: IDeleteOne
  search: ISearch
  back: IBack
  edit: IEdit
  searchRepository: string
}


class SearchCodeAndComment extends Component<I> {
  render({ codeAndComments, deleteOne, search, back, edit, searchRepository }: I) {
    const list: ComponentChild[] = []
    codeAndComments.forEach((c) => {
      list.push(<CodeAndCommentCard key={ c.id } codeAndComment={ c } edit={ edit } deleteOne={ deleteOne } />)
      list.push(<hr />)
    })
    // remove last <hr />
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


export default connect<{}, {}, State, I>(['codeAndComments', 'searchRepository'], actions)(SearchCodeAndComment)
