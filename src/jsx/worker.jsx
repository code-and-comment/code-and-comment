let repositoriesWoker

export function updateRepositories(store) {
  if (!repositoriesWoker) {
    repositoriesWoker = new Worker('dist/repositories.min.js')
    repositoriesWoker.addEventListener('message', (event) => {
      store.setState({ repositories: event.data })
    }, false)
  }
  repositoriesWoker.postMessage(null)
}
