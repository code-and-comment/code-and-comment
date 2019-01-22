import { route as _route } from 'preact-router'


function back(state, event, route = _route) {
  route('/edit')
}


const actions = () => ({
  back
})


export default actions
