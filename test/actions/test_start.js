import { expect } from 'chai'
import { spy } from 'sinon'
import { Base64 } from 'js-base64'

import acitons from '../../src/jsx/actions/start.jsx'

describe('actions/start', () => {
  describe('home', () => {
    it('moves /home', () => {
      const route = spy()
      const result = acitons().home(null, null, route)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/home')).to.be.true
      expect(result).to.be.undefined
    })
  })

  describe('setLoading', () => {
    it('returns object which has loading key', () => {
      expect(acitons().setLoading(null, true)).to.deep.equal({ loading: true })
    })
  })

  describe('getFile', () => {
    it('returns urlError if url is invalid', async function() {
      const result = await acitons().getFile(null, 'https://example.com/index.html', null, null)
      expect(result).to.deep.equal({
        loading: false,
        networkError: false,
        urlError: true
      })
    })

    it('returns the file data if request is success', async function() {
      const git = 'https://api.github.com/repos/code-and-comment/test/git/blobs/df8ea659b9e30b8c6e0f5efd686e0165670524b5'
      const content = 'ああああ\n1\n2'
      const base64Content = Base64.encode(content)
      const route = spy()
      const fetch = spy(async function() {
        return {
          ok: true,
          json() {
            return {
              type: 'file',
              content: base64Content,
              _links: { git }
            }
          }
        }
      })
      const url = 'https://github.com/code-and-comment/test/blob/master/foo/bar.js'
      const result = await acitons().getFile(null, url, route, fetch)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/edit')).to.be.true
      expect(fetch.calledOnce).to.be.true
      expect(fetch.calledWith('https://api.github.com/repos/code-and-comment/test/contents/foo/bar.js?ref=master')).to.be.true
      expect(result).to.deep.equal({
        loading: false,
        git,
        path: '/code-and-comment/test/blob/master/foo/bar.js',
        lines: ['ああああ', '1', '2'],
        comments: {},
        networkError: false,
        urlError: false
      })
    })

    it('returns networkError if url is invalid', async function() {
      const fetch = spy(async function() {
        return {
          ok: false
        }
      })
      const url = 'https://github.com/code-and-comment/test/blob/master/foo/bar.js'
      const result = await acitons().getFile(null, url, null, fetch)
      expect(result).to.deep.equal({
        loading: false,
        networkError: true,
        urlError: false
      })
    })
  })
})
