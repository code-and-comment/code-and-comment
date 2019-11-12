import { Store } from 'unistore'
import { State } from './store'


let repositoriesWorker: Worker | null = null
let codeAndCommentsWorker: Worker | null = null


export function setRepositoriesWorker(store: Store<State>) {
  if (!repositoriesWorker) {
    const extension = process.env.NODE_ENV === 'development' ? 'js' : 'min.js' 
    repositoriesWorker = new Worker(`dist/repositories.${extension}`)
    repositoriesWorker.addEventListener('message', (event) => {
      store.setState({ repositories: event.data })
    }, false)
  }
}

export function updateRepositories() {
  if (repositoriesWorker) {
    repositoriesWorker.postMessage(null)
  }
}


export function setCodeAndCommentsWorker(store: Store<State>) {
  if (!codeAndCommentsWorker) {
    const extension = process.env.NODE_ENV === 'development' ? 'js' : 'min.js' 
    codeAndCommentsWorker = new Worker(`dist/codeAndComments.${extension}`)
    codeAndCommentsWorker.addEventListener('message', (event) => {
      store.setState({ codeAndComments: event.data })
    }, false)
  }
}


export function updateCodeAndComments(repository: string) {
  if (codeAndCommentsWorker) {
    codeAndCommentsWorker.postMessage(repository)
  }
}
