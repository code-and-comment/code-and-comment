import { expect } from 'chai'

import actions from '../../src/tsx/actions/anchor'


describe('actions/anchor', () => {
  describe('clearPopup', () => {
    it('clears popup', function() {
      const result = actions.clearPopup()
      expect(result).to.deep.equal({ popup: null })
    })
  })
})
