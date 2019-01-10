import { expect } from 'chai'
import { spy } from 'sinon'

import actions from '../../src/jsx/actions/save.jsx'

describe('actions/save', () => {
  describe('edit', () => {
    it('moves /edit', () => {
      const route = spy()
      const result = actions().edit(null, null, route)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/edit')).to.be.true
      expect(result).to.be.undefined
    })
  })

  describe('save', () => {
    it('does nothing when title is empty', async function() {
      const getDB = spy()
      const result = await actions().save(null, '   ', getDB)
      expect(getDB.notCalled).to.be.true
      expect(result).to.be.undefined
    })
  })
})
