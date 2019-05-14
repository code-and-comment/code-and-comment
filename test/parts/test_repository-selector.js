import { h } from 'preact'
import { spy } from 'sinon'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { RepositorySelector } from '../../src/jsx/parts/repository-selector.jsx'

describe('parts/repository-selector', () => {
  describe('<RepositorySelector />', () => {
    it('displays repositories', () => {
      const setCodeAndComments = function() {}
      let wrapper = mount(<RepositorySelector repositories={ ['a', 'b'] } searchRepository={ 'b' } setCodeAndComments={ setCodeAndComments } />)
      let html = '<div class="cc-repository-selector"><div class="application-name">Code and Comment</div>'
      + '<div class="repository" data-repository="a">a</div><div class="repository selected" data-repository="b">b</div></div>'
      expect(wrapper.html()).to.equal(html)

      wrapper = mount(<RepositorySelector repositories={ [] } searchRepository={ 'b' } setCodeAndComments={ setCodeAndComments } />)
      html = '<div class="cc-repository-selector"><div class="application-name">Code and Comment</div></div>'
      expect(wrapper.html()).to.equal(html)
    })

    it('selects a repository', () => {
      const setCodeAndComments = spy()
      const wrapper = mount(<RepositorySelector repositories={ ['a', 'b'] } searchRepository={ 'b' } setCodeAndComments={ setCodeAndComments } />)
      const repository = wrapper.find('.repository').at(1)
      repository.simulate('click')
      expect(setCodeAndComments.args[0][0]).to.equal('b')
    })
  })
})
