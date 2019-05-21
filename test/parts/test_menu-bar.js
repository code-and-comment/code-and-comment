import { h } from 'preact'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { MenuBar } from '../../src/jsx/parts/menu-bar.jsx'

describe('parts/menu-bar', () => {
  describe('<MenuBar />', () => {
    it('display loading', () => {
      const wrapper = mount(<MenuBar loading={ true } />)
      wrapper.setState({
        isDeleting: true,
        isCreating: true,
        isImporting: true,
        isExporting: true,
      })
      expect(wrapper.html()).to.equal('<div class="cc-menu-bar loading"><div class="cc-loading"></div></div>')
    })
  })
})
