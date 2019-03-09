import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit.jsx'


class RepositorySelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repository: ''
    }
    this.setCodeAndComments = this.setCodeAndComments.bind(this)
  }

  setCodeAndComments(event) {
    event.stopPropagation()
    const repository = event.currentTarget.dataset.repository
    this.props.setCodeAndComments(repository)
    this.setState({ repository })
  }

  render({ repositories }, { repository }) {
    return (
      <div className="cc-repository-selector">
        <div key="application-name" className="application-name">{ 'Code and Comment' }</div>
        {
          repositories.map((r) => {
            const className = r === repository ? 'repository selected' : 'repository'
            return (
              <div key={ r }  data-repository={ r } onClick={ this.setCodeAndComments } className={ className }>
                { r }
              </div>
            )
          })
        }
      </div>
    )
  }
}


export default connect(['repositories'], actions)(RepositorySelector)
