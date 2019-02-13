import { route as _route } from 'preact-router'


function back(state, event, route = _route) {
  route('/edit')
}


export default function actions() {
  return {
    back
  }
}
