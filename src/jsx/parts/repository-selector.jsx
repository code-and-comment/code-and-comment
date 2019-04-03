import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions from '../actions/edit.jsx'


class RepositorySelector extends Component {
  constructor(props) {
    super(props)
    this.setCodeAndComments = this.setCodeAndComments.bind(this)
  }

  shouldComponentUpdate({ repositories, searchRepository }) {
    return !(
      this.props.repositories === repositories
      && this.props.selectedRepository === searchRepository)
  }

  setCodeAndComments(event) {
    event.stopPropagation()
    const repository = event.currentTarget.dataset.repository
    this.props.setCodeAndComments(repository)
  }

  render({ repositories, searchRepository }) {
    return (
      <div className="cc-repository-selector">
        <div key="application-name" className="application-name">{ 'Code and Comment' }</div>
        {
          repositories.map((r) => {
            const className = r === searchRepository ? 'repository selected' : 'repository'
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


export default connect(['repositories', 'searchRepository'], actions)(RepositorySelector)
