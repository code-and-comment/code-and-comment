import { h } from 'preact'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'

import { MenuBar } from '../../src/jsx/parts/menu-bar.jsx'

describe('parts/menu-bar', () => {
  describe('<MenuBar />', () => {
    const LABELS = 'OpenNewListCommentsExportImportDelete'

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
      const wrapper = mount(<MenuBar />)
      wrapper.setProps({
        isSelectorOpen: false,
        loading: false,
      })
      expect(wrapper.state().isDeleting).to.be.false
      expect(wrapper.state().isCreating).to.be.false
      expect(wrapper.state().isImporting).to.be.false
      expect(wrapper.state().isExporting).to.be.false
      expect(wrapper.text()).to.equal('OpenNewListCommentsExportImport')

      wrapper.setProps({
        isSelectorOpen: true,
        loading: false,
      })
      expect(wrapper.text()).to.equal('CloseNewListCommentsExportImport')

      wrapper.setProps({
        id: 1,
      })
      expect(wrapper.text()).to.equal('CloseNewListCommentsExportImportDelete')
    })

    it('displays deleting', () => {
      const wrapper = mount(<MenuBar id={ 1 }loading={ false } />)
      wrapper.find('.label').at(6).simulate('click')

      expect(wrapper.state().isDeleting).to.be.true
      expect(wrapper.exists('.deleting')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false
    })

    it('cancels deleting', () => {
      const wrapper = mount(<MenuBar isSelectorOpen={ false } id={ 1 } loading={ false } />)
      wrapper.find('.label').at(6).simulate('click')
      wrapper.find('.cc-button').at(1).simulate('click')

      expect(wrapper.state().isDeleting).to.be.false
      expect(wrapper.text()).to.equal(LABELS)
    })

    it('displays creating', () => {
      const clearErrors = spy()
      const wrapper = mount(<MenuBar loading={ false } clearErrors={ clearErrors } />)
      wrapper.find('.label').at(1).simulate('click')

      expect(clearErrors.calledOnce).to.be.true
      expect(wrapper.state().isCreating).to.be.true
      expect(wrapper.exists('.creating')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false
    })

    it('cancels creating', () => {
      const wrapper = mount(<MenuBar isSelectorOpen={ false } id={ 1 } loading={ false } clearErrors={ () => {} } />)
      wrapper.find('.label').at(1).simulate('click')
      wrapper.find('.cc-button').at(1).simulate('click')

      expect(wrapper.state().isCreating).to.be.false
      expect(wrapper.text()).to.equal(LABELS)
    })

    it('displays importing', () => {
      const wrapper = mount(<MenuBar loading={ false } />)
      wrapper.find('.label').at(5).simulate('click')

      expect(wrapper.state().isImporting).to.be.true
      expect(wrapper.exists('.importing')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false
    })

    it('cancels importing', () => {
      const wrapper = mount(<MenuBar isSelectorOpen={ false } id={ 1 } loading={ false } />)
      wrapper.find('.label').at(5).simulate('click')
      wrapper.find('.cc-button').at(1).simulate('click')

      expect(wrapper.state().isImporting).to.be.false
      expect(wrapper.text()).to.equal(LABELS)
    })

    it('displays exporting', () => {
      const wrapper = mount(<MenuBar loading={ false } />)
      wrapper.find('.label').at(4).simulate('click')

      expect(wrapper.state().isExporting).to.be.true
      expect(wrapper.exists('.exporting')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false

      expect(wrapper.find('input').at(0).instance().value).to.equal('code-and-comment.json')
      const value = 'foo.json'
      wrapper.find('input').at(0).instance().value = value
      wrapper.find('input').at(0).simulate('change')
      expect(wrapper.state().exportFileName).to.equal(value)
    })

    it('cancels exporting', () => {
      const wrapper = mount(<MenuBar isSelectorOpen={ false } id={ 1 } loading={ false } />)
      wrapper.find('.label').at(4).simulate('click')
      wrapper.find('.cc-button').at(1).simulate('click')

      expect(wrapper.state().isExporting).to.be.false
      expect(wrapper.text()).to.equal(LABELS)
    })
  })
})
