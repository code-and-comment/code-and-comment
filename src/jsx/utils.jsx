import { initialState } from './store'


export function getIndexName(conditions) {
  let { repository } = conditions
  repository = repository && repository.trim()
  if (repository) {
    return 'repository'
  }
  else {
    return 'updated_at'
  }
}


export function getRange(conditions, bound) {
  let { repository } = conditions
  repository = repository && repository.trim()
  if (repository) {
    return bound([repository, new Date(0)], [repository, new Date()])
  }
}


export async function search(
  conditions,
  getDB,
  getObjectStore,
  getAllRecords,
  bound = IDBKeyRange.bound,
  direction = 'prev',
  withLines = false
) {
  const indexName = getIndexName(conditions)
  const range = getRange(conditions, bound)
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const codeAndComments = await getAllRecords(objectStore, indexName, range, direction, withLines)
  return codeAndComments
}


export async function transfer(
  path,
  route,
  getDB,
  getObjectStore,
  getAllRecords,
  setTimeout,
  bound
) {
  const codeAndComments = await search({}, getDB, getObjectStore, getAllRecords, bound)
  setTimeout(() => {
    route(path)
  }, 0)
  return { codeAndComments, searchRepository: '' }
}


export function getRepository(path) {
  if (!path) {
    return ''
  }
  const parts = path.split('/')
  return `${parts[1]}/${parts[2]}`
}


export async function saveCodeAndComment(
  state,
  getDB,
  getObjectStore,
  addRecord
) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const repository = getRepository(state.path)
  // TODO add error process
  const event = await addRecord(objectStore, {
    title: state.title,
    git: state.git,
    path: state.path,
    lines: state.lines,
    comments: state.comments,
    repository
  })
  return event.target.result
}


export async function updateCodeAndComment(
  state,
  getDB,
  getObjectStore,
  putRecord
) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const repository = getRepository(state.path)
  // TODO add error process
  await putRecord(objectStore, {
    id: state.id,
    title: state.title,
    git: state.git,
    path: state.path,
    lines: state.lines,
    comments: state.comments,
    repository,
  })
}


export async function deleteOne(id, getDB, getObjectStore, deleteRecord) {
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  await deleteRecord(objectStore, id)
}


export function getStateAfterDeleting(state, codeAndComments) {
  const _initialState = initialState()
  _initialState.codeAndComments = codeAndComments
  _initialState.repositories = state.repositories
  _initialState.searchRepository = state.searchRepository
  return _initialState
}


export function scrollIntoView(highlightLineNumber, _document = document) {
  const selector = `.cc-line:nth-child(${highlightLineNumber})`
  _document.querySelector(selector).scrollIntoView({
    block: 'center',
  })
}


export async function edit(
  id,
  highlightLineNumber,
  route,
  requestIdleCallback,
  getDB,
  getObjectStore,
  getRecord,
  getRepository,
  updateRepositories,
  updateCodeAndComments,
) {
  id -= 0
  highlightLineNumber -= 0
  const db = await getDB()
  const objectStore = await getObjectStore(db)
  const request = await getRecord(objectStore, id)
  // TODO error process
  if (request.target.result) {
    const codeAndComment = request.target.result
    const searchRepository = getRepository(codeAndComment.path)
    requestIdleCallback(() => {
      updateRepositories()
      updateCodeAndComments(searchRepository)
      route('/')
    })
    return {
      id: codeAndComment.id,
      highlightLineNumber,
      title: codeAndComment.title,
      git: codeAndComment.git,
      path: codeAndComment.path,
      lines: codeAndComment.lines,
      comments: codeAndComment.comments,
      searchRepository,
    }
  }
  route('/')
}
