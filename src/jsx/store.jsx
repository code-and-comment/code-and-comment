import createStore from 'unistore'


export function initialState() {
  return {
    id: null,
    git: '',
    path: '',
    lines: [],
    comments: {},
    viewUrl: '',
    loading: false,
    networkError: false,
    urlError: false
  }
}

const store = createStore(initialState())


export default store
