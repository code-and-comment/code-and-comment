import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/start.jsx'
import Header from '../parts/header.jsx'

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
  render({ loading, networkError, urlError }, { url }) {
    return (
      <div className="start center">
        <Header />
        {!loading && [
          (<div key='1'>
            Input the file url in Github<br/>
            Example:<br/>
            https://github.com/developit/preact/blob/377e31b5c6d42c4ca92085571d5d4f0c9dbe4ba2/src/vdom/component.js<br/>
            https://github.com/developit/preact/blob/master/src/vdom/component.js<br/>
          </div>),
          <input type="text" key="2" value={url} className="url" onChange={this.setUrl}/>,
          <button key="3" onClick={this.edit}>{ 'Edit->' }</button>,
          networkError && <p key="4">The file data is not got.</p>,
          urlError && <p key="5">Url is invalid.</p>
        ]
        }
        {loading && 'Loading'}
      </div>
    )
  }
}


export default connect(['loading', 'networkError', 'urlError'], actions)(Start)
