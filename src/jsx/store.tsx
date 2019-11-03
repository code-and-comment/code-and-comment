import createStore from 'unistore'


export interface CodeAndComment {
  id: number;
  comments: Record<string, string>;
  git: string;
  repository: string;
  path: string;
  title: string;
  updated_at: Date;
}


export interface State {
  id: number | null;
  highlightLineNumber: number;
  title: string;
  lines: string[];
  git: string;
  path: string;
  comments: Record<string, string>;
  loading: boolean;
  networkError: boolean;
  urlError: boolean;
  codeAndComments: CodeAndComment[];
  searchRepository: string;
  repositories: string[];
  isSelectorOpen?: boolean;
  token?: string;
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
state.token = ''


export default createStore(state)
