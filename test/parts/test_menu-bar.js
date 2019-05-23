import { h } from 'preact'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { MenuBar } from '../../src/jsx/parts/menu-bar.jsx'

describe('parts/menu-bar', () => {
  describe('<MenuBar />', () => {
    it('displays loading', () => {
      const wrapper = mount(<MenuBar loading={ true } />)
      wrapper.setState({
        isDeleting: true,
        isCreating: true,
        isImporting: true,
        isExporting: true,
      })
      expect(wrapper.html()).to.equal('<div class="cc-menu-bar loading"><div class="cc-loading"></div></div>')
    })

    it('do nothing at initial', () => {
      const wrapper = mount(<MenuBar loading={ false } />)
      expect(wrapper.state().isDeleting).to.be.false
      expect(wrapper.state().isCreating).to.be.false
      expect(wrapper.state().isImporting).to.be.false
      expect(wrapper.state().isExporting).to.be.false
    })

    it('displays deleting', () => {
      const wrapper = mount(<MenuBar loading={ false } />)
      wrapper.setState({
        isDeleting: true,
      })
      expect(wrapper.exists('.deleting')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false
    })

    it('displays creating', () => {
      const wrapper = mount(<MenuBar loading={ false } />)
      wrapper.setState({
        isCreating: true,
      })
      expect(wrapper.exists('.creating')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false
    })

    it('displays importing', () => {
      const wrapper = mount(<MenuBar loading={ false } />)
      wrapper.setState({
        isImporting: true,
      })
      expect(wrapper.exists('.importing')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false
    })

    it('displays exporting', () => {
      const wrapper = mount(<MenuBar loading={ false } />)
      wrapper.setState({
        isExporting: true,
      })
      expect(wrapper.exists('.exporting')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false
    })
  })
})
