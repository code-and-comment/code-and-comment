import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/save.jsx'
import Header from '../parts/header.jsx'
import Navigator from '../parts/navigator.jsx'
import Button from '../parts/button.jsx'

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
  render({ edit, saved }, { title }) {
    let content
    if (saved) {
      content = <div className="content">The code and comment was saved.</div>
    }
    else {
      content = (
        <div className="content">
          <p>If you want to save the code and comment, Please input the title for code and comment.</p>
          Title: <input type="text" className="title" value={ title } onChange={ this.setTitle } />
          <Button onClick={ this.save }>Save</Button>
        </div>
      )
    }
    return (
      <div className="cc-save">
        <Header />
        <Navigator
          leftLabel={ 'Edit' }
          leftClick={ edit }
        />
        { content }
      </div>
    )
  }
}


export default connect(['saved', 'title'], actions)(Save)
