import { route as _route } from 'preact-router'


const actions = () => ({
  back(state, event, route = _route) {
    route('/edit')
  }
})


export default actions