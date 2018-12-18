import { route as _route } from 'preact-router'


const actions = () => ({
  search_code_and_comment(state, event, route = _route) {
    route('/search_code_and_comment')
  }
})


export default actions
