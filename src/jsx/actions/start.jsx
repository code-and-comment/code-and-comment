import { Base64 } from 'js-base64'
import { route as _route } from 'preact-router'


const actions = () => ({
  setLoading(state, loading) {
    return { loading }
  },
  async getFile(state, url, route = _route, fetch = window.fetch) {
    url = url.trim()
    const re = /^https:\/\/github.com\/(.+)\/blob\/([^\/]+)\/(.+)/
    const matches = url.match(re)

    if (!matches) {
      return {
        loading: false,
        networkError: false,
        urlError: true
      }
    }

    const apiUrl = `https://api.github.com/repos/${matches[1]}/contents/${matches[3]}?ref=${matches[2]}`

    const data = await fetch(apiUrl)
      .then(response => {
        if (response.ok) {
          route('/edit')
          return response.json()
        }
        return null
      })

    if (data && data.type === 'file') {
      const git = data._links.git
      const path = url.substring(18)
      const lines = Base64.decode(data.content).split('\n')
      const comments = {}
      return {
        loading: false,
        git,
        path,
        lines,
        comments,
        networkError: false,
        urlError: false
      }
    }

    return {
      loading: false,
      networkError: true,
      urlError: false
    }
  }
})


export default actions
