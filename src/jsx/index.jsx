import { h, render, Component } from 'preact'
import Router from 'preact-router'
import createHashHistory from 'history/createHashHistory'
import { Provider } from 'unistore/preact'
import { route } from 'preact-router'

import store from './store.jsx'
import Start from './pages/start.jsx'
import Edit from './pages/edit.jsx'
import Publish from './pages/publish.jsx'
import View from './pages/view.jsx'
import Save from './pages/save.jsx'


const REDIRECT_URLS = ['/edit', '/publish', '/save']


class CodeAndComment extends Component {
  constructor(props) {
    super(props)
    this.isFirst = true
    this.changeRoute = this.changeRoute.bind(this)
  }

  changeRoute(event) {
    if (this.isFirst && REDIRECT_URLS.includes(event.url)) {
      route('/start')
    }
    this.isFirst = false
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={createHashHistory()} onChange={this.changeRoute}> 
          <Edit path="/edit" />
          <Publish path="/publish" />
          <View path="/view" />
          <Save path="/save" />
          <Start default />
        </Router>
      </Provider>
    )
  }
}

render(<CodeAndComment />, document.body)
