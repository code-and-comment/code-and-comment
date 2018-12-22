import { expect } from 'chai'
import { spy } from 'sinon'

import acitons from '../../src/jsx/actions/update.jsx'

describe('actions/update', () => {
  describe('edit', () => {
    it('moves /edit', () => {
      const route = spy()
      const result = acitons().edit(null, null, route)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/edit')).to.be.true
      expect(result).to.be.undefined
    })
  })
})
