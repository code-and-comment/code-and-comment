import { route as _route } from 'preact-router'


const actions = () => ({
  edit(state, event, route = _route) {
    route('/edit')
  },
  save(state, title) {
    title = title.trim()
    if (title) {
      return { saved: true }
    }
  }
})


export default actions
