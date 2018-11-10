import { expect } from 'chai'
import { spy } from 'sinon'

import acitons from '../../src/jsx/actions/publish.jsx'

describe('actions/publish', () => {
  describe('back', () => {
    it('moves /edit', () => {
      const route = spy()
      acitons().back(null, null, route)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/edit')).to.be.true
    })
  })
})
