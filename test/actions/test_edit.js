import { expect } from 'chai'
import { spy } from 'sinon'

import actions from '../../src/jsx/actions/edit.jsx'


function noop() {}


describe('actions/edit', () => {
  describe('updateComment', () => {
    it('changes comments', async function(){
      let result = await actions().updateComment({ comments: { '1': 'a',  '2': 'b' }, path: '/a/b' }, 1, 'A', noop, noop)
      expect(result).to.deep.equal({ comments: { '1': 'A',  '2': 'b' } })

      result = await actions().updateComment({ comments: { '1': 'a',  '2': 'b' }, path: '/a/b' }, 1, '', noop, noop)
      expect(result).to.deep.equal({ comments: { '2': 'b' } })
    })

    it('returns undefined if comments do not change', async function() {
      let result = await actions().updateComment({ comments: { '2': 'b' }, path: '/a/b' }, 1, '', noop, noop)
      expect(result).to.be.undefined

      result = await actions().updateComment({ comments: { '1': 'a',  '2': 'b' }, path: '/a/b' }, 1, 'a', noop, noop)
      expect(result).to.be.undefined
    })

    it('trims comment', async function() {
      let result = await actions().updateComment({ comments: { '2': 'b' }, path: '/a/b' }, 1, ' \n \n ', noop, noop)
      expect(result).to.be.undefined

      result = await actions().updateComment({ comments: { '1': 'a',  '2': 'b' }, path: '/a/b' }, 1, '  A\n ', noop, noop)
      expect(result).to.deep.equal({ comments: { '1': 'A',  '2': 'b' } })
    })
  })

  describe('fileUrl', () => {
    it('returns initial state', () => {
      const route = spy()
      const result = actions().fileUrl(null, null, route)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/start')).to.be.true
      expect(result).to.be.undefined
    })
  })

  describe('searchCodeAndComment', () => {
    it('transfers to the search code and comment page', async function() {
      const route = spy()
      const noop = function() {}
      const codeAndComments = [{}, {}]
      const getAllRecords = async function() {
        return codeAndComments
      }
      function setTimeout(func) {
        func()
      }
      const path = '/a/b'
      const state = { path }
      const searchRepository = 'a/b'
      const result = await actions().searchCodeAndComment(
        state, null, route, noop, noop, getAllRecords, setTimeout, noop)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/search_code_and_comment')).to.be.true
      expect(result).to.deep.equal({ codeAndComments, searchRepository, highlightLineNumber: 0 })
    })
  })
})
