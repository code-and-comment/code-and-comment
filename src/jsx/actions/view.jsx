import { Base64 } from 'js-base64'
import { route as _route } from 'preact-router'


const actions = () => ({
  back(state, event, route = _route) {
    route('/edit')
  },
  async getFile(state, paramJson, route = _route, fetch = window.fetch) {
    let param;
    try {
      if (paramJson) {
        param = JSON.parse(Base64.decode(paramJson))
      }
    }
    catch(e) {
      return route('/start')
    }

    if (!param || !param.git || !param.path) {
      return route('/start')
    }

    const data = await fetch(param.git)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        return null
      })

    if (data) {
      const { git, path, comments } = param
      const lines = Base64.decode(data.content).split('\n')
      const _comments = []
      _comments.length = lines.length
      _comments.fill('')
      Object.keys(comments).forEach((n) => {
        _comments[n - 0] = comments[n]
      })
      return {
        git,
        path,
        lines,
        comments: _comments,
        networkError: false,
        urlError: false
      }
    }

    route('/start')
  }
})


export default actions
