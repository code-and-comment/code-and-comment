import { expect } from 'chai'
import { spy } from 'sinon'

import { onChange } from '../../src/jsx/parts/comment-list.jsx'


describe('parts/comment-list', () => {
  describe('onChange', () => {
    let scrollIntoView = spy()
    beforeEach(() => {
      const querySelector = spy(function() {
        return { scrollIntoView }
      })
      global.document = {
        querySelector
      }
    })

    afterEach(() => {
      delete global.document
    })

    it('does nothing if value is 0', () => {
      const event = {
        target: {
          value: '0'
        }
      }
      onChange(event)
      expect(document.querySelector.notCalled).to.be.true
      expect(scrollIntoView.notCalled).to.be.true
    })

    it('scrolls page', () => {
      const event = {
        target: {
          value: '123'
        }
      }
      onChange(event)
      expect(document.querySelector.calledOnce).to.be.true
      expect(document.querySelector.calledWith(`.line:nth-child(${event.target.value})`)).to.be.true
      expect(scrollIntoView.calledOnce).to.be.true
    })
  })
})
