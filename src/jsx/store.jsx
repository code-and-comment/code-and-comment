import createStore from 'unistore'


export function initialState() {
  return {
    id: null,
    highlightLineNumber: 0,
    title: 'New Code and Comment',
    lines: [],
    git: '',
    path: '',
    comments: {},
    loading: false,
    networkError: false,
    urlError: false,
    codeAndComments: [],
    // for search and RepositorySelector component
    searchRepository: '',
    repositories: []
  }
}

const state = initialState()
state.isSelectorOpen = true


export default createStore(state)
