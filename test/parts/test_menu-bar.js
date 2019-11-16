import { h } from 'preact'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'

import { MenuBar, Mode } from '../../src/tsx/parts/menu-bar'

describe('parts/menu-bar', () => {
  describe('<MenuBar />', () => {
    const LABELS = 'OpenNewListCommentsExportImportTokenDelete'

    it('displays loading', () => {
      const wrapper = mount(<MenuBar loading={ true } />)
      wrapper.setState({
        mode: Mode.Create,
      })
      expect(wrapper.html()).to.equal('<div class="cc-menu-bar loading"><div class="cc-loading"></div></div>')
    })

    it('do nothing at initial', () => {
      const wrapper = mount(<MenuBar />)
      wrapper.setProps({
        isSelectorOpen: false,
        loading: false,
      })
      expect(wrapper.state().mode).to.equal(Mode.Initial)
      expect(wrapper.text()).to.equal('OpenNewListCommentsExportImportToken')

      wrapper.setProps({
        isSelectorOpen: true,
        loading: false,
      })
      expect(wrapper.text()).to.equal('CloseNewListCommentsExportImportToken')

      wrapper.setProps({
        id: 1,
      })
      expect(wrapper.text()).to.equal('CloseNewListCommentsExportImportTokenDelete')
    })

    it('displays deleting', () => {
      const wrapper = mount(<MenuBar id={ 1 }loading={ false } />)
      wrapper.find('.label').at(7).simulate('click')

      expect(wrapper.state().mode).to.equal(Mode.Delete)
      expect(wrapper.exists('.deleting')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false
    })

    it('cancels deleting', () => {
      const wrapper = mount(<MenuBar isSelectorOpen={ false } id={ 1 } loading={ false } />)
      wrapper.find('.label').at(7).simulate('click')
      wrapper.find('.cc-button').at(1).simulate('click')

      expect(wrapper.state().mode).to.equal(Mode.Initial)
      expect(wrapper.text()).to.equal(LABELS)
    })

    it('displays token', () => {
      const wrapper = mount(<MenuBar id={ 1 }loading={ false } />)
      wrapper.find('.label').at(6).simulate('click')

      expect(wrapper.state().mode).to.equal(Mode.Token)
      expect(wrapper.exists('.tokenizing')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false
    })

    it('cancels token', () => {
      const wrapper = mount(<MenuBar isSelectorOpen={ false } id={ 1 } loading={ false } />)
      wrapper.find('.label').at(6).simulate('click')
      wrapper.find('.cc-button').at(1).simulate('click')

      expect(wrapper.state().mode).to.equal(Mode.Initial)
      expect(wrapper.text()).to.equal(LABELS)
    })

    it('displays creating', () => {
      const clearErrors = spy()
      const wrapper = mount(<MenuBar loading={ false } clearErrors={ clearErrors } />)
      wrapper.find('.label').at(1).simulate('click')

      expect(clearErrors.calledOnce).to.be.true
      expect(wrapper.state().mode).to.equal(Mode.Create)
      expect(wrapper.exists('.creating')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false

      const input = wrapper.find('input').at(0).instance()
      expect(input.value).to.equal('')
      const url = 'https://github.com/code-and-comment/code-and-comment/blob/master/src/jsx/index.jsx'
      input.value = url
      wrapper.find('input').at(0).simulate('change')
      expect(wrapper.state().url).to.equal(url)
    })

    it('cancels creating', () => {
      const wrapper = mount(<MenuBar isSelectorOpen={ false } id={ 1 } loading={ false } clearErrors={ () => {} } />)
      wrapper.find('.label').at(1).simulate('click')
      wrapper.find('.cc-button').at(1).simulate('click')

      expect(wrapper.state().mode).to.equal(Mode.Initial)
      expect(wrapper.text()).to.equal(LABELS)
    })

    it('displays importing', () => {
      const wrapper = mount(<MenuBar loading={ false } />)
      wrapper.find('.label').at(5).simulate('click')

      expect(wrapper.state().mode).to.equal(Mode.Import)
      expect(wrapper.exists('.importing')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false
    })

    it('cancels importing', () => {
      const wrapper = mount(<MenuBar isSelectorOpen={ false } id={ 1 } loading={ false } />)
      wrapper.find('.label').at(5).simulate('click')
      wrapper.find('.cc-button').at(1).simulate('click')

      expect(wrapper.state().mode).to.equal(Mode.Initial)
      expect(wrapper.text()).to.equal(LABELS)
    })

    it('displays exporting', () => {
      const wrapper = mount(<MenuBar loading={ false } />)
      wrapper.find('.label').at(4).simulate('click')

      expect(wrapper.state().mode).to.equal(Mode.Export)
      expect(wrapper.exists('.exporting')).to.be.true
      expect(wrapper.exists('.loading')).to.be.false

      const input = wrapper.find('input').at(0).instance()
      expect(input.value).to.equal('code-and-comment.json')
      const value = 'foo.json'
      input.value = value
      wrapper.find('input').at(0).simulate('change')
      expect(wrapper.state().exportFileName).to.equal(value)
    })

    it('cancels exporting', () => {
      const wrapper = mount(<MenuBar isSelectorOpen={ false } id={ 1 } loading={ false } />)
      wrapper.find('.label').at(4).simulate('click')
      wrapper.find('.cc-button').at(1).simulate('click')

      expect(wrapper.state().mode).to.equal(Mode.Initial)
      expect(wrapper.text()).to.equal(LABELS)
    })
  })
})
