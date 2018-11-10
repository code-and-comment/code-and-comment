import { Base64 } from 'js-base64'
import { route as _route } from 'preact-router'

import { initialState } from '../store.jsx'


const actions = () => ({
  updateComment({comments}, index, comment) {
    comments[index] = comment
    return {
      comments: [...comments]
    }
  },
  back(state, event, route = _route) {
    route('/start')
    return initialState()
  },
  publish(state, event, route = _route, location = window.location) {
    const data = {
      git: state.git,
      path: state.path,
      comments: state.comments,
    }
    const data_string = Base64.encodeURI(JSON.stringify(data))
    const viewUrl = `${location.origin}${location.pathname}#/view?data=${data_string}`
    route('/publish')
    return { viewUrl }
  }
})


export default actions
