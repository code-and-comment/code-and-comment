import { expect } from 'chai'

import actions from '../../src/tsx/actions/anchor'


describe('actions/anchor', () => {
  describe('clearPopup', () => {
    it('returns urlError if url is invalid', async function() {
      const result = actions.clearPopup()
      expect(result).to.deep.equal({ popup: null })
    })
  })
})
