import createStore from 'unistore'

export type State = {
  id: number | null,
  highlightLineNumber: number,
  title: string,
  lines: string[],
  git: string,
  path: string,
  comments: Record<string, string>,
  loading: boolean,
  networkError: boolean,
  urlError: boolean,
  // TODO
  codeAndComments: object[],
  searchRepository: string,
  repositories: string[],
  isSelectorOpen?: boolean
}

export function initialState(): State {
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
