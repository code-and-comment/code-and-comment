import { h } from 'preact'
import { useState } from 'preact/hooks'
import { connect } from 'unistore/preact'

import actions from '../actions/start.jsx'
import Navigator from '../parts/navigator.jsx'
import Loading from '../parts/loading.jsx'
import Button from '../parts/button.jsx'


function Start({ back, networkError, urlError, getFile }) {
  const [url, _setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  function setUrl(event) {
    _setUrl(event.target.value)
  }

  function edit() {
    setLoading(true)
    getFile(url)
  }

  return (
    <div className="cc-start">
      { !loading && [
        (<Navigator
          key="0"
          rightLabel="Edit"
          rightClick={ back }
        />),
        (<div className="account" key="1">
          Input the file url in Github<br/>
          Example:<br/>
          https://github.com/developit/preact/blob/10.0.0-alpha.2/src/component.js<br />
          https://github.com/developit/preact/blob/c66ec75176ac5df60824adbe6152ed577fa7b74f/src/component.js<br/>
          https://github.com/developit/preact/blob/master/src/component.js<br/>
        </div>),
        (<div className="controls" key="2">
          <input type="text" className="url" onChange={ setUrl }/>
          <Button onClick={ edit }>Create</Button>
          { networkError && <p>The file data is not got.</p> }
          { urlError && <p>Url is invalid.</p> }
        </div>)
      ]
      }
      { loading && <Loading /> }
    </div>
  )
}


export default connect(['networkError', 'urlError'], actions)(Start)
