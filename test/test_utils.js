import { expect } from 'chai'
import { spy } from 'sinon'

import { createViewUrl, transfer } from '../src/jsx/utils.jsx'

describe('utils', () => {
  describe('createViewUrl', () => {
    it('returns url ', () => {
      const git =  'https://api.github.com/repos/code-and-comment/test/git/blobs/df8ea659b9e30b8c6e0f5efd686e0165670524b5'
      const path =  '/code-and-comment/test/bar'
      const comments = { '1': 'a',  '2': 'b' }
      const location = {
        origin: 'http://example.com/',
        pathname: 'foo'
      }
      const url = createViewUrl(git, path, comments, location)
      expect(url).to.deep.equal(
        'http://example.com/foo#/view?data=eyJnaXQiOiJodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL2NvZGUtYW5kLWNvbW1lbnQvdGVzdC9naXQvYmxvYnMvZGY4ZWE2NTliOWUzMGI4YzZlMGY1ZWZkNjg2ZTAxNjU2NzA1MjRiNSIsInBhdGgiOiIvY29kZS1hbmQtY29tbWVudC90ZXN0L2JhciIsImNvbW1lbnRzIjp7IjEiOiJhIiwiMiI6ImIifX0'
      )
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
})
