import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/save.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'

class Save extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
    }
    this.setTitle = this.setTitle.bind(this)
    this.save = this.save.bind(this)
  }
  setTitle(e) {
    this.setState({ title: e.target.value })
  }
  save() {
    this.props.save(this.state.title)
  }
  render({ edit, save, saved }, { title }) {
    let content
    if (saved) {
      content = <p>The code and comment was saved.</p>
    }
    else {
      content = (
        <div>
          Title: <input type="text" className="title" value={ title } onChange={ this.setTitle } />
          <button onClick={ this.save }>Save</button>
        </div>
      )
    }
    return (
      <div className="cc-save center">
        <Header />
        <Navigator
          leftLabel={ '<-Edit' }
          leftClick={ edit }
        />
        <p>If you want to save the code and comment, Please input the title for code and comment.</p>
        { content }
      </div>
    )
  }
}


export default connect(['saved', 'title'], actions)(Save)
