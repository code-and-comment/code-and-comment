import { expect } from 'chai'
import { spy } from 'sinon'

import actions from '../../src/jsx/actions/search-code-and-comment.jsx'

describe('actions/search-code-and-comment', () => {
  describe('back', () => {
    it('moves /edit', () => {
      function setTimeout(func) {
        func()
      }
      const route = spy()
      const result = actions().back(null, null, route, setTimeout)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/edit')).to.be.true
      expect(result).to.deep.equal({ codeAndComments: [] })
    })
  })
})