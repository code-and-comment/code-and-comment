import { expect } from 'chai'
import { spy } from 'sinon'

import actions from '../../src/jsx/actions/home.jsx'

describe('actions/home', () => {
  function setTimeout(func) {
    func()
  }
  describe('searchCodeAndComment', () => {
    it('moves and gets records', async function() {
      const route = spy()
      const noop = function() {}
      const codeAndComments = [{}, {}]
      const searchRepository = ''
      const getAllRecords = async function() {
        return codeAndComments
      }
      const result = await actions()
        .searchCodeAndComment(null, null, route, noop, noop, getAllRecords, setTimeout, noop)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/search_code_and_comment')).to.be.true
      expect(result).to.deep.equal({ codeAndComments, searchRepository })
    })
  })
  describe('searchComment', () => {
    it('moves and gets records', async function() {
      const route = spy()
      const noop = function() {}
      const codeAndComments = [{}, {}]
      const searchRepository = ''
      const getAllRecords = async function() {
        return codeAndComments
      }
      const result = await actions()
        .searchComment(null, null, route, noop, noop, getAllRecords, setTimeout, noop)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/search_comment')).to.be.true
      expect(result).to.deep.equal({ codeAndComments, searchRepository })
    })
  })
})
