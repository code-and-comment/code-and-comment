import { expect } from 'chai'
import { spy } from 'sinon'
import { Base64 } from 'js-base64'

import actions from '../../src/jsx/actions/start.jsx'

describe('actions/start', () => {
  function noop() {}

  describe('getFile', () => {
    function setTimeout(func) {
      func()
    }

    it('returns urlError if url is invalid', async function() {
      const result = await actions().getFile(null, 'https://example.com/index.html', null, null, null)
      expect(result).to.deep.equal({
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
      const id = 1
      async function saveCodeAndComment() {
        return id
      }
      const result = await actions()
        .getFile(null, url, route, fetch, setTimeout, saveCodeAndComment, noop, noop, noop, noop)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/edit')).to.be.true
      expect(fetch.calledOnce).to.be.true
      const requestUrl = 'https://api.github.com/repos/code-and-comment/test/contents/foo/bar.js?ref=master'
      expect(fetch.calledWith(requestUrl)).to.be.true
      expect(result).to.deep.equal({
        id,
        git,
        title: 'New Code and Comment',
        path: '/code-and-comment/test/blob/master/foo/bar.js',
        lines: ['ああああ', '1', '2'],
        codeAndComments: [],
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
      const result = await actions().getFile(null, url, null, fetch, setTimeout)
      expect(result).to.deep.equal({
        networkError: true,
        urlError: false
      })
    })
  })
})
