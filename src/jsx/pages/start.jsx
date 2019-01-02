import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/start.jsx'
import Navigator from '../parts/navigator.jsx'
import Header from '../parts/header.jsx'
import Loading from '../parts/loading.jsx'
import Button from '../parts/button.jsx'

class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
    }
    this.setUrl = this.setUrl.bind(this)
    this.edit = this.edit.bind(this)
  }
  setUrl(e) {
    this.setState({ url: e.target.value })
  }
  edit() {
    this.props.setLoading(true)
    this.props.getFile(this.state.url)
  }
  render({ home, loading, networkError, urlError }) {
    return (
      <div className="cc-start">
        <Header />
        <Navigator
          leftLabel={ 'Home' }
          leftClick={ home }
        />
        { !loading && [
          (<div className="account" key='1'>
            Input the file url in Github<br/>
            Example:<br/>
            https://github.com/developit/preact/blob/377e31b5c6d42c4ca92085571d5d4f0c9dbe4ba2/src/vdom/component.js<br/>
            https://github.com/developit/preact/blob/master/src/vdom/component.js<br/>
          </div>),
          (<div className="controls" key="2">
            <input type="text" className="url" onChange={ this.setUrl }/>
            <Button onClick={ this.edit }>Edit<img src="dist/arrow-forward.svg" /></Button>
            { networkError && <p>The file data is not got.</p> }
            { urlError && <p>Url is invalid.</p> }
          </div>)
        ]
        }
        { loading && <Loading /> }
      </div>
    )
  }
}


export default connect(['loading', 'networkError', 'urlError'], actions)(Start)
