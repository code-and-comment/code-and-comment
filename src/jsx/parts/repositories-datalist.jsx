import { h } from 'preact'
import { connect } from 'unistore/preact'


export function RepositoriesDatalist({ repositories }) {
  if (!repositories.length) {
    return
  }
  return (
    <datalist id="repositories">
      { repositories.map((v) => <option value={ v } key={ v }/>) }
    </datalist>
  )
}


export default connect(['repositories'])(RepositoriesDatalist)
