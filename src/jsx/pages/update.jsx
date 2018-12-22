import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/update.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'

class Update extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
    }
    this.setTitle = this.setTitle.bind(this)
    this.update = this.update.bind(this)
  }
  setTitle(e) {
    this.setState({ title: e.target.value })
  }
  update() {
    this.props.update(this.state.title)
  }
  render({ edit, updated }, { title }) {
    let content
    if (updated) {
      content = <p>The code and comment was updated.</p>
    }
    else {
      content = (
        <div>
          Title: <input type="text" className="title" value={ title } onChange={ this.setTitle } />
          <button onClick={ this.update }>Update</button>
        </div>
      )
    }
    return (
      <div className="cc-update center">
        <Header />
        <Navigator
          leftLabel={ '<-Edit' }
          leftClick={ edit }
        />
        <p>If you want to update the code and comment, Please input the title for code and comment.</p>
        { content }
      </div>
    )
  }
}


export default connect(['updated', 'title'], actions)(Update)
