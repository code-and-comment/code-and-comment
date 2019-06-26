import { h } from 'preact'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'

import Code from '../../src/jsx/parts/code.jsx'

describe('parts/code', () => {
  describe('<Code />', () => {
    it('is focused when it is mouseovered', () => {
      const wrapper = mount(<Code />)
      const code = wrapper.find('.cc-code').at(0)
      code.getDOMNode().focus = spy()
      code.simulate('mouseover')
      expect(code.getDOMNode().focus.calledOnce).to.be.true
    })

    it('is blured when it is mouseouted', () => {
      const wrapper = mount(<Code />)
      const code = wrapper.find('.cc-code').at(0)
      code.getDOMNode().blur = spy()
      code.simulate('mouseout')
      expect(code.getDOMNode().blur.calledOnce).to.be.true
    })
  })
})
