import createStore from 'unistore'


export function initialState() {
  return {
    id: null,
    highlightLineNumber: 0,
    title: 'New Code and Comment',
    git: '',
    path: '',
    lines: [],
    comments: {},
    viewUrl: '',
    loading: false,
    networkError: false,
    urlError: false,
    codeAndComments: [],
    // for search
    // This is changed at `actions.edit.list()` and `actions.edit.setCodeAndComments()`.
    // This is used when title is changed in the edit page.
    searchRepository: '',
    repositories: []
  }
}

const state = initialState()
state.isSelectorOpen = true


export default createStore(state)
