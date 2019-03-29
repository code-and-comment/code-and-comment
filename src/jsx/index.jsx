import { h, render, Component } from 'preact'
import Router from 'preact-router'
import { createHashHistory } from 'history'
import { Provider } from 'unistore/preact'
import { route } from 'preact-router'

import store from './store.jsx'
import {
  setRepositoriesWorker,
  setCodeAndCommentsWorker,
  updateRepositories
} from './worker.jsx'
import Start from './pages/start.jsx'
import Edit from './pages/edit.jsx'
import SearchCodeAndComment from './pages/search-code-and-comment.jsx'
import SearchComment from './pages/search-comment.jsx'
import Reference from './pages/reference.jsx'


const REDIRECT_URLS = ['/search_code_and_comment', '/search_comment']


class CodeAndComment extends Component {
  constructor(props) {
    super(props)
    this.isFirst = true
    this.changeRoute = this.changeRoute.bind(this)
  }

  changeRoute(event) {
    if (this.isFirst && REDIRECT_URLS.includes(event.url)) {
      setTimeout(() => {
        route('/edit')
      })
    }
    this.isFirst = false
  }

  render() {
    return (
      <Provider store={ store }>
        <Router history={ createHashHistory() } onChange={ this.changeRoute }>
          <Start path="/start" />
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

window.requestIdleCallback(() => {
  setRepositoriesWorker(store)
  updateRepositories()
  setCodeAndCommentsWorker(store)
})
