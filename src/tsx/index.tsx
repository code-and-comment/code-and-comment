import { h, render, Component } from 'preact'
import Router from 'preact-router'
import { createHashHistory } from 'history'
import { Provider } from 'unistore/preact'
import { route, RouterOnChangeArgs } from 'preact-router'

import store from './store'
import {
  setRepositoriesWorker,
  setCodeAndCommentsWorker,
  updateRepositories
} from './worker'
import Edit from './pages/edit'
import SearchCodeAndComment from './pages/search-code-and-comment'
import SearchComment from './pages/search-comment'
import Reference from './pages/reference'


const REDIRECT_URLS = ['/search_code_and_comment', '/search_comment']


interface Props {}


class CodeAndComment extends Component<Props> {
  isFirst: boolean

  constructor(props: Props) {
    super(props)
    this.isFirst = true
    this.changeRoute = this.changeRoute.bind(this)
  }

  changeRoute(event: RouterOnChangeArgs) {
    if (this.isFirst && REDIRECT_URLS.includes(event.url)) {
      // @ts-ignore
      requestIdleCallback(() => {
        route('/')
      })
    }
    this.isFirst = false
  }

  render() {
    return (
      <Provider store={ store }>
        <Router history={ createHashHistory() } onChange={ this.changeRoute }>
          <SearchCodeAndComment path="/search_code_and_comment" />
          <SearchComment path="/search_comment" />
          <Reference path="/r/:id/:lineNumber" />
          <Edit default />
        </Router>
      </Provider>
    )
  }
}

render(<CodeAndComment />, document.body)

// @ts-ignore
requestIdleCallback(() => {
  setRepositoriesWorker(store)
  updateRepositories()
  setCodeAndCommentsWorker(store)
})
