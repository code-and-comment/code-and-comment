import { h, render, Component } from 'preact'
import Router from 'preact-router'
import createHashHistory from 'history/createHashHistory'
import { Provider } from 'unistore/preact'
import { route } from 'preact-router'

import store from './store.jsx'
import { updateRepositories } from './worker.jsx'
import Start from './pages/start.jsx'
import Edit from './pages/edit.jsx'
import Publish from './pages/publish.jsx'
import View from './pages/view.jsx'
import Home from './pages/home.jsx'
import SearchCodeAndComment from './pages/search-code-and-comment.jsx'
import SearchComment from './pages/search-comment.jsx'


const REDIRECT_URLS = ['/edit', '/publish', '/update', '/search_code_and_comment', '/search_comment']


class CodeAndComment extends Component {
  constructor(props) {
    super(props)
    this.isFirst = true
    this.changeRoute = this.changeRoute.bind(this)
  }

  changeRoute(event) {
    if (this.isFirst && REDIRECT_URLS.includes(event.url)) {
      route('/home')
    }
    this.isFirst = false
  }

  render() {
    return (
      <Provider store={ store }>
        <Router history={ createHashHistory() } onChange={ this.changeRoute }>
          <Edit path="/edit" />
          <Publish path="/publish" />
          <View path="/view" />
          <Start path="/start" />
          <SearchCodeAndComment path="/search_code_and_comment" />
          <SearchComment path="/search_comment" />
          <Home default />
        </Router>
      </Provider>
    )
  }
}

render(<CodeAndComment />, document.body)


updateRepositories(store)
