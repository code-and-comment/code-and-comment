import { h } from 'preact'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'

import Code from '../../src/jsx/parts/code.jsx'

describe('parts/code', () => {
  describe('<Code />', () => {
    it('displays code', () => {
      const wrapper = mount(<Code lineNumber={ 1 } content={ 'a' } isHidden={ false }/>)
      expect(wrapper.html()).to.equal('<div class="cc-code" data-line-number="1" tabindex="1"><span class="number">1</span><span class="content">a</span></div>')
    })

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

    it('is hidden when isHidden is true', () => {
      const wrapper = mount(<Code isHidden={ true } />)
      expect(wrapper.exists('.number.hidden')).to.be.true
    })

    it('executes scrollToMarkedLineNumber()', () => {
      const scrollToMarkedLineNumber = spy()
      const wrapper = mount(<Code scrollToMarkedLineNumber={ scrollToMarkedLineNumber } />)
      wrapper.find('.cc-code').at(0).simulate('keydown', { keyCode: 71 })
      expect(scrollToMarkedLineNumber.calledOnce).to.be.true
    })

    it('executes setMarkedLineNumber()', () => {
      const setMarkedLineNumber = spy()
      const wrapper = mount(<Code setMarkedLineNumber={ setMarkedLineNumber } />)
      wrapper.find('.cc-code').at(0).simulate('keydown', { keyCode: 77 })
      expect(setMarkedLineNumber.calledOnce).to.be.true
    })
  })
})
