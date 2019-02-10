let repositoriesWorker
let codeAndCommentsWorker


export function setRepositoriesWorker(store) {
  if (!repositoriesWorker) {
    repositoriesWorker = new Worker('dist/repositories.min.js')
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


export function setCodeAndCommentsWorker(store) {
  if (!codeAndCommentsWorker) {
    codeAndCommentsWorker = new Worker('dist/codeAndComments.min.js')
    codeAndCommentsWorker.addEventListener('message', (event) => {
      store.setState({ codeAndComments: event.data })
    }, false)
  }
}


export function updateCodeAndComments(repository) {
  if (codeAndCommentsWorker) {
    codeAndCommentsWorker.postMessage(repository)
  }
}
