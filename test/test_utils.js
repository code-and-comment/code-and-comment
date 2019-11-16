import { expect } from 'chai'
import { spy } from 'sinon'

import {
  createViewUrl,
  transfer,
  getIndexName,
  getRepository,
  getRange,
  search,
  edit,
  scrollIntoView
} from '../src/tsx/utils'

describe('utils', () => {
  function noop() {}

  describe('getIndexName', () => {
    it('returns indexName', function() {
      let indexName = getIndexName({ repository: 'code-and-comment/bar' })
      expect(indexName).to.deep.equal('repository')
      indexName = getIndexName({ repository: '  ' })
      expect(indexName).to.equal('updated_at')
      indexName = getIndexName({})
      expect(indexName).to.equal('updated_at')
    })
  })

  describe('getRange', () => {
    it('returns undefined when the arguments does not have condition', function() {
      const range = getRange({}, noop)
      expect(range).to.be.undefined
    })

    it('returns undefined when the arguments does not have condition', function() {
      const repository = 'code-and-comment/foo'
      const bound = spy(function() {
        return 'bound'
      })
      const range = getRange({ repository }, bound)
      expect(range).to.equal('bound')
      expect(bound.calledOnce).to.be.true
      expect(bound.args[0][0][0]).to.equal(repository)
      expect(bound.args[0][0][1]).to.be.an.instanceof(Date)
      expect(bound.args[0][1][0]).to.equal(repository)
      expect(bound.args[0][1][1]).to.be.an.instanceof(Date)
    })
  })

  describe('search', () => {
    it('returns codeAndComments', async function() {
      const bound = function() {}
      const getDB = spy(async function() {
        return 'db'
      })
      const getObjectStore = spy(async function() {
        return 'objectStore'
      })
      const codeAndComments = [{}, {}]
      const getAllRecords = spy(async function() {
        return codeAndComments
      })
      const result = await search(
        {},
        getDB,
        getObjectStore,
        getAllRecords,
        bound
      )
      expect(getDB.calledOnce).to.be.true
      expect(getDB.calledWith()).to.be.true
      expect(getObjectStore.calledOnce).to.be.true
      expect(getObjectStore.calledWith('db')).to.be.true
      expect(getAllRecords.calledOnce).to.be.true
      expect(getAllRecords.calledWith('objectStore', 'updated_at', undefined)).to.be.true
      expect(result).to.equal(codeAndComments)
    })
  })

  describe('transfer', () => {
    it('returns codeAndComments', async function() {
      const route = spy()
      const noop = function() {}
      const codeAndComments = [{}, {}]
      const searchRepository = ''
      async function getAllRecords() {
        return codeAndComments
      }
      function requestIdleCallback(func) {
        func()
      }
      const result = await transfer('/foo', route, noop, noop, getAllRecords, requestIdleCallback, noop)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/foo')).to.be.true
      expect(result).to.deep.equal({ codeAndComments, searchRepository })
    })
  })

  describe('getRepository', () => {
    it('returns repository', async function() {
      const path = '/code-and-comment/foo/blob/master/src/jsx/actions/edit.jsx'
      const repository = getRepository(path)
      expect(repository).to.equal('code-and-comment/foo')
    })

    it('returns "" when path is ""', async function() {
      const path = ''
      const repository = getRepository(path)
      expect(repository).to.equal('')
    })
  })

  describe('scrollIntoView', () => {
    it('executes scrollIntoView()', () => {
      const _scrollIntoView = spy()
      const querySelector = spy(() => {
        return {
          scrollIntoView: _scrollIntoView,
        }
      })
      const document = {
        querySelector
      }
      const highlightLineNumber = 123
      scrollIntoView(highlightLineNumber, document)
      expect(document.querySelector.calledOnceWith('.cc-line:nth-child(123)')).to.be.true
    })
  })

  describe('edit', () => {
    let request
    const id = '123'
    const highlightLineNumber = '456'
    const db = {}
    const objectStore = {}
    const repository = 'code-and-comment/code-and-comment'
    const route = spy()
    const requestIdleCallback = spy(func => func())
    const getDB = spy(() => db)
    const getObjectStore = spy(() => objectStore)
    const getRecord = spy(() => request)
    const getRepository = spy(() => repository)
    const updateRepositories = spy()
    const updateCodeAndComments = spy()
    beforeEach(() => {
      request = {
        target: {}
      }
      route.resetHistory()
      requestIdleCallback.resetHistory()
      getDB.resetHistory()
      getObjectStore.resetHistory()
      getRecord.resetHistory()
      getRepository.resetHistory()
      updateRepositories.resetHistory()
      updateCodeAndComments.resetHistory()
    })

    it('does nothing when there is no record', async function() {
      await edit(
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
      )
      const functions = [
        requestIdleCallback,
        getRepository,
        updateRepositories,
        updateCodeAndComments,
      ]
      functions.forEach(f => expect(f.notCalled).to.be.true)
      expect(route.calledOnceWith('/')).to.be.true
    })

    it('updates state when there is a record', async function() {
      const codeAndComment = {
        id: id - 0,
        title: 'title1',
        git: 'git1',
        path: 'path1',
        lines: ['l1', 'l2'],
        comments: ['c1', 'c1'],
      }
      request.target.result = codeAndComment
      const state = await edit(
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
      )
      expect(getDB.calledOnce).to.be.true
      expect(getObjectStore.calledOnceWith(db)).to.be.true
      expect(getRecord.calledOnceWith(objectStore, id - 0)).to.be.true
      expect(getRepository.calledOnceWith(codeAndComment.path)).to.be.true
      expect(updateRepositories.calledOnceWith()).to.be.true
      expect(updateCodeAndComments.calledOnceWith(repository)).to.be.true
      expect(route.calledOnceWith('/')).to.be.true
      expect(state).to.deep.equal({
        ...codeAndComment,
        highlightLineNumber: highlightLineNumber - 0,
        searchRepository: repository
      })
    })
  })
})
