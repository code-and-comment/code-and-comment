import createStore from 'unistore'


export function initialState() {
  return {
    id: null,
    title: 'New Code and Comment',
    git: '',
    path: '',
    lines: [],
    comments: {},
    viewUrl: '',
    loading: false,
    networkError: false,
    urlError: false,
    saved: false,
    updated: false,
    codeAndComments: [],
    // for search
    // This is changed at `actions.edit.list()` and `actions.edit.setCodeAndComments()`.
    searchRepository: '',
    // repositories: []
  }
}

const store = createStore(initialState())


export default store
