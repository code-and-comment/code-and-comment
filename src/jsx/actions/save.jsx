import { route as _route } from 'preact-router'


const actions = () => ({
  edit(state, event, route = _route) {
    route('/edit')
  }
})


export default actions
