import { expect } from 'chai'
import { spy } from 'sinon'

import acitons from '../../src/jsx/actions/search-code-and-comment.jsx'

describe('actions/search-code-and-comment', () => {
  describe('home', () => {
    it('moves /home', () => {
      const route = spy()
      const result = acitons().home(null, null, route)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/home')).to.be.true
      expect(result).to.be.undefined
    })
  })
  describe('back', () => {
    it('moves /edit', () => {
      const route = spy()
      const result = acitons().back(null, null, route)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/edit')).to.be.true
      expect(result).to.be.undefined
    })
  })
})
