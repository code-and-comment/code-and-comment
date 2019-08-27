import { h, Component } from 'preact'
import { connect } from 'unistore/preact'

import actions, { setCodeAndCommentsFunc } from '../actions/edit'
import { State } from '../store'


type Props = {
  repositories: State['repositories'],
  searchRepository: State['searchRepository'],
  setCodeAndComments: setCodeAndCommentsFunc
}

export class RepositorySelector extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
    this.setCodeAndComments = this.setCodeAndComments.bind(this)
  }

  shouldComponentUpdate({ repositories, searchRepository }: Props) {
    return !(
      this.props.repositories === repositories
      && this.props.searchRepository === searchRepository)
  }

  setCodeAndComments(event: MouseEvent) {
    // @ts-ignore
    event.stopPropagation()
    // @ts-ignore
    const repository = event.currentTarget.dataset.repository
    this.props.setCodeAndComments(repository)
  }

  render({ repositories, searchRepository }: Props) {
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


export default connect<{}, {}, State, Props>(['repositories', 'searchRepository'], actions)(RepositorySelector)
