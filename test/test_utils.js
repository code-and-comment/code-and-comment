import { expect } from 'chai'
import { spy } from 'sinon'

import {
  createViewUrl,
  transfer,
  getIndexName,
  getRepository,
  getRange,
  search,
} from '../src/jsx/utils.jsx'

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
      function setTimeout(func) {
        func()
      }
      const result = await transfer('/foo', route, noop, noop, getAllRecords, setTimeout, noop)
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
})
