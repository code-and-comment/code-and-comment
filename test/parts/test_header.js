import { h } from 'preact'
import { mount } from 'enzyme'
import { expect } from 'chai'

import Header from '../../src/tsx/parts/header'

describe('parts/header', () => {
  describe('<Header />', () => {
    it('is a header', () => {
      const wrapper = mount(<Header />)
      expect(wrapper.html()).to.equal('<div class="cc-header"><h1>Code and Comment</h1></div>')
    })
  })
})
