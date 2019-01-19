import { expect } from 'chai'
import { spy } from 'sinon'

import actions from '../../src/jsx/actions/edit.jsx'


function noop() {}


describe('actions/edit', () => {
  describe('updateComment', () => {
    it('changes comments', async function(){
      let result = await actions().updateComment({ comments: { '1': 'a',  '2': 'b' } }, 1, 'A', noop)
      expect(result).to.deep.equal({ comments: { '1': 'A',  '2': 'b' } })

      result = await actions().updateComment({ comments: { '1': 'a',  '2': 'b' } }, 1, '', noop)
      expect(result).to.deep.equal({ comments: { '2': 'b' } })
    })

    it('returns undefined if comments do not change', async function() {
      let result = await actions().updateComment({ comments: { '2': 'b' } }, 1, '', noop)
      expect(result).to.be.undefined

      result = await actions().updateComment({ comments: { '1': 'a',  '2': 'b' } }, 1, 'a', noop)
      expect(result).to.be.undefined
    })

    it('trims comment', async function() {
      let result = await actions().updateComment({ comments: { '2': 'b' } }, 1, ' \n \n ', noop)
      expect(result).to.be.undefined

      result = await actions().updateComment({ comments: { '1': 'a',  '2': 'b' } }, 1, '  A\n ', noop)
      expect(result).to.deep.equal({ comments: { '1': 'A',  '2': 'b' } })
    })
  })

  describe('fileUrl', () => {
    it('returns initial state', () => {
      const route = spy()
      const result = actions().fileUrl(null, null, route)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/start')).to.be.true
      expect(result).to.deep.equal({
        id: null,
        title: 'New Code and Comment',
        git: '',
        path: '',
        lines: [],
        comments: {},
        viewUrl: '',
        loading: false,
        networkError: false,
        urlError: false,
        saved: false,
        updated: false,
        codeAndComments: [],
      })
    })
  })

  describe('publish', () => {
    it('returns viewUrl', () => {
      const route = spy()
      const state = {
        git: 'https://api.github.com/repos/code-and-comment/test/git/blobs/df8ea659b9e30b8c6e0f5efd686e0165670524b5',
        path: '/code-and-comment/test/bar',
        comments: { '1': 'a',  '2': 'b' }
      }
      const location = {
        origin: 'http://example.com/',
        pathname: 'foo'
      }
      const result = actions().publish(state, null, route, location)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/publish')).to.be.true
      expect(result).to.deep.equal({
        viewUrl: 'http://example.com/foo#/view?data=eyJnaXQiOiJodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL2NvZGUtYW5kLWNvbW1lbnQvdGVzdC9naXQvYmxvYnMvZGY4ZWE2NTliOWUzMGI4YzZlMGY1ZWZkNjg2ZTAxNjU2NzA1MjRiNSIsInBhdGgiOiIvY29kZS1hbmQtY29tbWVudC90ZXN0L2JhciIsImNvbW1lbnRzIjp7IjEiOiJhIiwiMiI6ImIifX0'
      })
    })
  })

  describe('list', () => {
    it('transfers to the search code and comment page', async function() {
      const route = spy()
      const noop = function() {}
      const codeAndComments = [{}, {}]
      const getAllRecords = async function() {
        return codeAndComments
      }
      const result = await actions().list(null, null, route, noop, noop, getAllRecords)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/search_code_and_comment')).to.be.true
      expect(result).to.deep.equal({ codeAndComments })
    })
  })
})
