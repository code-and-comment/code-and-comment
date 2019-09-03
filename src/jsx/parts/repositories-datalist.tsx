import { h, FunctionalComponent } from 'preact'
import { connect } from 'unistore/preact'


type Props = { repositories: string[] }


export const RepositoriesDatalist: FunctionalComponent<Props> =  function ({ repositories }) {
  if (!repositories.length) {
    return null
  }
  return (
    <datalist id="repositories">
      { repositories.map((v) => <option value={ v } key={ v }/>) }
    </datalist>
  )
}


export default connect<{}, {}, {}, Props>(['repositories'])(RepositoriesDatalist)
