import { expect } from 'chai'
import { spy } from 'sinon'
import { Base64 } from 'js-base64'

import actions from '../../src/tsx/actions/edit'


describe('actions/edit', () => {
  function noop() {}
  const event = {
    stopPropagation() {}
  }

  describe('getFile', () => {
    function requestIdleCallback(func) {
      func()
    }

    it('returns urlError if url is invalid', async function() {
      const result = await actions.getFile({}, 'https://example.com/index.html', noop, noop, noop, noop, noop, noop, noop, noop)
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
      const result = await actions
        .getFile({}, url, fetch, requestIdleCallback, saveCodeAndComment, noop, noop, noop, noop, noop)
      expect(fetch.calledOnce).to.be.true
      const requestUrl = 'https://api.github.com/repos/code-and-comment/test/contents/foo/bar.js?ref=master'
      expect(fetch.calledWith(requestUrl)).to.be.true
      expect(result).to.deep.equal({
        id,
        git,
        title: 'New Code and Comment',
        loading: false,
        path: '/code-and-comment/test/blob/master/foo/bar.js',
        lines: ['ああああ', '1', '2'],
        searchRepository: 'code-and-comment/test',
        highlightLineNumber: 0,
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
      const result = await actions.getFile({}, url, fetch, requestIdleCallback)
      expect(result).to.deep.equal({
        loading: false,
        networkError: true,
        urlError: false
      })
    })
  })

  describe('updateComment', () => {
    it('changes comments', async function(){
      let result = await actions.updateComment({ comments: { '1': 'a',  '2': 'b' }, path: '/a/b' }, 1, 'A', noop, noop)
      expect(result).to.deep.equal({ comments: { '1': 'A',  '2': 'b' } })

      result = await actions.updateComment({ comments: { '1': 'a',  '2': 'b' }, path: '/a/b' }, 1, '', noop, noop)
      expect(result).to.deep.equal({ comments: { '2': 'b' } })
    })

    it('returns undefined if comments do not change', async function() {
      let result = await actions.updateComment({ comments: { '2': 'b' }, path: '/a/b' }, 1, '', noop, noop)
      expect(result).to.be.undefined

      result = await actions.updateComment({ comments: { '1': 'a',  '2': 'b' }, path: '/a/b' }, 1, 'a', noop, noop)
      expect(result).to.be.undefined
    })

    it('trims comment', async function() {
      let result = await actions.updateComment({ comments: { '2': 'b' }, path: '/a/b' }, 1, ' \n \n ', noop, noop)
      expect(result).to.be.undefined

      result = await actions.updateComment({ comments: { '1': 'a',  '2': 'b' }, path: '/a/b' }, 1, '  A\n ', noop, noop)
      expect(result).to.deep.equal({ comments: { '1': 'A',  '2': 'b' } })
    })
  })

  describe('searchCodeAndComment', () => {
    it('transfers to the search code and comment page', async function() {
      const route = spy()
      const noop = function() {}
      const codeAndComments = [{}, {}]
      const getAllRecords = async function() {
        return codeAndComments
      }
      function requestIdleCallback(func) {
        func()
      }
      const path = '/a/b'
      const state = { path }
      const searchRepository = 'a/b'
      const result = await actions.searchCodeAndComment(
        state, event, route, noop, noop, getAllRecords, requestIdleCallback, noop)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/search_code_and_comment')).to.be.true
      expect(result).to.deep.equal({ codeAndComments, searchRepository, highlightLineNumber: 0 })
    })
  })
})
