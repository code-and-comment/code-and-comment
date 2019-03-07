import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/start.jsx'
import Navigator from '../parts/navigator.jsx'
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
  render({ back, loading, networkError, urlError }) {
    return (
      <div className="cc-start">
        { !loading && [
          (<Navigator
            key={ '0' }
            rightLabel={ 'Edit' }
            rightClick={ back }
          />),
          (<div className="account" key='1'>
            Input the file url in Github<br/>
            Example:<br/>
            https://github.com/developit/preact/blob/10.0.0-alpha.0/src/component.js<br />
            https://github.com/developit/preact/blob/c66ec75176ac5df60824adbe6152ed577fa7b74f/src/component.js<br/>
            https://github.com/developit/preact/blob/master/src/component.js<br/>
          </div>),
          (<div className="controls" key="2">
            <input type="text" className="url" onChange={ this.setUrl }/>
            <Button onClick={ this.edit }>Create</Button>
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
