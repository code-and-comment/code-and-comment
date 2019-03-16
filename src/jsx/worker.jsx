let repositoriesWorker
let codeAndCommentsWorker


export function setRepositoriesWorker(store) {
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


export function setCodeAndCommentsWorker(store) {
  if (!codeAndCommentsWorker) {
    const extension = process.env.NODE_ENV === 'development' ? 'js' : 'min.js' 
    codeAndCommentsWorker = new Worker(`dist/codeAndComments.${extension}`)
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
