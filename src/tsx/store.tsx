import createStore from 'unistore'


export interface CodeAndComment {
  id: number
  lines: string[]
  // key is index of lines
  comments: Record<string, string>
  git: string
  repository: string
  path: string
  title: string
  updated_at: Date
  created_at: Date
}


export interface Popup {
  left: number
  top: number
  width: number
  // key is index of lines
  lines: Record<string, string>
}


export interface State {
  id: number | null
  highlightLineNumber: number
  title: string
  lines: string[]
  git: string
  path: string
  comments: Record<string, string>
  loading: boolean
  networkError: boolean
  urlError: boolean
  codeAndComments: CodeAndComment[]
  searchRepository: string
  repositories: string[]
  popup: Popup | null
  isSelectorOpen?: boolean
  token?: string
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
    repositories: [],
    popup: null
  }
}


const state = initialState()
state.isSelectorOpen = true
state.token = ''


export default createStore(state)
