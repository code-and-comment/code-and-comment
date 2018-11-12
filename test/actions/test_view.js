import { expect } from 'chai'
import { spy } from 'sinon'
import { Base64 } from 'js-base64'

import acitons from '../../src/jsx/actions/view.jsx'

describe('actions/view', () => {
  describe('back', () => {
    it('moves /edit', () => {
      const route = spy()
      acitons().back(null, null, route)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/edit')).to.be.true
    })
  })

  describe('getFile', () => {
    it('move /start if paramJson is empty', async function() {
      const route = spy()
      await acitons().getFile(null, null, route, null)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/start')).to.be.true
    })

    it('move /start if paramJson is invalid', async function() {
      const route = spy()
      await acitons().getFile(null, Base64.encodeURI('{}'), route, null)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/start')).to.be.true
    })

    it('returns state', async function() {
      const git = 'https://api.github.com/repos/code-and-comment/test/git/blobs/df8ea659b9e30b8c6e0f5efd686e0165670524b5'
      const path = '/code-and-comment/test/blob/master/foo/bar.js'
      const paramJson = Base64.encodeURI(`{"git": "${git}", "path": "${path}", "comments": { "1": "a", "2": "b" }}`)
      const route = spy()
      const content = 'ああああ\n1\n2'
      const base64Content = Base64.encode(content)
      const fetch = spy(async function() {
        return {
          ok: true,
          json() {
            return {
              content: base64Content,
            }
          }
        }
      })
      const result = await acitons().getFile(null, paramJson, route, fetch)
      expect(route.notCalled).to.be.true
      expect(result).to.deep.equal({
        git: 'https://api.github.com/repos/code-and-comment/test/git/blobs/df8ea659b9e30b8c6e0f5efd686e0165670524b5',
        path: '/code-and-comment/test/blob/master/foo/bar.js',
        lines: ['ああああ', '1', '2'],
        comments: { '1': 'a', '2': 'b' },
        networkError: false,
        urlError: false 
      })
    })
  })
})
