import { expect } from 'chai'
import { spy } from 'sinon'

import acitons from '../../src/jsx/actions/edit.jsx'

describe('actions/edit', () => {
  describe('updateComment', () => {
    it('changes comments', () => {
      let result = acitons().updateComment({ comments: { '1': 'a',  '2': 'b' } }, 1, 'A')
      expect(result).to.deep.equal({ comments: { '1': 'A',  '2': 'b' } })

      result = acitons().updateComment({ comments: { '1': 'a',  '2': 'b' } }, 1, '')
      expect(result).to.deep.equal({ comments: { '2': 'b' } })
    })

    it('returns undefined if comments do not change', () => {
      let result = acitons().updateComment({ comments: { '2': 'b' } }, 1, '')
      expect(result).to.be.undefined

      result = acitons().updateComment({ comments: { '1': 'a',  '2': 'b' } }, 1, 'a')
      expect(result).to.be.undefined
    })

    it('trims comment', () => {
      let result = acitons().updateComment({ comments: { '2': 'b' } }, 1, ' \n \n ')
      expect(result).to.be.undefined

      result = acitons().updateComment({ comments: { '1': 'a',  '2': 'b' } }, 1, '  A\n ')
      expect(result).to.deep.equal({ comments: { '1': 'A',  '2': 'b' } })
    })
  })

  describe('back', () => {
    it('returns initial state', () => {
      const route = spy()
      const result = acitons().back(null, null, route)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/start')).to.be.true
      expect(result).to.deep.equal({
        git: '',
        path: '',
        lines: [],
        comments: {},
        viewUrl: '',
        loading: false,
        networkError: false,
        urlError: false
      })
    })
  })

  describe('publish', () => {
    it('returns viewUrl', () => {
      const route = spy()
      const state = {
        git: 'https://api.github.com/repos/code-and-comment/test/git/blobs/df8ea659b9e30b8c6e0f5efd686e0165670524b5',
        path: '/code-and-comment/test/bar',
        comments: { '1': 'a',  '2': 'b' }
      }
      const location = {
        origin: 'http://example.com/',
        pathname: 'foo'
      }
      const result = acitons().publish(state, null, route, location)
      expect(route.calledOnce).to.be.true
      expect(route.calledWith('/publish')).to.be.true
      expect(result).to.deep.equal({
        viewUrl: 'http://example.com/foo#/view?data=eyJnaXQiOiJodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL2NvZGUtYW5kLWNvbW1lbnQvdGVzdC9naXQvYmxvYnMvZGY4ZWE2NTliOWUzMGI4YzZlMGY1ZWZkNjg2ZTAxNjU2NzA1MjRiNSIsInBhdGgiOiIvY29kZS1hbmQtY29tbWVudC90ZXN0L2JhciIsImNvbW1lbnRzIjp7IjEiOiJhIiwiMiI6ImIifX0'
      })
    })
  })
})
